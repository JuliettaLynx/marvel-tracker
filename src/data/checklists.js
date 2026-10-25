/**
 * Чек-листы по персонажам: порядок просмотра тайтлов, где персонаж засвечен.
 * Только для отображения — отметки берутся из основного прогресса, здесь ничего нельзя отметить.
 *
 * entry: { id, season?, note? }
 *   id     — item.id из marvelData.js
 *   season — имя сезона сериала (пункт = конкретный сезон)
 *   note   — пометка (например, «после титров»)
 */
export const CHECKLISTS = [
    {
        id: 'fury',
        name: 'Nick Fury',
        color: '#4f9cf9',
        entries: [
            { id: 'cm1' },
            { id: 'im1', note: 'после титров' },
            { id: 'im2' },
            { id: 'th1', note: 'после титров' },
            { id: 'ca1' },
            { id: 'av1' },
            { id: 'ca2' },
            { id: 'aou' },
            { id: 'iw', note: 'после титров' },
            { id: 'endg' },
            { id: 'sm2' },
            { id: 'si' },
            { id: 'cm2' },
        ],
    },
    {
        id: 'hill',
        name: 'Maria Hill',
        color: '#4f9cf9',
        entries: [
            { id: 'av1' },
            { id: 'ca2' },
            { id: 'aou' },
            { id: 'iw', note: 'после титров' },
            { id: 'endg' },
            { id: 'sm2', note: 'после титров' },
            { id: 'si' },
        ],
    },
    {
        id: 'coulson',
        name: 'Agent Phil Coulson',
        color: '#4f9cf9',
        entries: [
            { id: 'cm1' },
            { id: 'im1' },
            { id: 'im2' },
            { id: 'th1' },
            { id: 'av1' },
        ],
    },
    {
        id: 'ross',
        name: 'Thaddeus "Thunderbolt" Ross',
        color: '#4f9cf9',
        entries: [
            { id: 'hulk' },
            { id: 'cw' },
            { id: 'bw' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'cap4' },
        ],
    },
    {
        id: 'clint',
        name: 'Clint Barton (Hawkeye)',
        color: '#4f9cf9',
        entries: [
            { id: 'th1' },
            { id: 'av1' },
            { id: 'aou' },
            { id: 'cw' },
            { id: 'endg' },
            { id: 'hawk' },
        ],
    },
    {
        id: 'natasha',
        name: 'Natasha Romanoff (Black Widow)',
        color: '#4f9cf9',
        entries: [
            { id: 'im2' },
            { id: 'av1' },
            { id: 'ca2' },
            { id: 'cw' },
            { id: 'aou' },
            { id: 'bw' },
            { id: 'iw' },
            { id: 'endg' },
        ],
    },
    {
        id: 'yelena',
        name: 'Yelena Belova',
        color: '#4f9cf9',
        entries: [
            { id: 'bw' },
            { id: 'hawk' },
            { id: 'thndrb' },
        ],
    },

    /* ---------- Кольцо Стэрка ---------- */
    {
        id: 'tony',
        name: 'Tony Stark (Iron Man)',
        color: '#f5a623',
        entries: [
            { id: 'im1' },
            { id: 'im2' },
            { id: 'os-consultant' },
            { id: 'av1' },
            { id: 'im3' },
            { id: 'aou' },
            { id: 'cw' },
            { id: 'sm1' },
            { id: 'iw' },
            { id: 'endg' },
        ],
    },
    {
        id: 'rhodey',
        name: 'Colonel James "Rhodey" Rhodes (War Machine)',
        color: '#f5a623',
        entries: [
            { id: 'im1' },
            { id: 'im2' },
            { id: 'im3' },
            { id: 'aou' },
            { id: 'cw' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'tfatws' },
            { id: 'si' },
        ],
    },
    {
        id: 'pepper',
        name: 'Pepper Potts',
        color: '#f5a623',
        entries: [
            { id: 'im1' },
            { id: 'im2' },
            { id: 'av1' },
            { id: 'im3' },
            { id: 'sm1' },
            { id: 'iw' },
            { id: 'endg' },
        ],
    },
    {
        id: 'happy',
        name: 'Happy Hogan',
        color: '#f5a623',
        entries: [
            { id: 'im1' },
            { id: 'im2' },
            { id: 'im3' },
            { id: 'sm1' },
            { id: 'endg' },
            { id: 'sm2' },
            { id: 'sm3' },
        ],
    },
    {
        id: 'peter',
        name: 'Peter Parker (Spider-Man)',
        color: '#f5a623',
        entries: [
            { id: 'cw' },
            { id: 'sm1' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'sm2' },
            { id: 'sm3' },
        ],
    },
    {
        id: 'slattery',
        name: 'Trevor Slattery (The Mandarin)',
        color: '#f5a623',
        entries: [
            { id: 'im3' },
            { id: 'os-all-hail' },
            { id: 'shang' },
            { id: 'wonderman' },
        ],
    },

    /* ---------- Бэннер ---------- */
    {
        id: 'bruce',
        name: 'Bruce Banner (The Hulk)',
        color: '#8bc34a',
        entries: [
            { id: 'hulk' },
            { id: 'av1' },
            { id: 'im3', note: 'среди титров' },
            { id: 'aou' },
            { id: 'th3' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'shang', note: 'среди титров' },
            { id: 'sheh' },
            { id: 'sm4' },
        ],
    },

    /* ---------- Асгард ---------- */
    {
        id: 'thor',
        name: 'Thor Odinson',
        color: '#7bc4ff',
        entries: [
            { id: 'th1' },
            { id: 'av1' },
            { id: 'th2' },
            { id: 'aou' },
            { id: 'th3' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'th4' },
        ],
    },
    {
        id: 'loki-char',
        name: 'Loki Odinson',
        color: '#7bc4ff',
        entries: [
            { id: 'th1' },
            { id: 'av1' },
            { id: 'th2' },
            { id: 'th3' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'loki', season: 'S1' },
            { id: 'loki', season: 'S2' },
        ],
    },
    {
        id: 'valkyrie',
        name: 'Valkyrie',
        color: '#7bc4ff',
        entries: [
            { id: 'th3' },
            { id: 'endg' },
            { id: 'th4' },
            { id: 'cm2' },
        ],
    },
    {
        id: 'jane',
        name: 'Jane Foster',
        color: '#7bc4ff',
        entries: [
            { id: 'th1' },
            { id: 'th2' },
            { id: 'th4' },
        ],
    },
    {
        id: 'darcy',
        name: 'Darcy Lewis',
        color: '#7bc4ff',
        entries: [
            { id: 'th1' },
            { id: 'th2' },
            { id: 'wv' },
            { id: 'th4' },
        ],
    },
    {
        id: 'selvig',
        name: 'Erik Selvig',
        color: '#7bc4ff',
        entries: [
            { id: 'th1' },
            { id: 'av1' },
            { id: 'th2' },
            { id: 'aou' },
            { id: 'th4' },
        ],
    },

    /* ---------- Квантка ---------- */
    {
        id: 'scott',
        name: 'Scott Lang (Ant-Man)',
        color: '#ff8fa3',
        entries: [
            { id: 'am1' },
            { id: 'cw' },
            { id: 'am2' },
            { id: 'endg' },
            { id: 'am3' },
        ],
    },
    {
        id: 'hope',
        name: 'Hope Van Dyne (The Wasp)',
        color: '#ff8fa3',
        entries: [
            { id: 'am1' },
            { id: 'am2' },
            { id: 'endg' },
            { id: 'am3' },
        ],
    },

    /* ---------- Капитан и его команда ---------- */
    {
        id: 'steve',
        name: 'Steve Rogers (Captain America)',
        color: '#c39bff',
        entries: [
            { id: 'ca1' },
            { id: 'av1' },
            { id: 'ca2' },
            { id: 'aou' },
            { id: 'cw' },
            { id: 'iw' },
            { id: 'endg' },
        ],
    },
    {
        id: 'carter',
        name: 'Agent Peggy Carter',
        color: '#c39bff',
        entries: [
            { id: 'ca1' },
            { id: 'os-agent-carter' },
            { id: 'carter', season: 'S1' },
            { id: 'carter', season: 'S2' },
            { id: 'ca2' },
            { id: 'cw' },
            { id: 'endg' },
        ],
    },
    {
        id: 'bucky',
        name: "James 'Bucky' Barnes",
        color: '#c39bff',
        entries: [
            { id: 'ca1' },
            { id: 'ca2' },
            { id: 'cw' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'tfatws' },
            { id: 'cap4' },
            { id: 'thndrb' },
        ],
    },
    {
        id: 'sam',
        name: 'Sam Wilson (The Falcon / Captain America)',
        color: '#c39bff',
        entries: [
            { id: 'ca2' },
            { id: 'aou' },
            { id: 'am1' },
            { id: 'cw' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'tfatws' },
            { id: 'cap4' },
        ],
    },

    /* ---------- Мистика ---------- */
    {
        id: 'strange',
        name: 'Dr Stephen Strange',
        color: '#4dd0e1',
        entries: [
            { id: 'ds1' },
            { id: 'th3' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'sm3' },
            { id: 'ds2' },
        ],
    },
    {
        id: 'wong',
        name: 'Wong',
        color: '#4dd0e1',
        entries: [
            { id: 'ds1' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'shang' },
            { id: 'sm3' },
            { id: 'ds2' },
            { id: 'sheh' },
        ],
    },

    /* ---------- Скарлет уитч ---------- */
    {
        id: 'wanda',
        name: 'Wanda Maximoff (Scarlet Witch)',
        color: '#e62429',
        entries: [
            { id: 'ca2', note: 'среди титров' },
            { id: 'aou' },
            { id: 'cw' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'wv' },
            { id: 'ds2' },
        ],
    },
    {
        id: 'vision',
        name: 'Vision',
        color: '#e62429',
        entries: [
            { id: 'aou' },
            { id: 'cw' },
            { id: 'iw' },
            { id: 'wv' },
        ],
    },
    {
        id: 'agatha',
        name: 'Agatha Harkness',
        color: '#e62429',
        entries: [
            { id: 'wv' },
            { id: 'agatha' },
        ],
    },

    /* ---------- Стражи ---------- */
    {
        id: 'gotg',
        name: 'Guardians of the Galaxy',
        color: '#f06292',
        entries: [
            { id: 'gotg1' },
            { id: 'groot', season: 'S1' },
            { id: 'gotg2' },
            { id: 'groot', season: 'S2' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'th4' },
            { id: 'gotg-holiday' },
            { id: 'gotg3' },
        ],
    },

    /* ---------- Ваканда ---------- */
    {
        id: 'tchalla',
        name: "King T'Challa (Black Panther)",
        color: '#b388ff',
        entries: [
            { id: 'cw' },
            { id: 'bp1' },
            { id: 'iw' },
            { id: 'endg' },
        ],
    },
    {
        id: 'shuri',
        name: 'Princess Shuri (Black Panther)',
        color: '#b388ff',
        entries: [
            { id: 'bp1' },
            { id: 'iw' },
            { id: 'endg' },
            { id: 'bp2' },
        ],
    },
];
