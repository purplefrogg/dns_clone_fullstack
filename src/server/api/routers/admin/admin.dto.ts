import { z } from 'zod'

export const createCategorySchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  image: z.string().optional(),
  parentId: z.number().optional(),
})

export const createProductSchema = z.object({
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
export const createPropertySchema = z.object({
  title: z.string(),
  categoryId: z.number(),
})

export const createPropertyFieldSchema = z.object({
  title: z.string(),
  description: z.string(),
  value: z.string(),
  slug: z.string(),
  propertyId: z.number(),
})
