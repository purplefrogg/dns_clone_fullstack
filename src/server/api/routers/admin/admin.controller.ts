import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminProcedure, createTRPCRouter } from '../../trpc'
import { getCategoriesSchema } from '../category/category.dto'
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
  .query(async ({ input }) => {
    const productProperty = await adminService.getProductPropertyTitle(input)
    const withFields = await adminService.addFieldValue(
      await adminService.addPropertyField(productProperty)
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
  .mutation(async ({ input }) => {
    return await adminService.createProperty(input)
  })

const createPropertyField = adminProcedure
  .input(createPropertyFieldSchema)
  .mutation(async ({ input }) => {
    return await adminService.createPropertyField(input)
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
