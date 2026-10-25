/* ---------- Хелперы ---------- */
const movie = (id, title, year, hours, opts = {}) => ({
    id, title, year, type: 'movie', hours,
    phase: null, earth: null, ...opts,
})

const series = (id, title, year, seasons, opts = {}) => {
    const preparedSeasons = seasons.map(s => {
        const episodeMinutes = s.episodeMinutes ?? null
        const hours = episodeMinutes != null
            ? +((s.episodes * episodeMinutes) / 60).toFixed(2)
            : null
        return { ...s, episodeMinutes, hours }
    })

    const episodes = preparedSeasons.reduce((a, s) => a + s.episodes, 0)
    const hours = preparedSeasons.every(s => s.hours != null)
        ? +preparedSeasons.reduce((a, s) => a + s.hours, 0).toFixed(2)
        : null

    return {
        id, title, year, type: 'series',
        seasons: preparedSeasons,
        episodes, hours,
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
    'Фаза 5', 'Фаза 6', 'Фаза 7',
    'Фильмы вне фаз', 'Сериалы вне фаз',
]

export const MAIN_PHASES = [
    'Фаза 1', 'Фаза 2', 'Фаза 3', 'Фаза 4', 'Фаза 5', 'Фаза 6', 'Фаза 7',
]

export function groupOf(item) {
    if (item.type === 'series') return 'Сериалы'
    if (item.phase) return item.phase
    return 'Фильмы вне фаз'
}

/* ---------- Данные ---------- */
export const items = [
    /* ============ СЕРИАЛЫ ============ */

    /* --- Netflix Defenders Saga --- */
    series('dd', 'Сорвиголова', 2015, [
        { name: 'S1', year: 2015, episodes: 13, episodeMinutes: 54.85, phase: 'Фаза 2' },
        { name: 'S2', year: 2016, episodes: 13, episodeMinutes: 53.69, phase: 'Фаза 3' },
        { name: 'S3', year: 2018, episodes: 13, episodeMinutes: 50.08, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('jj', 'Джессика Джонс', 2015, [
        { name: 'S1', year: 2015, episodes: 13, episodeMinutes: 52.46, phase: 'Фаза 2' },
        { name: 'S2', year: 2018, episodes: 13, episodeMinutes: 51.15, phase: 'Фаза 3' },
        { name: 'S3', year: 2019, episodes: 13, episodeMinutes: 49.69, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('lc', 'Люк Кейдж', 2016, [
        { name: 'S1', year: 2016, episodes: 13, episodeMinutes: 53.15, phase: 'Фаза 3' },
        { name: 'S2', year: 2018, episodes: 13, episodeMinutes: 56.92, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('if', 'Железный кулак', 2017, [
        { name: 'S1', year: 2017, episodes: 13, episodeMinutes: 54.85, phase: 'Фаза 3' },
        { name: 'S2', year: 2018, episodes: 10, episodeMinutes: 51.60, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('def', 'Защитники', 2017, [
        { name: 'S1', year: 2017, episodes: 8, episodeMinutes: 49.13, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('pun', 'Каратель', 2017, [
        { name: 'S1', year: 2017, episodes: 13, episodeMinutes: 52.77, phase: 'Фаза 3' },
        { name: 'S2', year: 2019, episodes: 13, episodeMinutes: 51.69, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    /* --- ABC / Marvel Television --- */
    series('aos', 'Агенты Щ.И.Т.', 2013, [
        { name: 'S1', year: 2013, episodes: 22, episodeMinutes: 43, phase: 'Фаза 2' },
        { name: 'S2', year: 2014, episodes: 22, episodeMinutes: 43, phase: 'Фаза 2' },
        { name: 'S3', year: 2015, episodes: 22, episodeMinutes: 43, phase: 'Фаза 3' },
        { name: 'S4', year: 2016, episodes: 22, episodeMinutes: 43, phase: 'Фаза 3' },
        { name: 'S5', year: 2017, episodes: 22, episodeMinutes: 43, phase: 'Фаза 3' },
        { name: 'S6', year: 2019, episodes: 13, episodeMinutes: 43, phase: 'Фаза 3' },
        { name: 'S7', year: 2020, episodes: 13, episodeMinutes: 43, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('carter', 'Агент Картер', 2015, [
        { name: 'S1', year: 2015, episodes: 8, episodeMinutes: 42.63, phase: 'Фаза 2' },
        { name: 'S2', year: 2016, episodes: 10, episodeMinutes: 44.50, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    /* --- Hulu / Freeform / FX --- */
    series('runaways', 'Беглецы', 2017, [
        { name: 'S1', year: 2017, episodes: 10, episodeMinutes: 48, phase: 'Фаза 3' },
        { name: 'S2', year: 2018, episodes: 13, episodeMinutes: 48, phase: 'Фаза 3' },
        { name: 'S3', year: 2019, episodes: 10, episodeMinutes: 48, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('cloak', 'Плащ и Кинжал', 2018, [
        { name: 'S1', year: 2018, episodes: 10, episodeMinutes: 45, phase: 'Фаза 3' },
        { name: 'S2', year: 2019, episodes: 10, episodeMinutes: 45, phase: 'Фаза 3' },
    ], { earth: 'Земля 616' }),

    series('helstrom', 'Хелстром', 2020, [
        { name: 'S1', year: 2020, episodes: 10, episodeMinutes: 50, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('legion', 'Легион', 2017, [
        { name: 'S1', year: 2017, episodes: 8, episodeMinutes: 55, phase: 'Фаза 3' },
        { name: 'S2', year: 2018, episodes: 11, episodeMinutes: 55, phase: 'Фаза 3' },
        { name: 'S3', year: 2019, episodes: 8, episodeMinutes: 55, phase: 'Фаза 3' },
    ], { earth: 'Земля 10005' }),

    /* --- Disney+ MCU --- */
    series('wv', 'ВандаВижн', 2021, [
        { name: 'S1', year: 2021, episodes: 9, episodeMinutes: 39.11, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('tfatws', 'Сокол и Зимний солдат', 2021, [
        { name: 'S1', year: 2021, episodes: 6, episodeMinutes: 54.00, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('loki', 'Локи', 2021, [
        { name: 'S1', year: 2021, episodes: 6, episodeMinutes: 49.50, phase: 'Фаза 4' },
        { name: 'S2', year: 2023, episodes: 6, episodeMinutes: 51.17, phase: 'Фаза 5' },
    ], { earth: 'TVA' }),

    series('hawk', 'Соколиный глаз', 2021, [
        { name: 'S1', year: 2021, episodes: 6, episodeMinutes: 48.50, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('mk', 'Лунный рыцарь', 2022, [
        { name: 'S1', year: 2022, episodes: 6, episodeMinutes: 49.50, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('msm', 'Мисс Марвел', 2022, [
        { name: 'S1', year: 2022, episodes: 6, episodeMinutes: 47.17, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('sheh', 'Женщина-Халк', 2022, [
        { name: 'S1', year: 2022, episodes: 9, episodeMinutes: 33.33, phase: 'Фаза 4' },
    ], { earth: 'Земля 616' }),

    series('si', 'Секретное вторжение', 2023, [
        { name: 'S1', year: 2023, episodes: 6, episodeMinutes: 44.33, phase: 'Фаза 5' },
    ], { earth: 'Земля 616' }),

    series('agatha', 'Это всё Агата', 2024, [
        { name: 'S1', year: 2024, episodes: 9, episodeMinutes: 41.11, phase: 'Фаза 5' },
    ], { earth: 'Земля 616' }),

    series('echo', 'Эхо', 2024, [
        { name: 'S1', year: 2024, episodes: 5, episodeMinutes: 42.00, phase: 'Фаза 5' },
    ], { earth: 'Земля 616' }),

    series('whatif', 'Что если..?', 2021, [
        { name: 'S1', year: 2021, episodes: 9, episodeMinutes: 34.78, phase: 'Фаза 4' },
        { name: 'S2', year: 2023, episodes: 9, episodeMinutes: 31.44, phase: 'Фаза 5' },
        { name: 'S3', year: 2024, episodes: 8, episodeMinutes: 30.50, phase: 'Фаза 5' },
    ], { earth: 'Мультивселенная' }),

    series('ddba', 'Сорвиголова: Рождённый заново', 2025, [
        { name: 'S1', year: 2025, episodes: 9, episodeMinutes: 49.56, phase: 'Фаза 5' },
        { name: 'S2', year: 2026, episodes: 8, episodeMinutes: 50.75, phase: 'Фаза 6' },
    ], { earth: 'Земля 616' }),

    series('ihrt', 'Железное сердце', 2025, [
        { name: 'S1', year: 2025, episodes: 6, episodeMinutes: 48, phase: 'Фаза 5' },
    ], { earth: 'Земля 616' }),

    series('wonderman', 'Чудо-человек', 2026, [
        { name: 'S1', year: 2026, episodes: 8, episodeMinutes: 30, phase: 'Фаза 6' },
    ], { earth: 'Земля 616' }),

    series('vision', 'Вижн: Квест', 2026, [
        { name: 'S1', year: 2026, episodes: 8, episodeMinutes: 50, phase: 'Фаза 6' },
    ], { earth: 'Земля 616' }),

    series('groot', 'Я есть Грут', 2022, [
        { name: 'S1', year: 2022, episodes: 5, episodeMinutes: 6.00, phase: 'Фаза 4' },
        { name: 'S2', year: 2023, episodes: 5, episodeMinutes: 5.00, phase: 'Фаза 5' },
    ], { earth: 'Земля 616' }),

    /* --- Анимация / мультивселенная --- */
    series('xmen97', "Люди Икс '97", 2024, [
        { name: 'S1', year: 2024, episodes: 10, episodeMinutes: 34.40, phase: 'Фаза 5' },
        { name: 'S2', year: 2026, episodes: 9, episodeMinutes: 34.40, phase: 'Фаза 6' },
    ], { earth: 'Земля 92131' }),

    series('spidey-friend', 'Ваш дружелюбный сосед Человек-паук', 2025, [
        { name: 'S1', year: 2025, episodes: 10, episodeMinutes: 30.80, phase: 'Фаза 5' },
    ], { earth: 'Земля 616' }),

    series('eyes-wakanda', 'Глаза Ваканды', 2025, [
        { name: 'S1', year: 2025, episodes: 4, episodeMinutes: 40, phase: 'Фаза 6' },
    ], { earth: 'Земля 616' }),

    series('marvel-zombies', 'Marvel Зомби', 2025, [
        { name: 'S1', year: 2025, episodes: 4, episodeMinutes: 30, phase: 'Фаза 6' },
    ], { earth: 'Мультивселенная' }),

    series('spider-noir', 'Человек-паук: Нуар', 2026, [
        { name: 'S1', year: 2026, episodes: 8, episodeMinutes: 45 },
    ], { earth: 'Sony-Verse' }),

    /* ============ ФИЛЬМЫ ПО ФАЗАМ ============ */

    /* --- Фаза 1 --- */
    movie('im1', 'Железный человек', 2008, 2.12, { phase: 'Фаза 1', earth: 'Земля 616' }),
    movie('hulk', 'Невероятный Халк', 2008, 1.87, { phase: 'Фаза 1', earth: 'Земля 616' }),
    movie('im2', 'Железный человек 2', 2010, 2.08, { phase: 'Фаза 1', earth: 'Земля 616' }),
    movie('th1', 'Тор', 2011, 1.95, { phase: 'Фаза 1', earth: 'Земля 616' }),
    movie('ca1', 'Первый мститель', 2011, 2.10, { phase: 'Фаза 1', earth: 'Земля 616' }),
    movie('av1', 'Мстители', 2012, 2.42, { phase: 'Фаза 1', earth: 'Земля 616' }),

    /* --- Фаза 2 --- */
    movie('im3', 'Железный человек 3', 2013, 2.20, { phase: 'Фаза 2', earth: 'Земля 616' }),
    movie('th2', 'Тор 2: Царство тьмы', 2013, 1.92, { phase: 'Фаза 2', earth: 'Земля 616' }),
    movie('ca2', 'Первый мститель: Другая война', 2014, 2.30, { phase: 'Фаза 2', earth: 'Земля 616' }),
    movie('gotg1', 'Стражи Галактики', 2014, 2.03, { phase: 'Фаза 2', earth: 'Земля 616' }),
    movie('aou', 'Мстители: Эра Альтрона', 2015, 2.40, { phase: 'Фаза 2', earth: 'Земля 616' }),
    movie('am1', 'Человек-муравей', 2015, 2.00, { phase: 'Фаза 2', earth: 'Земля 616' }),

    /* --- Фаза 3 --- */
    movie('cw', 'Первый мститель: Противостояние', 2016, 2.52, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('ds1', 'Доктор Стрэндж', 2016, 1.93, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('gotg2', 'Стражи Галактики 2', 2017, 2.28, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('sm1', 'Человек-паук: Возвращение домой', 2017, 2.22, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('th3', 'Тор: Рагнарёк', 2017, 2.20, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('bp1', 'Чёрная пантера', 2018, 2.30, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('iw', 'Мстители: Война бесконечности', 2018, 2.57, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('am2', 'Человек-муравей и Оса', 2018, 2.03, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('cm1', 'Капитан Марвел', 2019, 2.12, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('endg', 'Мстители: Финал', 2019, 3.08, { phase: 'Фаза 3', earth: 'Земля 616' }),
    movie('sm2', 'Человек-паук: Вдали от дома', 2019, 2.15, { phase: 'Фаза 3', earth: 'Земля 616' }),

    /* --- Фаза 4 --- */
    movie('bw', 'Чёрная вдова', 2021, 2.25, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('shang', 'Шан-Чи и легенда десяти колец', 2021, 2.25, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('etern', 'Вечные', 2021, 2.63, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('sm3', 'Человек-паук: Нет пути домой', 2021, 2.47, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('ds2', 'Доктор Стрэндж: В мультивселенной безумия', 2022, 2.12, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('th4', 'Тор: Любовь и Гром', 2022, 2.08, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('bp2', 'Чёрная Пантера: Ваканда навеки', 2022, 2.68, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('werewolf', 'Ночной оборотень', 2022, 0.90, { phase: 'Фаза 4', earth: 'Земля 616' }),
    movie('gotg-holiday', 'Стражи Галактики: Праздничный спецвыпуск', 2022, 0.73, { phase: 'Фаза 4', earth: 'Земля 616' }),

    /* --- Фаза 5 --- */
    movie('am3', 'Человек-муравей и Оса: Квантомания', 2023, 2.07, { phase: 'Фаза 5', earth: 'Земля 616' }),
    movie('gotg3', 'Стражи Галактики 3', 2023, 2.48, { phase: 'Фаза 5', earth: 'Земля 616' }),
    movie('cm2', 'Капитан Марвел 2 (Марвелы)', 2023, 1.75, { phase: 'Фаза 5', earth: 'Земля 616' }),
    movie('dpool', 'Дэдпул и Росомаха', 2024, 2.13, { phase: 'Фаза 5', earth: 'Земля 616' }),
    movie('cap4', 'Капитан Америка: Новый мир', 2025, 1.97, { phase: 'Фаза 5', earth: 'Земля 616' }),
    movie('thndrb', 'Громовержцы', 2025, 2.10, { phase: 'Фаза 5', earth: 'Земля 616' }),

    /* --- Фаза 6 --- */
    movie('ff4', 'Фантастическая четвёрка: Первые шаги', 2025, 1.93, { phase: 'Фаза 6', earth: 'Земля 828' }),
    movie('sm4', 'Человек-паук: Новый день', 2026, 2.42, { phase: 'Фаза 6', earth: 'Земля 616' }),
    movie('av5', 'Мстители: Судный день', 2026, null, { phase: 'Фаза 6', earth: 'Земля 616' }),
    movie('av6', 'Мстители: Секретные войны', 2027, null, { phase: 'Фаза 6', earth: 'Земля 616' }),
    movie('pun-kill', 'Каратель: Последнее убийство', 2026, 0.83, { phase: 'Фаза 6', earth: 'Земля 616' }),

    /* --- Фаза 7 --- */
    movie('xmen-untitled', 'Безымянный фильм про Людей Икс', 2028, null, { phase: 'Фаза 7' }),
    movie('ghost-rider-2028', 'Призрачный гонщик', 2028, null, { phase: 'Фаза 7' }),
    movie('bp3', 'Чёрная Пантера 3', 2028, null, { phase: 'Фаза 7' }),

    /* ============ ФИЛЬМЫ ВНЕ ФАЗ ============ */

    /* --- Marvel Legacy --- */
    movie('blade1', 'Блэйд', 1998, 2.00, { earth: 'Земля 746176' }),
    movie('blade2', 'Блэйд 2', 2002, 1.95, { earth: 'Земля 746176' }),
    movie('daredevil-2003', 'Сорвиголова', 2003, 1.68),
    movie('blade3', 'Блэйд: Троица', 2004, 2.05, { earth: 'Земля 746176' }),
    movie('elektra', 'Электра', 2005, 1.62),
    movie('ff-2005', 'Фантастическая четвёрка', 2005, 1.75, { earth: 'Земля 828' }),
    movie('ff2-2007', 'Фантастическая четвёрка: Вторжение Серебряного Сёрфера', 2007, 1.53, { earth: 'Земля 828' }),
    movie('fant4stic', 'Фантастическая четвёрка (2015)', 2015, 1.68, { earth: 'Земля 828' }),
    movie('ff-2017', 'Фантастическая четвёрка 2 (2017)', 2017, 1.80, { earth: 'Земля 828' }),

    /* --- Каратель (Земля 555326) --- */
    movie('pun-2004', 'Каратель', 2004, 2.00, { earth: 'Земля 555326' }),
    movie('pun-2008', 'Каратель: Зона войны', 2008, 1.70, { earth: 'Земля 555326' }),

    /* --- Люди Икс (Земля 10005) --- */
    movie('xm1', 'Люди Икс', 2000, 1.75, { earth: 'Земля 10005' }),
    movie('xm2', 'Люди Икс 2', 2003, 2.23, { earth: 'Земля 10005' }),
    movie('xm3', 'Люди Икс: Последняя битва', 2006, 1.75, { earth: 'Земля 10005' }),
    movie('wolv1', 'Люди Икс: Начало. Росомаха', 2009, 1.80, { earth: 'Земля 10005' }),
    movie('xmfc', 'Люди Икс: Первый класс', 2011, 2.20, { earth: 'Земля 10005' }),
    movie('wolv2', 'Росомаха: Бессмертный', 2013, 2.12, { earth: 'Земля 10005' }),
    movie('xm-dofp', 'Люди Икс: Дни минувшего будущего', 2014, 2.20, { earth: 'Земля 10005' }),
    movie('dpool1', 'Дэдпул', 2016, 1.83, { earth: 'Земля 10005' }),
    movie('xm-apoc', 'Люди Икс: Апокалипсис', 2016, 2.42, { earth: 'Земля 10005' }),
    movie('logan', 'Логан', 2017, 2.32, { earth: 'Земля 10005' }),
    movie('dpool2', 'Дэдпул 2', 2018, 2.02, { earth: 'Земля 10005' }),
    movie('xm-dark', 'Люди Икс: Тёмный Феникс', 2019, 1.93, { earth: 'Земля 10005' }),
    movie('newmut', 'Новые мутанты', 2020, 1.57, { earth: 'Земля 10005' }),

    /* --- Призрачный гонщик (Земля 121347) --- */
    movie('gr1', 'Призрачный гонщик', 2007, 1.9, { earth: 'Земля 121347' }),
    movie('gr2', 'Призрачный гонщик 2', 2012, 1.7, { earth: 'Земля 121347' }),

    /* --- Человек-паук (Земля 96283, Рэйми) --- */
    movie('sm-2002', 'Человек-паук', 2002, 2.02, { earth: 'Земля 96283' }),
    movie('sm-2004', 'Человек-паук 2', 2004, 2.12, { earth: 'Земля 96283' }),
    movie('sm-2007', 'Человек-паук 3', 2007, 2.32, { earth: 'Земля 96283' }),

    /* --- Удивительный Человек-паук (Земля 120703) --- */
    movie('tas1', 'Новый Человек-паук', 2012, 2.27, { earth: 'Земля 120703' }),
    movie('tas2', 'Новый Человек-паук 2', 2014, 2.37, { earth: 'Земля 120703' }),

    /* --- Sony-Verse (Земля 688) --- */
    movie('venom1', 'Веном', 2018, 1.87, { earth: 'Земля 688' }),
    movie('venom2', 'Веном 2', 2021, 1.62, { earth: 'Земля 688' }),
    movie('morbius', 'Морбиус', 2022, 1.73, { earth: 'Земля 688' }),
    movie('venom3', 'Веном: Последний танец', 2024, 1.83, { earth: 'Земля 688' }),
    movie('madame', 'Мадам Паутина', 2024, 1.93, { earth: 'Земля 688' }),
    movie('kraven', 'Крэйвен-охотник', 2024, 2.33, { earth: 'Земля 688' }),

    /* --- Spider-Verse (Earth-1610) --- */
    movie('spiderverse1', 'Человек-паук: Через вселенные', 2018, 1.95, { earth: 'Earth-1610' }),
    movie('spiderverse2', 'Человек-паук: Паутина вселенных', 2023, 2.33, { earth: 'Earth-1610' }),
    movie('spiderverse3', 'Человек-паук: За пределами вселенных', 2027, null, { earth: 'Earth-1610' }),

    /* --- One-Shots (короткометражки) --- */
    movie('os-consultant', 'Консультант', 2011, 0.05, { earth: 'Земля 616' }),
    movie('os-funny-thing', 'Забавный случай по пути к молоту Тора', 2011, 0.05, { earth: 'Земля 616' }),
    movie('os-item47', 'Предмет 47', 2012, 0.18, { earth: 'Земля 616' }),
    movie('os-agent-carter', 'Агент Картер', 2013, 0.25, { earth: 'Земля 616' }),
    movie('os-all-hail', 'Да здравствует король', 2014, 0.22, { earth: 'Земля 616' }),
    movie('os-team-thor1', 'Команда Тора: Часть 1', 2016, 0.05, { earth: 'Земля 616' }),
    movie('os-team-thor2', 'Команда Тора: Часть 2', 2017, 0.07, { earth: 'Земля 616' }),
    movie('os-team-darryl', 'Команда Дэррила', 2018, 0.10, { earth: 'Земля 616' }),
]

/* ---------- Наборы «подготовка к …» ---------- */
export const PREP_SETS = {
    doomsday: {
        label: 'Мстители: Судный день',
        itemIds: [
            'xm1', 'xm2', 'ca1', 'av1',
            'iw', 'endg', 'loki',
            'shang', 'sm3', 'ds2', 'bp2',
            'dpool', 'cap4', 'thndrb', 'ff4',
        ],
    },
    doomsdayBasics: {
        label: 'Мстители: Судный день — Basic',
        itemIds: [
            'ca1', 'os-agent-carter', 'xmfc', 'wolv1', 'cm1', 'xm1',
            'sm-2002', 'xm2', 'madame', 'sm-2004', 'xm3', 'sm-2007',
            'im1', 'im2', 'th1', 'hulk', 'av1', 'tas1', 'th2', 'im3',
            'ca2', 'tas2', 'gotg1', 'gotg2', 'aou', 'am1', 'cw', 'bw',
            'bp1', 'sm1', 'ds1', 'th3', 'am2', 'iw', 'endg', 'loki',
            'xm-dofp', 'dpool1', 'dpool2', 'wv', 'shang', 'tfatws',
            'sm2', 'sm3', 'ds2', 'hawk', 'bp2', 'th4', 'gotg-holiday',
            'am3', 'gotg3', 'cm2', 'dpool', 'agatha', 'cap4', 'thndrb',
            'ff4', 'wonderman', 'sm4',
        ],
    },
    doomsdayExtended: {
        label: 'Мстители: Судный день — Extended',
        itemIds: [
            'ca1', 'os-agent-carter', 'carter', 'xmfc', 'wolv1', 'cm1',
            'xm1', 'sm-2002', 'xm2', 'madame', 'sm-2004', 'ff-2005',
            'xm3', 'ff2-2007', 'sm-2007', 'im1', 'im2', 'os-funny-thing',
            'th1', 'hulk', 'os-consultant', 'av1', 'os-item47', 'tas1',
            'wolv2', 'th2', 'im3', 'os-all-hail', 'ca2', 'tas2',
            'gotg1', 'gotg2', 'dd', 'jj', 'aou', 'am1', 'lc', 'if',
            'def', 'cw', 'bw', 'bp1', 'sm1', 'pun', 'ds1', 'th3',
            'am2', 'iw', 'endg', 'loki', 'xm-dofp', 'xm-apoc', 'xm-dark',
            'dpool1', 'dpool2', 'wv', 'shang', 'tfatws', 'sm2', 'sm3',
            'ds2', 'hawk', 'bp2', 'echo', 'sheh', 'msm', 'th4',
            'gotg-holiday', 'si', 'am3', 'gotg3', 'cm2', 'logan',
            'dpool', 'agatha', 'ddba', 'cap4', 'thndrb', 'ff4',
            'wonderman', 'sm4',
        ],
    },
    secretWars: {
        label: 'Мстители: Секретные войны',
        itemIds: ['av5', 'sm3', 'sm4', 'ff4', 'dpool', 'thndrb', 'cap4', 'ds2', 'bp2'],
    },
}

export const ACTIVE_PREP = 'doomsdayBasics'

/** Idshники набора подготовки по ключу. */
export const prepIds = key => PREP_SETS[key]?.itemIds || []