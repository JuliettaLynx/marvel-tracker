import ProgressBar from './ProgressBar'
import ItemRow from './ItemRow'
import { progressOf } from '../utils/progress'

export default function GroupSection({
  group, state, prepSet,
  onToggle, onSeasonEp,
  expandedSeasons, onToggleSeasons,
  collapsed, onToggleCollapse,
}) {
  const canCollapse = group.collapsible !== false

  return (
    <section className="mb-4.5 rounded-2xl border border-[#262b35] bg-[#171a21] p-4">
      {canCollapse ? (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="group-head flex w-full cursor-pointer items-baseline justify-between gap-3 bg-transparent p-0 text-left"
        >
          <div className="flex items-baseline gap-2">
            <span
              className={`inline-block w-4 text-sm text-[#98a0ad] transition-transform duration-200 ${
                collapsed ? '' : 'rotate-90'
              }`}
            >
              ▶
            </span>
            <h2 className="text-lg font-semibold">{group.key}</h2>
          </div>
          <GroupMeta group={group} />
        </button>
      ) : (
        <div className="group-head flex w-full items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold">{group.key}</h2>
          <GroupMeta group={group} />
        </div>
      )}

      <div className={collapsed ? 'mt-2.5' : 'mt-2.5 mb-3'}>
        <ProgressBar value={group.hoursWatched} max={group.hoursTotal} />
      </div>

      {!collapsed && (
        <ul className="mt-3 flex flex-col gap-2">
          {group.list.map(item => {
            const stateKey = item.parentSeriesId || item.id
            return (
              <ItemRow
                key={item.id}
                item={item}
                progress={progressOf(item, state[stateKey])}
                onToggle={() => onToggle(item)}
                onSeasonEp={(seasonName, n) => onSeasonEp(stateKey, seasonName, n, item)}
                seasonsOpen={!!expandedSeasons[item.id]}
                onToggleSeasons={() => onToggleSeasons(item.id)}
                isPrep={prepSet.has(stateKey)}
              />
            )
          })}
        </ul>
      )}
    </section>
  )
}

function GroupMeta({ group }) {
  return (
    <div className="flex gap-3.5 text-[13px] text-[#98a0ad]">
      <span>{group.doneCount} / {group.list.length}</span>
      <span>
        ⏱ {group.hoursWatched.toFixed(1)} / {group.hoursTotal.toFixed(1)} ч
      </span>
    </div>
  )
}