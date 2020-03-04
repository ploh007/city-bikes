import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import * as colors from '../theme.js';
import Country from './Country';
import City from './City';

const cities = [
  {
    name: 'Toronto, CA',
    bikesAvailable: 673,
    totalBikes: 1341,
    companies: ['Company1', 'Company2'],
  },
  {
    name: 'Toronto, CA',
    bikesAvailable: 673,
    totalBikes: 1341,
    companies: ['Company1', 'Company2'],
  },
];

const drawerWidth = 80;

const useStyles = makeStyles((theme) => ({
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Grid container spacing={3}>
            {cities.map((item, index) => {
              return (
                <Grid item key={index} xs={12}>
                  <City {...item} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
