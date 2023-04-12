import { z } from 'zod'

export const createCategorySchema = z.object({
  titleRu: z.string(),
  titleEn: z.string(),
  slug: z.string().optional(),
  image: z.string().optional(),
  parentId: z.number().optional(),
})

export const createProductSchema = z.object({
  name: z.string(),
  nameRu: z.string(),
  descriptionRu: z.string(),
  categoryId: z.number(),
  image: z.string().optional(),
  description: z.string(),
  price: z.number(),
  ProductProperty: z.array(
    z.object({
      value: z.string(),
      fieldId: z.number(),
    })
  ),
})
export const createPropertySchema = z.object({
  titleEn: z.string(),
  titleRu: z.string(),
  categoryId: z.number(),
})

export const createPropertyFieldSchema = z.object({
  title: z.string(),
  titleRu: z.string(),
  description: z.string(),
  descriptionRu: z.string(),
  slug: z.string(),
  propertyId: z.number(),
})
