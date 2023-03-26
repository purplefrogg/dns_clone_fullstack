import {
  type ProductPropertyTitle,
  type PropertyField,
  type ProductProperty,
  type PropertyFieldAbout,
} from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { v4 } from 'uuid'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { minioClient } from '~/server/minio'
import { type getCategoriesSchema } from '../category/category.dto'
import { categoryService } from '../category/category.service'
import {
  type createPropertySchema,
  type createPropertyFieldSchema,
  type createCategorySchema,
  type createProductSchema,
} from './admin.dto'

// receive array of productPropertyTitle and return array of productPropertyTitle with fields
const addPropertyField = async (
  productProperty: (ProductProperty & {
    title: ProductPropertyTitle
  })[]
) => {
  return await Promise.all(
    productProperty.map(async (item) => {
      return {
        ...item,
        title: item.title,
        fieldAbout: await prisma.propertyFieldAbout.findMany({
          include: {
            PropertyField: true,
          },
          where: {
            PropertyField: {
              some: {
                ProductProperty: {
                  id: item.id,
                },
              },
            },
          },
        }),
      }
    })
  )
}

// receive array of productPropertyTitle with fields
// return array of productPropertyTitle with values
const addFieldValue = async (
  productProperty: {
    title: ProductPropertyTitle
    fieldAbout: (PropertyFieldAbout & {
      PropertyField: PropertyField[]
    })[]
    id: number
    productId: number | null
    titleId: number
    categoryId: number | null
  }[]
) => {
  return await Promise.all(
    productProperty.map(async (item) => {
      const { fieldAbout, ...property } = item
      const withV = fieldAbout.map(async (about) => {
        return {
          ...about,
          values: await prisma.fieldValue.findMany({
            where: {
              PropertyField: {
                some: {
                  id: { in: about.PropertyField.map((f) => f.id) },
                },
              },
            },
          }),
        }
      })

      return {
        ...property,
        fieldAbout: await Promise.all(withV),
      }
    })
  )
}

const getProductPropertyTitle = async (categoryId: number) => {
  return await prisma.productProperty.findMany({
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

  const product = await prisma.product.create({
    data: {
      name: input.name,
      categoryId: input.categoryId,
      image: input.image,
      description: input.description,
      price: input.price,
    },
  })
  if (!input.ProductProperty) return product
  input.ProductProperty.map(async (item) => {
    await prisma.productProperty.create({
      data: {
        titleId: item.titleId,
        productId: product.id,
        PropertyField: {
          createMany: {
            data: item.fields.map((field) => {
              return {
                aboutId: field.aboutId,
                FieldValueId: field.value,
              }
            }),
          },
        },
      },
    })
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

const createProperty = async (input: z.infer<typeof createPropertySchema>) => {
  return await prisma.productProperty.create({
    data: {
      Category: {
        connect: {
          id: input.categoryId,
        },
      },
      title: {
        create: {
          title: input.title,
        },
      },
    },
  })
}
const createPropertyField = async (
  input: z.infer<typeof createPropertyFieldSchema>
) => {
  return await prisma.propertyField.create({
    data: {
      value: {
        create: {
          value: input.value,
        },
      },
      about: {
        create: {
          title: input.title,
          description: input.description,
          slug: input.slug,
        },
      },
      ProductProperty: {
        connect: {
          id: input.propertyId,
        },
      },
    },
  })
}
export const adminService = {
  getCategories,
  deleteCategory,
  createCategory,
  getProductPropertyTitle,
  addPropertyField,
  addFieldValue,
  createProperty,
  createPropertyField,
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
