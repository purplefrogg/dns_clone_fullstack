import { TRPCError } from '@trpc/server'
import { v4 } from 'uuid'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { minioClient } from '~/server/minio'
import { type getCategoriesSchema } from '../category/category.dto'
import { categoryService } from '../category/category.service'
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
    include: {
      subCategories: {
        select: {
          title: true,
        },
      },
    },
  })
}

const createCategory = async (input: z.infer<typeof createCategorySchema>) => {
  if (input.image)
    input.image = await imageService({ image: input.image, path: 'categories' })
  try {
    const category = await prisma.category.create({
      data: {
        title: input.title,
        slug: input.slug || input.title.replaceAll(' ', '-'),
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
  console.log(input.ProductProperty)

  const product = await prisma.product.create({
    data: {
      name: input.name,
      categoryId: input.categoryId,
      image: input.image,
      description: input.description,
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

const getCategories = async (input: z.infer<typeof getCategoriesSchema>) => {
  return await prisma.category.findMany({
    where: categoryService.getCategoryArgsWhere(input),
    include: {
      subCategories: {
        select: {
          title: true,
        },
      },
      parent: true,
    },
  })
}

export const adminService = {
  getCategories,
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
