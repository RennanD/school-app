import React from 'react';

import { DeckOutlined, SchoolOutlined } from '@material-ui/icons';

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
];

export default links;
