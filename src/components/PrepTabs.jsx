import { PREP_SETS } from '../data/marvelData'

const TAB =
  'cursor-pointer rounded-full border border-[#262b35] bg-[#171a21] px-3.5 py-1.5 text-[13px] text-[#98a0ad] transition-colors hover:border-[#f5a623]/50 hover:text-[#e8ecf1]'
const TAB_ACTIVE =
  'border-[#f5a623] bg-[#f5a623]/10 text-[#f5a623] hover:text-[#f5a623]'

/**
 * Карусель наборов подготовки. Табы генерируются из PREP_SETS —
 * новый набор в данных появляется в UI сам, без правок компонента.
 */
export default function PrepTabs({ active, onChange }) {
  return (
    <section className="mb-4">
      <div className="mb-2 text-xs uppercase tracking-wider text-[#98a0ad]">
        Списки подготовки — выберите конечную точку
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(PREP_SETS).map(([key, set]) => (
          <button
            key={key}
            type="button"
            className={`${TAB} ${key === active ? TAB_ACTIVE : ''}`}
            onClick={() => onChange(key)}
          >
            🎯 {set.label}
          </button>
        ))}
      </div>
    </section>
  )
}
