export const cn = (...args: (string | boolean | undefined)[]) =>
  args.filter(Boolean).join(' ')
