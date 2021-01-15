import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';

import { useStyles } from './styles';
import links from './links';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const route = useRouteMatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState(route.path);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const routeTite = useMemo(() => {
    const nameRoute = links.find(link => link.path === activePath);

    return nameRoute?.title;
  }, [activePath]);

  const handleNavigate = useCallback(
    (path: string) => {
      history.push(path);
      setActivePath(path);
    },
    [history],
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {routeTite}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {links.map(link => (
            <ListItem
              button
              key={link.path}
              onClick={() => {
                handleNavigate(link.path);
              }}
            >
              {link.path === activePath ? (
                <ListItemIcon style={{ color: '#1976d2' }}>
                  {link.icon}
                </ListItemIcon>
              ) : (
                <ListItemIcon>{link.icon}</ListItemIcon>
              )}
              <ListItemText
                style={{
                  color: link.path === activePath ? '#1976d2' : 'inherit',
                }}
                primary={link.title}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
