import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import * as colors from '../theme.js';
import Country from './Country';
import City from './City';
import { uniq } from 'lodash';
import Typography from '@material-ui/core/Typography';

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
  loadingText: {
    color: '#ffffff',
  },
}));

// Filter all networks less than a given latitude and longitude
export const filterNetworks = ({ networks }, latitude, longitude) => {
  return networks.filter((network) => network.location.latitude < latitude && network.location.longitude < longitude);
};

export const getUniqueCountries = (networks) => {
  return uniq(networks.map((network) => network.location.country));
};

export const Dashboard = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState(null);
  const [networks, setNetworks] = useState(null);


  // Call to invoke network API to obtain networks and countries list.
  useEffect(() => {
    fetch(`http://api.citybik.es/v2/networks`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        const networksData = filterNetworks(response, 50, -50);
        const countriesData = getUniqueCountries(networksData);
        setNetworks(networksData);
        setCountries(countriesData);
        setIsLoading(false);
      })
      .catch(() => {});
  }, []);

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
        {isLoading ? (
          <Typography variant="h1" align="center" className={classes.loadingText}>
            ...
          </Typography>
        ) : (
          countries.map((item, index) => {
            return <Country key={index} name={item} />;
          })
        )}
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
