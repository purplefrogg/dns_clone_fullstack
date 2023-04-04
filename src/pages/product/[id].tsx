import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/components/pages/product/product'

import { ssg } from '~/utils/ssg'
export const getStaticPaths: GetStaticPaths = async ({
  locales: initLocales,
}) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  })

  const paths = []
  const locales = initLocales ?? ['en']
  for (const product of products) {
    for (const locale of locales) {
      paths.push({
        params: {
          id: product.id.toString(),
        },
        locale,
      })
    }
  }

  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  if (!context.params?.id) {
    return null
  }
  const id = context.params.id

  // prefetch `post.byId

  await ssg.product.getById.prefetch({
    id: +id,
    lang: context.locale as 'ru' | 'en',
  })
  return {
    props: {
      trpcState: ssg.dehydrate(),

      id,
    },
    revalidate: 1,
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  if (!props.id) return null
  return <Product id={+props.id} />
}

export default Page
