import { type PrismaClient } from '@prisma/client'
type CrumbType = { text: string; to?: string }
export const getCrumbs = async (
  prisma: PrismaClient,
  { categorySlug, lastWithTo }: { categorySlug: string; lastWithTo?: boolean }
): Promise<CrumbType[]> => {
  const category = await prisma.category.findFirstOrThrow({
    where: { slug: categorySlug },
    include: {
      parent: { include: { parent: true } },
    },
  })

  const crumbs: CrumbType[] = [{ text: 'Catalog', to: '/catalog' }]
  const parent = category?.parent?.parent
  if (parent)
    crumbs.push({
      text: parent.title,
      to: `/catalog/${parent.slug}`,
    })
  if (category && category.parent) {
    crumbs.push({
      text: category.parent.title,
      to: `/catalog/${category.parent.slug}`,
    })
  }
  crumbs.push({
    text: category.title,
    to: lastWithTo
      ? `${crumbs.at(-1)?.to ?? '/catalog'}/${category.slug}`
      : undefined,
  })
  return crumbs
}
