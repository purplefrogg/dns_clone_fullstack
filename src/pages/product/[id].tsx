import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/templates/product/product'

import { ssg } from '~/utils/ssg'
export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id as string

  // prefetch `post.byId`
  await ssg.product.getById.prefetch(+id)

  return {
    props: {
      trpcState: ssg.dehydrate(),

      id,
    },
    revalidate: 1,
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  })
  return {
    paths: products.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
    fallback: 'blocking',
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  return <Product id={+props.id} />
}

export default Page
