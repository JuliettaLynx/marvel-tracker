import ProgressBar from './ProgressBar'
import SeasonRow from './SeasonRow'
import { pluralRu } from '../utils/progress'

const BADGE =
  'rounded-full border border-[#262b35] bg-[#10131a] px-2 py-0.5 text-[11px] text-[#98a0ad]'

const TOGGLE_BTN =
  'ml-auto flex cursor-pointer items-center gap-1 rounded-md border border-[#262b35] bg-[#171a21] px-2.5 py-1 text-[12px] text-[#98a0ad] transition-colors hover:border-[#e62429] hover:text-[#e62429]'

export default function ItemRow({
  item, progress, onToggle, onSeasonEp,
  seasonsOpen, onToggleSeasons,
}) {
  const isSeries = item.type === 'series'

  let yearLabel = item.year ? `(${item.year})` : null
  if (isSeries && item.seasons && item.seasons.length > 1) {
    const years = item.seasons.map(s => s.year)
    const min = Math.min(...years), max = Math.max(...years)
    if (min !== max) yearLabel = `(${min}–${max})`
  }

  const seasonCount = item.seasons?.length || 0
  const seasonsLabel = pluralRu(seasonCount, 'сезон', 'сезона', 'сезонов')

  return (
    <li
      className={`flex gap-3 rounded-[10px] border bg-[#1f232c] p-3 transition-colors ${
        progress.watched ? 'border-[#4caf50]/35 opacity-80' : 'border-transparent'
      }`}
    >
      <label className="pt-0.5">
        <input
          type="checkbox"
          className="h-5 w-5 cursor-pointer accent-[#e62429]"
          checked={progress.watched}
          onChange={onToggle}
        />
      </label>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="font-semibold">{item.title}</span>
          {yearLabel && <span className="text-[13px] text-[#98a0ad]">{yearLabel}</span>}

          {item.isPrep && (
            <span className={`${BADGE} border-[#f5a623]/40 bg-[#f5a623]/10 text-[#f5a623]`}>
              🎯 Prep
            </span>
          )}

          {item.earth && (
            <span className={`${BADGE} border-[#c39bff]/30 text-[#c39bff]`}>
              {item.earth}
            </span>
          )}
          {item.phase && (
            <span className={`${BADGE} border-[#ff8fa3]/30 text-[#ff8fa3]`}>
              {item.phase}
            </span>
          )}

          {isSeries && (
            <button
              type="button"
              className={TOGGLE_BTN}
              onClick={onToggleSeasons}
              aria-expanded={seasonsOpen}
            >
              <span
                className={`inline-block transition-transform duration-200 ${
                  seasonsOpen ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
              {seasonsOpen
                ? 'Скрыть сезоны'
                : `Показать ${seasonCount} ${seasonsLabel}`}
            </button>
          )}
        </div>

        {isSeries && (
            <ProgressBar
                value={progress.ratio}
                max={1}
                color={progress.watched ? '#4caf50' : '#e62429'}
            />
        )}

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#98a0ad]">
          {isSeries ? (
            <>
              <span>📺 {progress.epsWatched} / {progress.epsTotal} серий</span>
              <span>
                ⏱ {progress.hoursWatched.toFixed(1)} / {progress.hoursTotal.toFixed(1)} ч
              </span>
            </>
          ) : (
            <span>
              {progress.watched ? '✅ Просмотрено' : 'Не просмотрено'} · ⏱ {item.hours} ч
            </span>
          )}
        </div>

        {isSeries && seasonsOpen && (
          <div className="mt-3 flex flex-col gap-2 border-t border-[#262b35] pt-3">
            {progress.seasonsProgress.map(season => (
              <SeasonRow
                key={season.name}
                season={season}
                showName={seasonCount > 1}
                onChange={n => onSeasonEp(season.name, n)}
              />
            ))}
          </div>
        )}
      </div>
    </li>
  )
}