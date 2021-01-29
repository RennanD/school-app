import React from 'react';

import {
  DeckOutlined,
  SchoolOutlined,
  ClassOutlined,
  SubjectOutlined,
} from '@material-ui/icons';

const links = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <DeckOutlined />,
  },
  {
    title: 'Disciplinas',
    path: '/subjects/list',
    icon: <SubjectOutlined />,
  },
  {
    title: 'Séries',
    path: '/series/list',
    icon: <SchoolOutlined />,
  },
  {
    title: 'Turmas',
    path: '/classes/list',
    icon: <ClassOutlined />,
  },
];

export default links;
