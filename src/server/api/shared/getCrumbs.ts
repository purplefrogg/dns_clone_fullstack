import { type language } from '@prisma/client'
import { prisma } from '~/server/db'
type CrumbType = { text?: string; to?: string }
export const getCrumbs = async ({
  categorySlug,

  lastWithTo,
  lang,
}: {
  categorySlug: string
  lastWithTo?: boolean
  lang: language
}): Promise<CrumbType[]> => {
  const category = await prisma.category.findFirstOrThrow({
    where: { slug: categorySlug },
    include: {
      locale: {
        where: {
          lang,
        },
      },
      parent: {
        include: {
          locale: {
            where: {
              lang,
            },
          },
          parent: {
            include: {
              locale: {
                where: {
                  lang,
                },
              },
            },
          },
        },
      },
    },
  })

  const crumbs: CrumbType[] = [
    { text: lang === 'EN' ? 'Catalog' : 'Каталог', to: '/catalog' },
  ]
  const parent = category?.parent?.parent
  if (parent)
    crumbs.push({
      text: parent.locale[0]?.title,
      to: `/catalog/${parent.slug}`,
    })
  if (category && category.parent) {
    crumbs.push({
      text: category.parent.locale[0]?.title,
      to: `/catalog/${category.parent.slug}`,
    })
  }
  crumbs.push({
    text: category.locale[0]?.title,
    to: lastWithTo
      ? `${crumbs.at(-1)?.to ?? '/catalog'}/${category.slug}`
      : undefined,
  })
  return crumbs
}
