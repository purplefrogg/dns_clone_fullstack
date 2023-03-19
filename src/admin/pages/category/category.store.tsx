import { atom, useAtom } from 'jotai'

export const searchParamAtom = atom('', (_get, set, value: string) => {
  set(searchParamAtom, value)
})
export const searchAtom = atom(false, (_get, set, value: boolean) => {
  set(searchAtom, value)
})

export const useSearch = () => {
  const [searchParam, setSearchParam] = useAtom(searchParamAtom)
  const [search, setSearch] = useAtom(searchAtom)

  return {
    searchParam,
    setSearchParam,
    search,
    setSearch,
  }
}
