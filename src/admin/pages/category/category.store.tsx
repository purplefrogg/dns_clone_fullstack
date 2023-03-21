import { atom, useAtom } from 'jotai'

export const searchParamAtom = atom(null, (_get, set, value: string | null) => {
  set(searchParamAtom, value)
})

export const useSearch = () => {
  const [searchParam, setSearchParam] = useAtom(searchParamAtom)
  return {
    searchParam,
    setSearchParam,
  }
}
