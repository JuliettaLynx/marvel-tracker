const BTN =
  'cursor-pointer rounded-md border border-[#262b35] bg-[#262b35] px-2.5 py-1 text-[13px] text-[#e8ecf1] transition-colors hover:border-[#e62429] hover:bg-[#e62429]'

export default function EpisodeControls({ current, total, onChange }) {
  return (
    <div className="mt-2.5 flex items-center gap-2">
      <button className={BTN} onClick={() => onChange(0)} title="Сбросить">0</button>
      <button className={BTN} onClick={() => onChange(current - 1)}>−1</button>
      <span className="min-w-[60px] text-center text-[13px] text-[#98a0ad]">
        {current} / {total}
      </span>
      <button className={BTN} onClick={() => onChange(current + 1)}>+1</button>
      <button className={BTN} onClick={() => onChange(total)}>Все</button>
    </div>
  )
}