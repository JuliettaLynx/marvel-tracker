import { useMemo } from 'react'
import Masonry from 'react-masonry-css'
import { items } from '../data/marvelData'
import { CHECKLISTS } from '../data/checklists'
import { progressOf } from '../utils/progress'
import { useCollapsed } from '../hooks/useCollapsed'
import ProgressBar from './ProgressBar'

const itemById = new Map(items.map(i => [i.id, i]))

/** Часов у пункта: конкретный сезон или весь элемент. */
function entryHours(item, season) {
  if (season) return item.seasons?.find(s => s.name === season)?.hours ?? 0
  return item.hours ?? 0
}

/** Посмотрен ли пункт: сезон целиком / сериал целиком / фильм. */
function entryWatched(item, season, state) {
  if (item.type === 'series' && season) {
    const sec = item.seasons?.find(s => s.name === season)
    if (!sec) return false
    return (state[item.id]?.seasons?.[season] || 0) >= sec.episodes
  }
  return progressOf(item, state[item.id]).watched
}

function entryLabel(item, season, note) {
  return (
    <>
      <span className="font-medium">{item.title}</span>
      {season && <span className="text-[#98a0ad]">, {season}</span>}
      {item.year && <span className="text-[13px] text-[#98a0ad]"> ({item.year})</span>}
      {note && (
        <span className="rounded-full border border-[#262b35] bg-[#10131a] px-2 py-0.5 text-[11px] text-[#98a0ad]">
          {note}
        </span>
      )}
    </>
  )
}

function CharacterCard({ group, state, collapsed, onToggleCollapse }) {
  const stats = useMemo(() => {
    let done = 0
    let hoursTotal = 0
    let hoursWatched = 0
    const rows = group.entries.map(entry => {
      const item = itemById.get(entry.id)
      const watched = entryWatched(item, entry.season, state)
      const hours = entryHours(item, entry.season)
      if (watched) done++
      hoursTotal += hours
      if (watched) hoursWatched += hours
      return { entry, item, watched, hours }
    })
    return { rows, done, hoursTotal, hoursWatched }
  }, [group, state])

  return (
    <section className="rounded-2xl border border-[#262b35] bg-[#171a21] p-4">
      <button
        type="button"
        onClick={onToggleCollapse}
        className="flex w-full cursor-pointer items-baseline justify-between gap-3 bg-transparent p-0 text-left"
      >
        <div className="flex items-baseline gap-2">
          <span
            className={`inline-block w-4 text-sm text-[#98a0ad] transition-transform duration-200 ${
              collapsed ? '' : 'rotate-90'
            }`}
          >
            ▶
          </span>
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 self-center rounded-full"
            style={{ background: group.color }}
          />
          <h3 className="text-base font-semibold">{group.name}</h3>
        </div>
        <div className="flex shrink-0 gap-3.5 text-[13px] text-[#98a0ad]">
          <span>{stats.done} / {stats.rows.length}</span>
          <span>
            ⏱ {stats.hoursWatched.toFixed(1)} / {stats.hoursTotal.toFixed(1)} ч
          </span>
        </div>
      </button>

      <div className="mt-2.5 mb-3">
        <ProgressBar
          value={stats.hoursWatched}
          max={stats.hoursTotal}
          color={group.color}
        />
      </div>

      {!collapsed && (
        <ul className="mt-3 flex flex-col gap-1">
          {stats.rows.map(({ entry, item, watched, hours }) => (
            <li
              key={`${entry.id}__${entry.season || ''}`}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 ${
                watched ? 'opacity-60' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={watched}
                disabled
                className="h-4 w-4 cursor-default accent-[#4caf50]"
                title="Отмечается в основном списке"
              />
              <span className={`min-w-0 flex-1 text-sm ${watched ? 'line-through' : ''}`}>
                {entryLabel(item, entry.season, entry.note)}
              </span>
              <span className="shrink-0 text-[12px] text-[#98a0ad]">
                {hours > 0 ? `${hours.toFixed(1)} ч` : '— ч'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function ChecklistSection({ state }) {
  const { collapsed, toggle } = useCollapsed('marvel-tracker-collapsed-checklists')

  return (
    <section className="mt-12 border-t-2 border-[#262b35] pt-8">
      <h2 className="mb-1 text-xl font-bold">Чек-листы по персонажам</h2>
      <Masonry
        breakpointCols={{ default: 2, 768: 1 }}
        className="flex gap-3.5"
        columnClassName="flex flex-col gap-3.5"
      >
        {CHECKLISTS.map(group => (
          <CharacterCard
            key={group.id}
            group={group}
            state={state}
            collapsed={!!collapsed[group.id]}
            onToggleCollapse={() => toggle(group.id)}
          />
        ))}
      </Masonry>
    </section>
  )
}