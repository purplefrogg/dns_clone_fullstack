import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminProcedure, createTRPCRouter } from '../../trpc'
import { getCategoriesSchema } from '../category/category.dto'
import { categoryService } from '../category/category.service'
import {
  createCategorySchema,
  createProductSchema,
  createPropertyFieldSchema,
  createPropertySchema,
} from './admin.dto'
import { adminService } from './admin.service'

const deleteCategory = adminProcedure
  .input(z.number())
  .mutation(async ({ input }) => {
    return await adminService.deleteCategory(input)
  })

const createCategory = adminProcedure
  .input(createCategorySchema)
  .mutation(async ({ input }) => {
    return await adminService.createCategory(input)
  })

const getProductProperties = adminProcedure
  .input(z.number())
  .query(async ({ input, ctx }) => {
    const category = await ctx.prisma.category.findUnique({
      where: {
        id: input,
      },
      include: {
        properties: {
          select: {
            title: {
              select: {
                locale: {
                  where: {
                    lang: ctx.lang,
                  },
                },
              },
            },
            id: true,
            field: {
              select: {
                about: {
                  select: {
                    slug: true,
                    locale: {
                      where: {
                        lang: ctx.lang,
                      },
                    },
                  },
                },
                id: true,
                FieldValue: true,
              },
            },
          },
        },
      },
    })

    return category?.properties
  })

const createProduct = adminProcedure
  .input(createProductSchema)
  .mutation(async ({ input }) => {
    return adminService.createProduct(input)
  })

const getProductList = adminProcedure.query(({ ctx }) => {
  return ctx.prisma.product.findMany({
    include: {
      category: true,
      locale: {
        where: {
          lang: ctx.lang,
        },
      },
    },
  })
})

const deleteProduct = adminProcedure
  .input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.prisma.product.delete({
      where: {
        id: input,
      },
    })
  })
const getCategories = adminProcedure
  .input(getCategoriesSchema)
  .query(async ({ input, ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      where: categoryService.getCategoryArgsWhere(input),
      include: {
        parent: {
          include: {
            locale: {
              where: {
                lang: ctx.lang,
              },
            },
          },
        },
        subCategories: {
          include: {
            locale: {
              where: {
                lang: ctx.lang,
              },
            },
          },
        },
        locale: {
          where: {
            lang: ctx.lang,
          },
        },
      },
    })
    return categories
  })

const getUsers = adminProcedure.query(async ({ ctx }) => {
  return ctx.prisma.user.findMany()
})

const deleteUser = adminProcedure
  .input(z.number())
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: input,
      },
    })
    if (user.role === 'ADMIN') {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'You can not delete admin',
      })
    }
    return ctx.prisma.user.delete({
      where: {
        id: input,
      },
    })
  })

const createProperty = adminProcedure
  .input(createPropertySchema)
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.property.create({
      data: {
        title: {
          create: {
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
          },
        },
        category: {
          connect: {
            id: input.categoryId,
          },
        },
      },
    })
  })

const createPropertyField = adminProcedure
  .input(createPropertyFieldSchema)
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.field.create({
      data: {
        property: {
          connect: {
            id: input.propertyId,
          },
        },
        about: {
          create: {
            locale: {
              createMany: {
                data: [
                  {
                    lang: 'EN',
                    title: input.title,
                    description: input.description,
                  },
                  {
                    lang: 'RU',
                    title: input.titleRu,
                    description: input.descriptionRu,
                  },
                ],
              },
            },
            slug: input.slug,
          },
        },
      },
    })
  })

export const adminRouter = createTRPCRouter({
  deleteUsers: deleteUser,

  getUsers,
  deleteCategory,
  getCategories,
  createCategory,
  getProductProperties,
  getProductList,
  deleteProduct,
  createProduct,
  createProperty,
  createPropertyField,
})
