import useTranslation from 'next-translate/useTranslation'

export const useTrans = <T extends readonly string[]>({
  nameSpace = 'common',
  keys,
}: {
  keys: readonly [...T]
  nameSpace?: string
}) => {
  const { t } = useTranslation(nameSpace)
  const result = keys.reduce((acc, key) => {
    acc[key] = t(key)
    return acc
  }, {} as Record<(typeof keys)[number], string>)
  return result
}
