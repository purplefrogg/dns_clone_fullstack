import { type NextRouter, useRouter } from 'next/router'

export type queries = Array<
  | 'orderType'
  | 'orderDirection'
  | 'maxPrice'
  | 'minPrice'
  | 'page'
  | 'category2'
>

interface UseRouterQueryReturn<T> {
  router: NextRouter
  query: Record<Extract<queries[number], T>, string | undefined>
}

export const useRouterQuery = <T extends queries[number]>(
  queries: T[]
): UseRouterQueryReturn<T> => {
  const router = useRouter()
  const query = router.query

  return {
    router,
    query: queries.reduce(
      (a, v) => ({ ...a, [v]: query[v] }),
      {} as Record<queries[number], string | undefined>
    ),
  }
}
