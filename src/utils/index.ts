/**
 * Capitalize the first word of the string
 *
 * capitalize('hello')   -> 'Hello'
 * capitalize('va va voom') -> 'Va va voom'
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0)
    return ''
  const lower = str.toLowerCase()
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}

/**
 * Formats the given string in title case fashion
 *
 * title('hello world') -> 'Hello World'
 * title('va_va_boom') -> 'Va Va Boom'
 * title('root-hook') -> 'Root Hook'
 * title('queryItems') -> 'Query Items'
 */
export function title(str: string | null | undefined): string {
  if (!str)
    return ''
  return str
    .split(/(?=[A-Z])|[\.\-\s_]/)
    .map(s => s.trim())
    .filter(s => !!s)
    .map(s => capitalize(s.toLowerCase()))
    .join(' ')
}

/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 */
export function group<T, Key extends string | number | symbol>(array: readonly T[], getGroupId: (item: T) => Key): Partial<Record<Key, T[]>> {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item)
    if (!acc[groupId])
      acc[groupId] = []
    acc[groupId].push(item)
    return acc
  }, {} as Record<Key, T[]>)
}
