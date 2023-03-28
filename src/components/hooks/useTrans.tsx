import useTranslation from 'next-translate/useTranslation'

export const useTranslate = <T extends readonly string[]>({
  nameSpace = 'common',
  keys,
}: {
  keys: readonly [...T]
  nameSpace?: string
}) => {
  const { t } = useTranslation(nameSpace)
  return keys.reduce((acc, key) => {
    acc[key] = t(key)
    return acc
  }, {} as Record<(typeof keys)[number], string>)
}
