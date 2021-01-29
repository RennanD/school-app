import {
  seriesBanner,
  classesBanner,
  subjectsBanner,
  studentsBanner,
} from '../../assets';

export const cards = [
  {
    title: 'Disciplinas',
    description: 'Liste ou crie disciplinas por este card.',
    list: '/subjects/list',
    create: '/subjects/create',
    banner: subjectsBanner,
  },
  {
    title: 'Séries',
    description: 'Liste ou crie séries de forma fácil por este card.',
    list: '/series/list',
    create: '/series/create',
    banner: seriesBanner,
  },
  {
    title: 'Turmas',
    description: 'Liste ou crie turmas de forma fácil por este card.',
    list: '/classes/list',
    create: '/classes/create',
    banner: classesBanner,
  },
  {
    title: 'Alunos',
    description: 'Liste ou matricule alunos por este card.',
    list: '/subjects/list',
    create: '/subjects/create',
    banner: studentsBanner,
  },
];
