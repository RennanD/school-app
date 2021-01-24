import React from 'react';

import {
  DeckOutlined,
  SchoolOutlined,
  ClassOutlined,
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
];

export default links;
