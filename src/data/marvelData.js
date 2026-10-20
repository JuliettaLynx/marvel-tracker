/* ---------- Хелперы ---------- */
const movie = (id, title, year, hours, opts = {}) => ({
    id, title, year, type: 'movie', hours, episodes: null, seasons: null,
    phase: null, earth: null, ...opts,
})

const series = (id, title, year, seasons, opts = {}) => {
    const preparedSeasons = seasons.map(s => {
        const episodeMinutes = s.episodeMinutes ?? 45
        const hours = +((s.episodes * episodeMinutes) / 60).toFixed(2)
        return { ...s, episodeMinutes, hours }
    })

    const episodes = preparedSeasons.reduce((a, s) => a + s.episodes, 0)
    const hours = +preparedSeasons.reduce((a, s) => a + s.hours, 0).toFixed(2)

    return {
        id, title, year, type: 'series',
        seasons: preparedSeasons,
        episodes,
        hours,
        phase: null, earth: null, ...opts,
    }
}

/* ---------- Группы ---------- */
export const GROUP_ORDER = [
    'Сериалы',
    'Фильмы вне фаз',
    'Фаза 1', 'Фаза 2', 'Фаза 3', 'Фаза 4',
    'Фаза 5', 'Фаза 6', 'Фаза 7',
]

export const PHASE_GROUP_ORDER = [
    'Фаза 1', 'Фаза 2', 'Фаза 3', 'Фаза 4',
    'Фаза 5', 'Фаза 6',
    'Фильмы вне фаз', 'Сериалы вне фаз',
]

export const SEASON_PHASE_GROUP_ORDER = [
    'Фаза 1', 'Фаза 2', 'Фаза 3', 'Фаза 4',
    'Фаза 5', 'Фаза 6',
    'Сериалы вне фаз',
]

export const MAIN_PHASES = ['Фаза 1', 'Фаза 2', 'Фаза 3', 'Фаза 4', 'Фаза 5', 'Фаза 6']

/** Фаза для каждого сезона сериала (ключ: `${seriesId}__${seasonName}`) */
export const SEASON_PHASE = {
    'dd__S1': 'Фаза 2',
    'dd__S2': 'Фаза 3',
    'dd__S3': 'Фаза 3',
    'jj__S1': 'Фаза 2',
    'jj__S2': 'Фаза 3',
    'jj__S3': 'Фаза 3',
    'lc__S1': 'Фаза 3',
    'lc__S2': 'Фаза 3',
    'if__S1': 'Фаза 3',
    'if__S2': 'Фаза 3',
    'def__S1': 'Фаза 3',
    'pun__S1': 'Фаза 3',
    'pun__S2': 'Фаза 3',
    'wv__S1': 'Фаза 4',
    'tfatws__S1': 'Фаза 4',
    'loki__S1': 'Фаза 4',
    'loki__S2': 'Фаза 5',
    'whatif__S1': 'Фаза 4',
    'whatif__S2': 'Фаза 5',
    'whatif__S3': 'Фаза 5',
    'hawk__S1': 'Фаза 4',
    'mk__S1': 'Фаза 4',
    'msm__S1': 'Фаза 4',
    'sheh__S1': 'Фаза 4',
    'groot__S1': 'Фаза 4',
    'groot__S2': 'Фаза 5',
    'si__S1': 'Фаза 5',
    'echo__S1': 'Фаза 5',
    'agatha__S1': 'Фаза 5',
    'ddba__S1': 'Фаза 5',
    'ddba__S2': 'Фаза 6',
    'ihrt__S1': 'Фаза 5',
    'wonderman__S1': 'Фаза 6',
    'vision__S1': 'Фаза 6',
}

/** Определяет группу для элемента: сериал / фаза / вне фаз. */
export function groupOf(item) {
    if (item.type === 'series') return 'Сериалы'
    if (item.phase) return item.phase
    return 'Фильмы вне фаз'
}

/** Определяет группу для элемента в режиме «По фазам» (с учётом сезона). */
export function groupOfByPhase(item, seasonName) {
    if (item.type === 'series') {
        const key = `${item.id}__${seasonName}`
        return SEASON_PHASE[key] || 'Сериалы вне фаз'
    }
    if (item.phase) return item.phase
    return 'Фильмы вне фаз'
}

/* ---------- Данные ---------- */
export const items = [
    /* ============ СЕРИАЛЫ (все в одной группе) ============ */
    series('dd', 'Сорвиголова', 2015, [
        { name: 'S1', year: 2015, episodes: 13, episodeMinutes: 54, phase: 'Фаза 2' },
        { name: 'S2', year: 2016, episodes: 13, episodeMinutes: 54, phase: 'Фаза 3' },
        { name: 'S3', year: 2018, episodes: 13, episodeMinutes: 52, phase: 'Фаза 3' },
    ]),

    series('jj', 'Джессика Джонс', 2015, [
        { name: 'S1', year: 2015, episodes: 13, episodeMinutes: 50, phase: 'Фаза 2' },
        { name: 'S2', year: 2018, episodes: 13, episodeMinutes: 50, phase: 'Фаза 3' },
        { name: 'S3', year: 2019, episodes: 13, episodeMinutes: 50, phase: 'Фаза 3' },
    ]),

    series('lc', 'Люк Кейдж', 2016, [
        { name: 'S1', year: 2016, episodes: 13, episodeMinutes: 50, phase: 'Фаза 3' },
        { name: 'S2', year: 2018, episodes: 13, episodeMinutes: 50, phase: 'Фаза 3' },
    ]),

    series('if', 'Железный кулак', 2017, [
        { name: 'S1', year: 2017, episodes: 13, episodeMinutes: 50, phase: 'Фаза 3' },
        { name: 'S2', year: 2018, episodes: 10, episodeMinutes: 50, phase: 'Фаза 3' },
    ]),

    series('def', 'Защитники', 2017, [
        { name: 'S1', year: 2017, episodes: 8, episodeMinutes: 50, phase: 'Фаза 3' },
    ]),

    series('pun', 'Каратель', 2017, [
        { name: 'S1', year: 2017, episodes: 13, episodeMinutes: 55, phase: 'Фаза 3' },
        { name: 'S2', year: 2019, episodes: 13, episodeMinutes: 55, phase: 'Фаза 3' },
    ]),

    series('wv', 'ВандаВижн', 2021, [{ name: 'S1', year: 2021, episodes: 9, episodeMinutes: 40, phase: 'Фаза 4' }]),
    
    series('tfatws', 'Сокол и Зимний солдат', 2021, [{ name: 'S1', year: 2021, episodes: 6, episodeMinutes: 55, phase: 'Фаза 4' }]),
    
    series('loki', 'Локи', 2021, [
        { name: 'S1', year: 2021, episodes: 6, episodeMinutes: 50, phase: 'Фаза 4' },
        { name: 'S2', year: 2023, episodes: 6, episodeMinutes: 50, phase: 'Фаза 5' },
    ]),
    
    series('hawk', 'Соколиный глаз', 2021, [{ name: 'S1', year: 2021, episodes: 6, episodeMinutes: 50, phase: 'Фаза 4' }]),
    
    series('mk', 'Лунный рыцарь', 2022, [{ name: 'S1', year: 2022, episodes: 6, episodeMinutes: 50, phase: 'Фаза 4' }]),
    
    series('msm', 'Мисс Марвел', 2022, [{ name: 'S1', year: 2022, episodes: 6, episodeMinutes: 45, phase: 'Фаза 4' }]),
    
    series('sheh', 'Женщина-Халк', 2022, [{ name: 'S1', year: 2022, episodes: 9, episodeMinutes: 33, phase: 'Фаза 4' }]),
    
    series('si', 'Секретное вторжение', 2023, [{ name: 'S1', year: 2023, episodes: 6, episodeMinutes: 45, phase: 'Фаза 5' }]),
    
    series('agatha', 'Это всё Агата', 2024, [{ name: 'S1', year: 2024, episodes: 9, episodeMinutes: 40, phase: 'Фаза 5' }]),
    
    series('echo', 'Эхо', 2024, [{ name: 'S1', year: 2024, episodes: 5, episodeMinutes: 40, phase: 'Фаза 5' }]),
    
    series('whatif', 'Что если..?', 2021, [
        { name: 'S1', year: 2021, episodes: 9, episodeMinutes: 32, phase: 'Фаза 4' },
        { name: 'S2', year: 2023, episodes: 9, episodeMinutes: 32, phase: 'Фаза 5' },
        { name: 'S3', year: 2024, episodes: 8, episodeMinutes: 32, phase: 'Фаза 5' },
    ]),

    series('ddba', 'Сорвиголова: Рождённый заново', 2025, [
        { name: 'S1', year: 2025, episodes: 9, episodeMinutes: 60, phase: 'Фаза 5' },
        { name: 'S2', year: 2026, episodes: 9, episodeMinutes: 60, phase: 'Фаза 6' },
    ]),
    
    series('ihrt', 'Железное сердце', 2025, [{ name: 'S1', year: 2025, episodes: 6, episodeMinutes: 48, phase: 'Фаза 5' }]),
    
    series('wonderman', 'Чудо-человек', 2025, [{ name: 'S1', year: 2025, episodes: 8, episodeMinutes: 30, phase: 'Фаза 6' }]),
    
    series('vision', 'Вижн', 2026, [{ name: 'S1', year: 2026, episodes: 8, episodeMinutes: 50, phase: 'Фаза 6' }]),

    series('legion', 'Легион', 2017, [
        { name: 'S1', year: 2017, episodes: 8, episodeMinutes: 55 },
        { name: 'S2', year: 2018, episodes: 11, episodeMinutes: 55 },
        { name: 'S3', year: 2019, episodes: 8, episodeMinutes: 55 },
    ], { earth: 'Земля 10005' }),

    series('aos', 'Агенты Щ.И.Т.', 2013, [
        { name: 'S1', year: 2013, episodes: 22, episodeMinutes: 43 },
        { name: 'S2', year: 2014, episodes: 22, episodeMinutes: 43 },
        { name: 'S3', year: 2015, episodes: 22, episodeMinutes: 43 },
        { name: 'S4', year: 2016, episodes: 22, episodeMinutes: 43 },
        { name: 'S5', year: 2017, episodes: 22, episodeMinutes: 43 },
        { name: 'S6', year: 2019, episodes: 13, episodeMinutes: 43 },
        { name: 'S7', year: 2020, episodes: 13, episodeMinutes: 43 },
    ]),

    series('carter', 'Агент Картер', 2015, [
        { name: 'S1', year: 2015, episodes: 8, episodeMinutes: 42 },
        { name: 'S2', year: 2016, episodes: 10, episodeMinutes: 42 },
    ]),

    series('runaways', 'Беглецы', 2017, [
        { name: 'S1', year: 2017, episodes: 10, episodeMinutes: 48 },
        { name: 'S2', year: 2018, episodes: 13, episodeMinutes: 48 },
        { name: 'S3', year: 2019, episodes: 10, episodeMinutes: 48 },
    ]),

    series('cloak', 'Плащ и Кинжал', 2018, [
        { name: 'S1', year: 2018, episodes: 10, episodeMinutes: 45 },
        { name: 'S2', year: 2019, episodes: 10, episodeMinutes: 45 },
    ]),

    series('helstrom', 'Хелстром', 2020, [{ name: 'S1', year: 2020, episodes: 10, episodeMinutes: 50 }]),
    
    series('groot', 'Я есть Грут', 2022, [
        { name: 'S1', year: 2022, episodes: 5, episodeMinutes: 4 },
        { name: 'S2', year: 2023, episodes: 5, episodeMinutes: 4 }
    ]),
    
    /* ============ ФИЛЬМЫ ПО ФАЗАМ ============ */
    // Фаза 1
    movie('im1', 'Железный человек', 2008, 2.1, { phase: 'Фаза 1' }),
    movie('hulk', 'Невероятный Халк', 2008, 1.9, { phase: 'Фаза 1' }),
    movie('im2', 'Железный человек 2', 2010, 2.1, { phase: 'Фаза 1' }),
    movie('th1', 'Тор', 2011, 1.9, { phase: 'Фаза 1' }),
    movie('ca1', 'Первый мститель', 2011, 2.1, { phase: 'Фаза 1' }),
    movie('av1', 'Мстители', 2012, 2.4, { phase: 'Фаза 1' }),

    // Фаза 2
    movie('im3', 'Железный человек 3', 2013, 2.2, { phase: 'Фаза 2' }),
    movie('th2', 'Тор 2: Царство тьмы', 2013, 1.9, { phase: 'Фаза 2' }),
    movie('ca2', 'Первый мститель: Другая война', 2014, 2.3, { phase: 'Фаза 2' }),
    movie('gotg1', 'Стражи Галактики', 2014, 2.0, { phase: 'Фаза 2' }),
    movie('aou', 'Мстители: Эра Альтрона', 2015, 2.4, { phase: 'Фаза 2' }),
    movie('am1', 'Человек-муравей', 2015, 1.9, { phase: 'Фаза 2' }),

    // Фаза 3
    movie('cw', 'Первый мститель: Противостояние', 2016, 2.5, { phase: 'Фаза 3' }),
    movie('ds1', 'Доктор Стрэндж', 2016, 1.9, { phase: 'Фаза 3' }),
    movie('gotg2', 'Стражи Галактики 2', 2017, 2.2, { phase: 'Фаза 3' }),
    movie('sm1', 'Человек-паук: Возвращение домой', 2017, 2.2, { phase: 'Фаза 3' }),
    movie('th3', 'Тор: Рагнарёк', 2017, 2.2, { phase: 'Фаза 3' }),
    movie('bp1', 'Чёрная пантера', 2018, 2.2, { phase: 'Фаза 3' }),
    movie('iw', 'Мстители: Война бесконечности', 2018, 2.5, { phase: 'Фаза 3' }),
    movie('am2', 'Человек-муравей и Оса', 2018, 1.9, { phase: 'Фаза 3' }),
    movie('cm1', 'Капитан Марвел', 2019, 2.1, { phase: 'Фаза 3' }),
    movie('endg', 'Мстители: Финал', 2019, 3.0, { phase: 'Фаза 3' }),
    movie('sm2', 'Человек-паук: Вдали от дома', 2019, 2.1, { phase: 'Фаза 3' }),

    // Фаза 4
    movie('bw', 'Чёрная вдова', 2021, 2.2, { phase: 'Фаза 4' }),
    movie('shang', 'Шан-Чи и легенда десяти колец', 2021, 2.2, { phase: 'Фаза 4' }),
    movie('etern', 'Вечные', 2021, 2.6, { phase: 'Фаза 4' }),
    movie('sm3', 'Человек-паук: Нет пути домой', 2021, 2.5, { phase: 'Фаза 4' }),
    movie('ds2', 'Доктор Стрэндж: В мультивселенной безумия', 2022, 2.1, { phase: 'Фаза 4' }),
    movie('th4', 'Тор: Любовь и Гром', 2022, 2.0, { phase: 'Фаза 4' }),
    movie('bp2', 'Чёрная Пантера: Ваканда навеки', 2022, 2.7, { phase: 'Фаза 4' }),

    // Фаза 5
    movie('am3', 'Человек-муравей и Оса: Квантомания', 2023, 2.1, { phase: 'Фаза 5' }),
    movie('gotg3', 'Стражи Галактики 3', 2023, 2.5, { phase: 'Фаза 5' }),
    movie('cm2', 'Капитан Марвел 2 (Марвелы)', 2023, 1.8, { phase: 'Фаза 5' }),
    movie('dpool', 'Дэдпул и Росомаха', 2024, 2.1, { phase: 'Фаза 5' }),
    movie('cap4', 'Капитан Америка: Новый мир', 2025, 2.0, { phase: 'Фаза 5' }),
    movie('thndrb', 'Громовержцы', 2025, 2.1, { phase: 'Фаза 5' }),

    // Фаза 6
    movie('ff4', 'Фантастическая четвёрка: Первые шаги', 2025, 2.2, { phase: 'Фаза 6' }),
    movie('sm4', 'Человек-паук: Новый день', 2026, 2.2, { phase: 'Фаза 6' }),

    /* ============ ФИЛЬМЫ ВНЕ ФАЗ ============ */
    // Земля 96283 (Рэйми)
    movie('sm-2002', 'Человек-паук', 2002, 2.1, { earth: 'Земля 96283' }),
    movie('sm-2004', 'Человек-паук 2', 2004, 2.1, { earth: 'Земля 96283' }),
    movie('sm-2007', 'Человек-паук 3', 2007, 2.2, { earth: 'Земля 96283' }),

    // Земля 10005 (Люди Икс / Фокс)
    movie('xm1', 'Люди Икс', 2000, 1.8, { earth: 'Земля 10005' }),
    movie('xm2', 'Люди Икс 2', 2003, 2.0, { earth: 'Земля 10005' }),
    movie('xm3', 'Люди Икс: Последняя битва', 2006, 1.9, { earth: 'Земля 10005' }),
    movie('wolv1', 'Люди Икс: Начало. Росомаха', 2009, 1.9, { earth: 'Земля 10005' }),
    movie('xmfc', 'Люди Икс: Первый класс', 2011, 2.2, { earth: 'Земля 10005' }),
    movie('wolv2', 'Росомаха: Бессмертный', 2013, 2.1, { earth: 'Земля 10005' }),
    movie('xm-dofp', 'Люди Икс: Дни минувшего будущего', 2014, 2.2, { earth: 'Земля 10005' }),
    movie('dpool1', 'Дэдпул', 2016, 1.8, { earth: 'Земля 10005' }),
    movie('xm-apoc', 'Люди Икс: Апокалипсис', 2016, 2.4, { earth: 'Земля 10005' }),
    movie('logan', 'Логан', 2017, 2.2, { earth: 'Земля 10005' }),
    movie('dpool2', 'Дэдпул 2', 2018, 2.0, { earth: 'Земля 10005' }),
    movie('xm-dark', 'Люди Икс: Тёмный Феникс', 2019, 1.9, { earth: 'Земля 10005' }),
    movie('newmut', 'Новые мутанты', 2020, 1.6, { earth: 'Земля 10005' }),

    // Земля 828 (Фантастическая четвёрка)
    movie('ff-2005', 'Фантастическая четвёрка', 2005, 1.8, { earth: 'Земля 828' }),
    movie('ff2-2007', 'Фантастическая четвёрка 2', 2007, 1.6, { earth: 'Земля 828' }),
    movie('ff-2015', 'Фантастическая четвёрка', 2015, 1.7, { earth: 'Земля 828' }),
    movie('ff-2017', 'Фантастическая четвёрка 2', 2017, 1.8, { earth: 'Земля 828' }),

    // Земля 121347 (Николас Кейдж)
    movie('gr1', 'Призрачный гонщик', 2007, 1.9, { earth: 'Земля 121347' }),
    movie('gr2', 'Призрачный гонщик 2', 2012, 1.7, { earth: 'Земля 121347' }),

    // Земля 120703 (Удивительный Человек-паук)
    movie('tas1', 'Новый Человек-паук', 2012, 2.2, { earth: 'Земля 120703' }),
    movie('tas2', 'Новый Человек-паук 2', 2014, 2.3, { earth: 'Земля 120703' }),

    // Земля 688 (Sony / SSU)
    movie('venom1', 'Веном', 2018, 1.9, { earth: 'Земля 688' }),
    movie('venom2', 'Веном 2', 2021, 1.9, { earth: 'Земля 688' }),
    movie('morbius', 'Морбиус', 2022, 1.8, { earth: 'Земля 688' }),
    // movie('madame', 'Мадам Паутина', 2024, 1.8, { earth: 'Земля 688' }),
    movie('venom3', 'Веном: Последний танец', 2024, 1.8, { earth: 'Земля 688' }),
    movie('kraven', 'Крэйвен-охотник', 2024, 2.0, { earth: 'Земля 688' }),

    // Земля 555326 (Каратель)
    movie('pun-2004', 'Каратель', 2004, 2.0, { earth: 'Земля 555326' }),
    movie('pun-2008', 'Каратель: Зона войны', 2008, 1.7, { earth: 'Земля 555326' }),
    movie('pun-2026', 'Каратель: Последнее убийство', 2026, 0.8, { earth: 'Земля 555326' }),

    // Земля 746176 (Блэйд)
    movie('blade1', 'Блэйд', 1998, 2.0, { earth: 'Земля 746176' }),
    movie('blade2', 'Блэйд 2', 2002, 1.9, { earth: 'Земля 746176' }),
    movie('blade3', 'Блэйд: Троица', 2004, 1.9, { earth: 'Земля 746176' }),

    // Прочее
    movie('werewolf', 'Ночной оборотень', 2022, 0.9),
]

/* ---------- Наборы «подготовка к …» ---------- */
export const PREP_SETS = {
  doomsday: {
    label: 'Мстители: Судный день',
    movieIds: [
      'xm1', 'xm2', 'ca1', 'av1',
      'iw', 'endg', 'loki',
      'shang', 'sm3', 'ds2', 'bp2',
      'dpool', 'cap4', 'thndrb', 'ff4',
    ],
    // если хочешь в счёт «часов» добавить сериал — перечисли его тут
    includeInHours: ['loki'],
  },
  secretWars: {
    label: 'Мстители: Секретные войны',
    movieIds: ['av5', 'sm3', 'sm4', 'ff4', 'dpool', 'thndrb', 'cap4', 'ds2', 'bp2'],
    includeInHours: [],
  },
}

export const ACTIVE_PREP = 'doomsday'

const active = PREP_SETS[ACTIVE_PREP]
for (const item of items) {
  item.isPrep = active.movieIds.includes(item.id) || active.includeInHours.includes(item.id)
}