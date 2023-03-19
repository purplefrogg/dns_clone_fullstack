import { z } from 'zod'
import { adminProcedure } from '../../trpc'

const getProductList = adminProcedure.query(({ ctx, input }) => {
  return ctx.prisma.product.findMany({
    include: {
      ProductProperty: true,
      category: true,
    },
  })
})
const createProductSchema = z.object({
  name: z.string(),
  categoryId: z.number(),
  image: z.string().optional(),
  description: z.string(),
  price: z.number(),
})

const createProduct = adminProcedure
  .input(createProductSchema)
  .mutation(({ ctx, input }) => {
    return ctx.prisma.product.create({
      data: {
        name: input.name,
        categoryId: input.categoryId,
        image: input.image,
        description: input.description,
        price: input.price,
      },
    })
  })

export const adminProductsRouter = {
  getProductList,
  createProduct,
}
