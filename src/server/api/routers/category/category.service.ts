import { type Prisma } from '@prisma/client'
import { type z } from 'zod'
import { prisma } from '~/server/db'
import { getCrumbs } from '../../shared/getCrumbs'
import { type getCategoriesSchema } from './category.dto'

const getCategoryArgsWhere = (
  input: z.infer<typeof getCategoriesSchema>
): Prisma.CategoryWhereInput | undefined => {
  if (typeof input === 'string')
    return {
      title: {
        contains: input,
        mode: 'insensitive',
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
const getCategory = ({
  input,
}: {
  input: z.infer<typeof getCategoriesSchema>
}) => {
  return prisma.category.findMany({
    where: categoryService.getCategoryArgsWhere(input),
    include: {
      subCategories: {
        include: {
          subCategories: true,
        },
      },
    },
  })
}
const getBySlug = async (slug: string) => {
  const category = await prisma.category.findFirstOrThrow({
    where: { slug },
    include: {
      parent: { include: { parent: true } },
      subCategories: { include: { subCategories: true } },
    },
  })

  const crumbs = await getCrumbs({ categorySlug: category.slug })
  return { category, crumbs }
}

export const categoryService = {
  getCategoryArgsWhere,
  getCategory,
  getBySlug,
}
