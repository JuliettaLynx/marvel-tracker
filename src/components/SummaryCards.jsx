import SummaryCard from './SummaryCard'
import { PREP_SETS, ACTIVE_PREP } from '../data/marvelData'

const prepLabel = PREP_SETS[ACTIVE_PREP].label

export default function SummaryCards({ stats }) {
  return (
    <section className="mb-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        title="Основные фазы (1–6) · фильмы"
        value={stats.mainWatched}
        max={stats.mainMovies.length}
        hoursWatched={stats.mainHoursWatched}
        hoursTotal={stats.mainHours}
      />
      <SummaryCard
        title={`🎯 Подготовка к «${prepLabel}»`}
        value={stats.prepMoviesWatched}
        max={stats.prepMovies.length}
        hoursWatched={stats.prepHoursWatched}
        hoursTotal={stats.prepHours}
        color="#f5a623"
        highlight
        subPrefix="С учётом «Локи»:"
      />
      <SummaryCard
        title="Всего в трекере"
        value={stats.totalWatched}
        max={stats.totalItems}
        hoursWatched={stats.totalHoursWatched}
        hoursTotal={stats.totalHours}
        color="#4caf50"
      />
    </section>
  )
}