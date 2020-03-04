import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 80;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  listItem: {
    paddingBottom: theme.spacing(2.5),
    paddingTop: theme.spacing(2.5),
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
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            City Bikes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List disablePadding>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
};

export default Dashboard;
