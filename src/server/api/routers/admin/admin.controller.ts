import { z } from 'zod'
import { adminProcedure, createTRPCRouter } from '../../trpc'
import { getCategoriesSchema } from '../category/category.dto'
import { createCategorySchema, createProductSchema } from './admin.dto'
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
  .query(async ({ input }) => {
    const productPropertyTitle = await adminService.getProductPropertyTitle(
      input
    )
    const withFields = await adminService.addFieldValue(
      await adminService.addPropertyField(productPropertyTitle)
    )
    return withFields
  })

const createProduct = adminProcedure
  .input(createProductSchema)
  .mutation(async ({ input }) => {
    return adminService.createProduct(input)
  })

const getProductList = adminProcedure.query(({ ctx }) => {
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
  .query(async ({ input }) => {
    return await adminService.getCategories(input)
  })
export const adminRouter = createTRPCRouter({
  deleteCategory,
  getCategories,
  createCategory,
  getProductProperties,
  createProduct,
  getProductList,
  deleteProduct,
})
