import { type language, type Prisma } from '@prisma/client'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { type getCategoriesSchema } from './category.dto'

const getCategoryArgsWhere = (
  input: z.infer<typeof getCategoriesSchema>
): Prisma.CategoryWhereInput | undefined => {
  if (typeof input === 'string')
    return {
      locale: {
        some: {
          title: {
            contains: input,
            mode: 'insensitive',
          },
        },
      },
    }
  if (input?.onlyOneLevel?.level === '1') {
    if (input.onlyOneLevel.reverse)
      return {
        NOT: {
          parentId: null,
        },
      }
    return {
      parentId: null,
    }
  }

  if (input?.onlyOneLevel?.level === '3') {
    if (input.onlyOneLevel.reverse)
      return {
        OR: [
          {
            parent: {
              parent: {
                is: null,
              },
            },
          },
          {
            parent: {
              is: null,
            },
          },
        ],
      }

    return {
      AND: [
        {
          NOT: {
            parent: {
              parent: {
                is: null,
              },
            },
          },
        },
        {
          NOT: {
            parent: {
              is: null,
            },
          },
        },
      ],
    }
  }
}
const getCategory = async ({
  lang,
  input,
}: {
  input: z.infer<typeof getCategoriesSchema>
  lang: language
}) => {
  return await prisma.category.findMany({
    where: categoryService.getCategoryArgsWhere(input),
    include: {
      locale: {
        where: {
          lang: lang,
        },
      },
      subCategories: {
        include: {
          locale: {
            where: {
              lang: lang,
            },
          },

          subCategories: {
            include: {
              locale: true,
            },
          },
        },
      },
    },
  })
}

export const categoryService = {
  getCategoryArgsWhere,
  getCategory,
}
