import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as colors from '../theme.js';
import Country from './Country';

const drawerWidth = 80;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: colors.darkBackground,
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: colors.header,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: colors.sideBar,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
          <Country name="ca" />
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Country name="ca" />
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
};

export default Dashboard;
