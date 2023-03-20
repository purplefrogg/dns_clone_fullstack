import { z } from 'zod'
import { adminProcedure } from '../../trpc'

const getProductList = adminProcedure.query(({ ctx, input }) => {
  return ctx.prisma.product.findMany({
    include: {
      ProductProperty: {
        include: {
          PropertyField: true,
        },
      },
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
  ProductProperty: z
    .array(
      z.object({
        titleId: z.number(),
        fields: z.array(z.object({ aboutId: z.number(), value: z.number() })),
      })
    )
    .optional(),
})

const createProduct = adminProcedure
  .input(createProductSchema)
  .mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.create({
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
      await ctx.prisma.productProperty.create({
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
export const adminProductsRouter = {
  getProductList,
  createProduct,
  deleteProduct,
}
