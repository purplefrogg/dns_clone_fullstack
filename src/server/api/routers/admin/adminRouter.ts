import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminProcedure, createTRPCRouter } from '../../trpc'

const createCategorySchema = z.object({
  title: z.string(),
  slug: z.string(),
  image: z.string().optional(),
  parentId: z.number().optional(),
})

export const adminRouter = createTRPCRouter({
  getCategories: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      include: {
        subCategories: {
          select: {
            title: true,
          },
        },
      },
    })
  }),
  deleteCategory: adminProcedure
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
    }),
  getCategoriesWithout3lvlParents: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: {
        NOT: {
          parent: {
            parent: {
              parent: {
                is: null,
              },
            },
          },
        },
      },
      include: {
        subCategories: {
          select: {
            title: true,
          },
        },
      },
    })
  }),

  createCategory: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const category = await ctx.prisma.category.create({
          data: {
            title: input.title,
            slug: input.slug,
            image: input.image,
            parent: {
              connect: {
                id: input.parentId,
              },
            },
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
    }),
})
