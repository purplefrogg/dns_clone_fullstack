import { publicProcedure } from '../../../trpc'
import { z } from 'zod'

export const getProductsInput = z.object({
  slug: z.string(),
  page: z.number().catch(0),

  orderType: z.enum(['price']).optional().default('price').catch('price'),
  orderDirection: z
    .enum(['asc', 'desc'])
    .optional()
    .default('asc')
    .catch('asc'),
})

export const getProducts = publicProcedure
  .input(getProductsInput)
  .query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findUniqueOrThrow({
      where: { slug: input.slug },

      include: {
        parent: { include: { parent: true } },
        _count: { select: { products: true } },
        products: {
          orderBy: { [input.orderType]: input.orderDirection },
          take: 2,
          skip: input.page - 1,
          include: { ProductProperty: false },
        },
      },
    })

    return category
  })
