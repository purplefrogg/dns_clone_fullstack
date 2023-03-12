import { type NextRouter, useRouter } from 'next/router'

export type queries = Array<
  | 'orderType'
  | 'orderDirection'
  | 'maxPrice'
  | 'minPrice'
  | 'page'
  | 'category2'
  | 'category'
>

interface UseRouterQueryReturn<T> {
  router: NextRouter
  query: Record<Extract<queries[number], T>, string | undefined>
  rest: Record<string, string | string[] | undefined>
}

export const useRouterQuery = <T extends queries[number]>(
  queries: T[]
): UseRouterQueryReturn<T> => {
  const router = useRouter()
  const query = queries.reduce(
    (a, v) => ({ ...a, [v]: router.query[v] }),
    {} as Record<queries[number], string | undefined>
  )
  const rest = Object.entries(router.query)

    .filter(([key]) => !queries.includes(key as T))
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {} as Record<string, string | string[] | undefined>)

  return {
    router,
    query,
    rest,
  }
}
