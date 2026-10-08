import { useMemo, useState } from 'react'
import { items, GROUP_ORDER, MAIN_PHASES, groupOf } from './data/marvelData'
import { progressOf } from './utils/progress'
import { useProgress } from './hooks/useProgress'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useCollapsed } from './hooks/useCollapsed'
import SummaryCards from './components/SummaryCards'
import Controls from './components/Controls'
import GroupSection from './components/GroupSection'

const EXPANDED_KEY = 'marvel-tracker-expanded'

export default function App() {
  const [state, setState] = useProgress()
  const [groupMode, setGroupMode] = useState('byGroup')
  const [sortBy, setSortBy] = useState('year')
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const { collapsed, toggle, collapseAll, expandAll } = useCollapsed()
  const [expandedSeasons, setExpandedSeasons] = useLocalStorage(EXPANDED_KEY, {})

  const toggleItem = (item) =>
    setState(s => {
      if (item.type === 'series') {
        const p = progressOf(item, s[item.id])
        if (p.watched) return { ...s, [item.id]: { ...s[item.id], seasons: {} } }
        const seasons = {}
        for (const season of item.seasons) seasons[season.name] = season.episodes
        return { ...s, [item.id]: { ...s[item.id], seasons } }
      }
      return { ...s, [item.id]: { ...s[item.id], watched: !s[item.id]?.watched } }
    })

  const setSeasonEp = (id, seasonName, n) =>
    setState(s => {
      const cur = s[id]?.seasons || {}
      return {
        ...s,
        [id]: { ...s[id], seasons: { ...cur, [seasonName]: Math.max(0, n) } },
      }
    })

  const toggleSeasons = (id) =>
    setExpandedSeasons(m => ({ ...m, [id]: !m[id] }))

  /* --- stats --- */
  const stats = useMemo(() => {
    const mainMovies = items.filter(
      i => i.type === 'movie' && MAIN_PHASES.includes(i.phase)
    )
    const mainWatched = mainMovies.filter(i => progressOf(i, state[i.id]).watched).length
    const mainHours = mainMovies.reduce((a, i) => a + i.hours, 0)
    const mainHoursWatched = mainMovies.reduce(
      (a, i) => a + progressOf(i, state[i.id]).hoursWatched, 0
    )

    const prepItems = items.filter(i => i.isPrep)
    const prepMovies = prepItems.filter(i => i.type === 'movie')
    const prepMoviesWatched = prepMovies.filter(i => progressOf(i, state[i.id]).watched).length
    const prepHours = prepItems.reduce((a, i) => a + i.hours, 0)
    const prepHoursWatched = prepItems.reduce(
      (a, i) => a + progressOf(i, state[i.id]).hoursWatched, 0
    )

    const totalItems = items.length
    const totalWatched = items.filter(i => progressOf(i, state[i.id]).watched).length
    const totalHours = items.reduce((a, i) => a + i.hours, 0)
    const totalHoursWatched = items.reduce(
      (a, i) => a + progressOf(i, state[i.id]).hoursWatched, 0
    )

    return {
      mainMovies, mainWatched, mainHours, mainHoursWatched,
      prepMovies, prepMoviesWatched, prepHours, prepHoursWatched,
      totalItems, totalWatched, totalHours, totalHoursWatched,
    }
  }, [state])

  /* --- groups --- */
  const groups = useMemo(() => {
    const filtered = items.filter(i => {
      if (typeFilter === 'movie' && i.type !== 'movie') return false
      if (typeFilter === 'series' && i.type !== 'series') return false

      if (filter === 'prep') return i.isPrep
      const p = progressOf(i, state[i.id])
      if (filter === 'watched') return p.watched
      if (filter === 'unwatched') return !p.watched
      return true
    })

    const sorter = (a, b) =>
      sortBy === 'year'
        ? (a.year || 9999) - (b.year || 9999)
        : a.title.localeCompare(b.title, 'ru')

    const buildMeta = (list) => ({
      list,
      hoursTotal: list.reduce((a, i) => a + i.hours, 0),
      hoursWatched: list.reduce((a, i) => a + progressOf(i, state[i.id]).hoursWatched, 0),
      doneCount: list.filter(i => progressOf(i, state[i.id]).watched).length,
    })

    // Режим «Без группировки» — один плоский список
    if (groupMode === 'none') {
      const list = filtered.slice().sort(sorter)
      return [{ key: 'Все', collapsible: false, ...buildMeta(list) }]
    }

    // Обычная группировка
    const map = new Map()
    for (const it of filtered) {
      const k = groupOf(it)
      if (!map.has(k)) map.set(k, [])
      map.get(k).push(it)
    }

    const sortedKeys = [...map.keys()].sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a), ib = GROUP_ORDER.indexOf(b)
      if (ia !== -1 && ib !== -1) return ia - ib
      if (ia !== -1) return -1
      if (ib !== -1) return 1
      return a.localeCompare(b, 'ru')
    })

    return sortedKeys.map(k => ({
      key: k,
      collapsible: true,
      ...buildMeta(map.get(k).slice().sort(sorter)),
    }))
  }, [state, groupMode, sortBy, filter, typeFilter])

  const groupKeys = groups.map(g => g.key)

  return (
    <div className="mx-auto min-h-screen max-w-[1100px] px-4 pb-16 pt-6">
      <header className="mb-5 flex items-center justify-between">
        <h1 className="m-0 text-2xl font-bold tracking-wide">Marvel Tracker</h1>
      </header>

      <SummaryCards stats={stats} />

      <Controls
        groupMode={groupMode} setGroupMode={setGroupMode}
        sortBy={sortBy}       setSortBy={setSortBy}
        filter={filter}       setFilter={setFilter}
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        onCollapseAll={() => collapseAll(groupKeys)}
        onExpandAll={expandAll}
      />

      <main>
        {groups.map(g => (
          <GroupSection
            key={g.key}
            group={g}
            state={state}
            onToggle={toggleItem}
            onSeasonEp={setSeasonEp}
            expandedSeasons={expandedSeasons}
            onToggleSeasons={toggleSeasons}
            collapsed={!!collapsed[g.key]}
            onToggleCollapse={() => toggle(g.key)}
          />
        ))}
        {groups.length === 0 || groups[0].list.length === 0 ? (
          <p className="py-10 text-center text-[#98a0ad]">Ничего не найдено.</p>
        ) : null}
      </main>
    </div>
  )
}