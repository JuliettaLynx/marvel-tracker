import ProgressBar from './ProgressBar'

export default function SummaryCard({
  title, value, max, hoursWatched, hoursTotal,
  color = '#e62429', highlight = false,
}) {
  return (
    <div
      className={`rounded-2xl border bg-[#171a21] p-4 ${
        highlight
          ? 'border-[#f5a623]/40 ring-1 ring-inset ring-[#f5a623]/15'
          : 'border-[#262b35]'
      }`}
    >
      <div className="mb-2 text-xs uppercase tracking-wider text-[#98a0ad]">
        {title}
      </div>
      <div className="mb-2.5 text-2xl font-bold">
        {value} / {max}
      </div>
      <ProgressBar value={hoursWatched} max={hoursTotal} color={color} />
      <div className="mt-2 text-[13px] text-[#98a0ad]">
        ⏱ {hoursWatched.toFixed(1)} /{' '}
        {hoursTotal.toFixed(1)} ч
      </div>
    </div>
  )
}