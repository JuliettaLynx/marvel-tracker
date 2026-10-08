import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useCollapsed(storageKey = 'marvel-tracker-collapsed') {
  const [collapsed, setCollapsed] = useLocalStorage(storageKey, {})

  const toggle = useCallback(
    (key) =>
      setCollapsed(c => ({ ...c, [key]: !c[key] })),
    [setCollapsed]
  )

  const collapseAll = useCallback(
    (keys) =>
      setCollapsed(Object.fromEntries(keys.map(k => [k, true]))),
    [setCollapsed]
  )

  const expandAll = useCallback(() => setCollapsed({}), [setCollapsed])

  return { collapsed, toggle, collapseAll, expandAll }
}