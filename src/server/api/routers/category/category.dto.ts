import { z } from 'zod'

export const getProductsSchema = z.object({
  slug: z.string().optional(),
  page: z.number().default(1),
  filter: z
    .object({
      key: z.string(),
      value: z.array(z.number()),
    })
    .array()
    .default([]),
  maxPrice: z.number().optional(),
  minPrice: z.number().optional(),
  orderType: z.enum(['price']).optional().default('price').catch('price'),
  orderDirection: z
    .enum(['asc', 'desc'])
    .optional()
    .default('asc')
    .catch('asc'),
})

export const getCategoriesSchema = z
  .object({
    onlyOneLevel: z
      .object({
        level: z.enum(['3', '1']),
        reverse: z
          .boolean()
          .describe(
            'Reverse logic, if true, will return all categories except the ones with the specified level'
          )
          .optional(),
      })
      .optional(),
  })
  .or(z.string().optional())
