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
    z
      .object({
        valueId: z.number().optional(),
        value: z.string().optional(),
        fieldId: z.number(),
      })
      .refine((data) => data.valueId || data.value, {
        message: 'You must provide value or valueId',
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
