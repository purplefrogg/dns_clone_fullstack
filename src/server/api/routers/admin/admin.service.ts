import { TRPCError } from '@trpc/server'
import { v4 } from 'uuid'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { minioClient } from '~/server/minio'
import {
  type createCategorySchema,
  type createProductSchema,
} from './admin.dto'

const getProductPropertyTitle = async (categoryId: number) => {
  return await prisma.property.findMany({
    where: {
      categoryId,
    },
    include: {
      title: true,
    },
  })
}

const deleteCategory = async (categoryId: number) => {
  return await prisma.category.delete({
    where: {
      id: categoryId,
    },
  })
}

const createCategory = async (input: z.infer<typeof createCategorySchema>) => {
  if (input.image)
    input.image = await imageService({ image: input.image, path: 'categories' })
  try {
    const category = await prisma.category.create({
      data: {
        locale: {
          createMany: {
            data: [
              {
                lang: 'EN',
                title: input.titleEn,
              },
              {
                lang: 'RU',
                title: input.titleRu,
              },
            ],
          },
        },
        slug: input.slug || input.titleEn.replaceAll(' ', '-'),
        image: input.image,

        parentId: input.parentId,
      },
      include: {
        parent: {
          include: {
            parent: true,
          },
        },
      },
    })
    return category
  } catch (e) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Category with this slug already exists',
    })
  }
}

const createProduct = async (input: z.infer<typeof createProductSchema>) => {
  if (input.image)
    input.image = await imageService({ image: input.image, path: 'products' })

  const product = await prisma.product.create({
    data: {
      locale: {
        createMany: {
          data: [
            {
              lang: 'EN',
              description: input.description,
              name: input.name,
            },
            {
              lang: 'RU',
              description: input.descriptionRu,
              name: input.nameRu,
            },
          ],
        },
      },
      categoryId: input.categoryId,
      image: input.image,

      price: input.price,
      FieldValue: {
        connectOrCreate: input.ProductProperty.map((item) => {
          return {
            where: {
              id: item.valueId || 0,
            },
            create: {
              fieldId: item.fieldId,
              value: item.value || '',
            },
          }
        }),
      },
    },
  })

  return product
}

export const adminService = {
  deleteCategory,
  createCategory,
  getProductPropertyTitle,

  createProduct,
}

interface IImageService {
  path: string
  image: string
}
const imageService = async ({ path, image }: IImageService) => {
  const id = v4()
  const [meta, img] = image.split(',')
  if (!meta || !img)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Image is not valid',
    })
  const buffer = Buffer.from(img, 'base64')
  await minioClient.putObject('dnsclone', `/${path}/${id}`, buffer, {
    'Content-type': meta?.split(';')[0]?.split(':')[1],
  })
  return `dnsclone/${path}/${id}`
}
