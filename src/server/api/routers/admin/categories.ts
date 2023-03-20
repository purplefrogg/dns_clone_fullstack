import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminProcedure } from '../../trpc'

const createCategorySchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  image: z.string().optional(),
  parentId: z.number().optional(),
})
const getCategoriesParamsSchema = z.object({
  searchParam: z.string().optional(),
})
const getCategories = adminProcedure
  .input(getCategoriesParamsSchema)
  .query(({ ctx, input }) => {
    return ctx.prisma.category.findMany({
      where: {
        title: {
          contains: input.searchParam,
          mode: 'insensitive',
        },
      },
      include: {
        parent: {
          include: {
            parent: {
              include: {
                parent: true,
              },
            },
          },
        },
        subCategories: {
          select: {
            title: true,
          },
        },
      },
    })
  })
const deleteCategory = adminProcedure
  .input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.prisma.category.delete({
      where: {
        id: input,
      },
      include: {
        subCategories: {
          select: {
            title: true,
          },
        },
      },
    })
  })
const getCategories3lvl = adminProcedure.query(({ ctx, input }) => {
  return ctx.prisma.category.findMany({
    where: {
      AND: [
        {
          NOT: {
            parent: {
              parent: {
                is: null,
              },
            },
          },
        },
        {
          NOT: {
            parent: {
              is: null,
            },
          },
        },
      ],
    },
  })
})

const getCategoriesWithout3lvl = adminProcedure.query(({ ctx, input }) => {
  return ctx.prisma.category.findMany({
    where: {
      OR: [
        {
          parent: {
            is: null,
          },
        },
        {
          parent: {
            parent: {
              is: null,
            },
          },
        },
      ],
    },
    include: {
      subCategories: {
        select: {
          title: true,
        },
      },
    },
  })
})

const createCategory = adminProcedure
  .input(createCategorySchema)
  .mutation(async ({ input, ctx }) => {
    console.log(input)

    try {
      const category = await ctx.prisma.category.create({
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
  })

const getProductProperties = adminProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    const ProductProperty = await ctx.prisma.productPropertyTitle.findMany({
      where: {
        ProductProperty: {
          some: {
            product: {
              categoryId: input,
            },
          },
        },
      },
    })
    const withFields = ProductProperty.map(async (item) => {
      return {
        ...item,
        fields: await ctx.prisma.propertyFieldAbout.findMany({
          where: {
            PropertyField: {
              some: {
                ProductProperty: {
                  titleId: item.id,
                },
              },
            },
          },
        }),
      }
    })
    const withValues = withFields.map(async (item) => {
      const { fields, ...title } = await item
      const withV = fields.map(async (field) => {
        return {
          ...field,
          values: await ctx.prisma.fieldValue.findMany({
            where: {
              PropertyField: {
                some: {
                  aboutId: title.id,
                },
              },
            },
          }),
        }
      })

      return {
        ...title,
        fields: await Promise.all(withV),
      }
    })

    return await Promise.all(withValues)
  })

export const categoriesRouter = {
  getCategories,
  getProductProperties,
  deleteCategory,
  getCategories3lvl,
  getCategoriesWithout3lvl,
  createCategory,
}
