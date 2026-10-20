const SELECT =
  'cursor-pointer rounded-lg border border-[#262b35] bg-[#171a21] px-2.5 py-1.5 text-sm text-[#e8ecf1]'
const LABEL = 'flex items-center gap-2 text-sm text-[#98a0ad]'
const BTN =
  'cursor-pointer rounded-lg border border-[#262b35] bg-[#171a21] px-3 py-1.5 text-sm text-[#98a0ad] transition-colors hover:border-[#e62429] hover:text-[#e62429]'

export default function Controls({
  groupMode, setGroupMode,
  sortBy, setSortBy,
  filter, setFilter,
  typeFilter, setTypeFilter,
  onCollapseAll, onExpandAll,
}) {
  return (
    <section className="mb-6 flex flex-wrap items-center gap-3.5">
      <label className={LABEL}>
        Группировка:
        <select className={SELECT} value={groupMode} onChange={e => setGroupMode(e.target.value)}>
          <option value="byGroup">По фазам и сериалам</option>
          <option value="byPhase">По фазам</option>
          <option value="seriesByPhase">Сериалы по фазам</option>
          <option value="none">Без группировки</option>
        </select>
      </label>

      <label className={LABEL}>
        Сортировка:
        <select className={SELECT} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="year">По дате выхода</option>
          <option value="title">По названию</option>
        </select>
      </label>

      <label className={LABEL}>
        Тип:
        <select className={SELECT} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">Все</option>
          <option value="movie">🎬 Только фильмы</option>
          <option value="series">📺 Только сериалы</option>
        </select>
      </label>

      <label className={LABEL}>
        Фильтр:
        <select className={SELECT} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Все</option>
          <option value="prep">🎯 Только к «Судному дню»</option>
          <option value="watched">Просмотренные</option>
          <option value="unwatched">Непросмотренные</option>
        </select>
      </label>

      <div className="ml-auto flex gap-2">
        <button className={BTN} onClick={onCollapseAll} title="Свернуть все группы">⏶ Свернуть всё</button>
        <button className={BTN} onClick={onExpandAll} title="Развернуть все группы">⏷ Развернуть всё</button>
      </div>
    </section>
  )
}