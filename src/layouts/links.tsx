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
    title: 'Séries',
    path: '/series/list',
    icon: <SchoolOutlined />,
  },
  {
    title: 'Turmas',
    path: '/classes/list',
    icon: <ClassOutlined />,
  },
  {
    title: 'Disciplinas',
    path: '/subjects/list',
    icon: <SubjectOutlined />,
  },
];

export default links;
