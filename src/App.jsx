import { useMemo, useState } from 'react'
import { items, GROUP_ORDER, PHASE_GROUP_ORDER, SEASON_PHASE_GROUP_ORDER, MAIN_PHASES, groupOf } from './data/marvelData'
import { progressOf } from './utils/progress'
import { useProgress } from './hooks/useProgress'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useCollapsed } from './hooks/useCollapsed'
import SummaryCards from './components/SummaryCards'
import Controls from './components/Controls'
import GroupSection from './components/GroupSection'

const EXPANDED_KEY = 'marvel-tracker-expanded'

/** Разбивает сериал на виртуальные элементы по сезонам */
function expandSeasons(item) {
  if (item.type !== 'series') return [item]
  return item.seasons.map(season => ({
    ...item,
    id: `${item.id}__${season.name}`,
    title: `${item.title}, ${season.name}`,
    year: season.year,
    type: 'series',
    seasons: [season],
    episodes: season.episodes,
    hours: season.hours,
    seasonPhase: season.phase || null,
    parentSeriesId: item.id,
    seasonName: season.name,
  }))
}

/** Определяет группу для виртуального сезона или фильма */
function groupOfPhaseMode(item) {
  if (item.seasonPhase) return item.seasonPhase
  if (item.type === 'series') return 'Сериалы вне фаз'
  if (item.phase) return item.phase
  return 'Фильмы вне фаз'
}

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
        const stateId = item.parentSeriesId || item.id
        const p = progressOf(item, s[stateId])
        if (p.watched) return { ...s, [stateId]: { ...s[stateId], seasons: {} } }
        const seasons = { ...(s[stateId]?.seasons || {}) }
        for (const season of item.seasons) seasons[season.name] = season.episodes
        return { ...s, [stateId]: { ...s[stateId], seasons } }
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
    const prepWatched = prepItems.filter(i => progressOf(i, state[i.id]).watched).length
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
      prepItems, prepWatched, prepHours, prepHoursWatched,
      totalItems, totalWatched, totalHours, totalHoursWatched,
    }
  }, [state])

  /* --- groups --- */
  const groups = useMemo(() => {
    let source = items

    // Режимы с разбивкой сезонов
    if (groupMode === 'byPhase' || groupMode === 'seriesByPhase') {
      let filtered = source.filter(i => {
        if (groupMode === 'seriesByPhase' && i.type !== 'series') return false
        if (groupMode === 'byPhase') {
          if (typeFilter === 'movie' && i.type !== 'movie') return false
          if (typeFilter === 'series' && i.type !== 'series') return false
        }
        if (filter === 'prep') return i.isPrep
        // Для сериалов watched/unwatched фильтруется после разбивки на сезоны
        if (i.type === 'series') return true
        if (filter === 'watched') return progressOf(i, state[i.id]).watched
        if (filter === 'unwatched') return !progressOf(i, state[i.id]).watched
        return true
      })

      // Разбиваем сериалы на сезоны
      const expanded = filtered.flatMap(i => expandSeasons(i))

      // Фильтруем виртуальные сезоны по статусу просмотра (для filter watched/unwatched)
      const afterFilter = expanded.filter(i => {
        if (filter === 'all' || filter === 'prep') return true
        const p = progressOf(i, state[i.parentSeriesId || i.id])
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
        hoursWatched: list.reduce((a, i) => a + progressOf(i, state[i.parentSeriesId || i.id]).hoursWatched, 0),
        doneCount: list.filter(i => progressOf(i, state[i.parentSeriesId || i.id]).watched).length,
      })

      const map = new Map()
      for (const it of afterFilter) {
        const k = groupOfPhaseMode(it)
        if (!map.has(k)) map.set(k, [])
        map.get(k).push(it)
      }

      const order = groupMode === 'seriesByPhase' ? SEASON_PHASE_GROUP_ORDER : PHASE_GROUP_ORDER

      const sortedKeys = [...map.keys()].sort((a, b) => {
        const ia = order.indexOf(a), ib = order.indexOf(b)
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
    }

    const filtered = source.filter(i => {
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