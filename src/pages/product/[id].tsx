import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/components/pages/product/product'

import { ssg } from '~/utils/ssg'

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  console.log('getStaticProps', context)

  const id = context.params?.id ?? 0

  // prefetch `post.byId`
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
export const getStaticPaths: GetStaticPaths = async ({
  locales: initLocales,
}) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  })
  console.log('getStaticPaths products', products)

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
  console.log('getStaticPaths paths', paths)

  return {
    paths,
    fallback: 'blocking',
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return <Product id={+props.id} />
}

export default Page
