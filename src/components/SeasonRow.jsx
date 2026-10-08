import ProgressBar from './ProgressBar'
import EpisodeControls from './EpisodeControls'

export default function SeasonRow({ season, showName, onChange }) {
  const done = season.watched >= season.episodes

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg bg-[#171a21] px-3 py-2">
      {showName && (
        <span className="min-w-[110px] text-[13px] font-medium text-[#98a0ad]">
          {season.name}
          <span className="opacity-60"> ({season.year})</span>
        </span>
      )}

      <div className="min-w-[100px] flex-1">
        <ProgressBar
          value={season.watched}
          max={season.episodes}
          color={done ? '#4caf50' : '#e62429'}
        />
      </div>

      <span className="min-w-[60px] text-right text-[13px] text-[#98a0ad]">
        {season.watched} / {season.episodes}
      </span>

      <EpisodeControls
        current={season.watched}
        total={season.episodes}
        onChange={onChange}
      />
    </div>
  )
}