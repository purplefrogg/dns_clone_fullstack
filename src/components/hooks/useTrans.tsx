import useTranslation from 'next-translate/useTranslation'

export const useTrans = <T extends string[]>({
  nameSpace = 'common',
  keys,
}: {
  keys: T
  nameSpace?: string
}): Record<T[number], string> => {
  const { t } = useTranslation(nameSpace)
  return keys.reduce((acc, key) => {
    acc[key as T[number]] = t(key)
    return acc
  }, {} as Record<T[number], string>)
}
