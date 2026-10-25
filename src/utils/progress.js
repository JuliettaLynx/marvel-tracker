export function progressOf(item, s) {
  s = s || {}

  if (item.type === 'series') {
    const saved = s.seasons || {}

    let epsWatched = 0
    let hoursWatched = 0

    const seasonsProgress = item.seasons.map(season => {
      const w = Math.min(saved[season.name] || 0, season.episodes)
      const perEp = season.hours / season.episodes
      epsWatched += w
      hoursWatched += w * perEp

      return {
        name: season.name,
        year: season.year,
        episodes: season.episodes,
        watched: w,
        hours: season.hours,
        episodeMinutes: season.episodeMinutes,
      }
    })

    return {
      watched: epsWatched >= item.episodes,
      epsWatched,
      epsTotal: item.episodes,
      hoursWatched: +hoursWatched.toFixed(2),
      hoursTotal: item.hours,
      ratio: item.episodes ? epsWatched / item.episodes : 0,
      seasonsProgress,
    }
  }

  return {
    watched: !!s.watched,
    epsWatched: 0,
    epsTotal: 0,
    hoursWatched: s.watched ? (item.hours ?? 0) : 0,
    hoursTotal: item.hours ?? 0,
    ratio: s.watched ? 1 : 0,
    seasonsProgress: [],
  }
}

export function pluralRu(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}