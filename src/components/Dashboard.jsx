import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import * as colors from '../theme.js';
import Country from './Country';
import { groupBy, keys } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Cities from './Cities.jsx';
import { useSelector } from 'react-redux';

const drawerWidth = 80;
const networksAPI = `https://api.citybik.es/v2/networks`;

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
    color: colors.text,
  },
}));

// Filter all networks less than a given latitude and longitude
export const filterNetworks = ({ networks }, latitude, longitude) => {
  return networks.filter((network) => network.location.latitude < latitude && network.location.longitude < longitude);
};

export const groupNetworksByCountry = (networks) => {
  return groupBy(networks, 'location.country');
};

export const Dashboard = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState(null);

  const selectedCountry = useSelector((state) => state.country)

  // Call to invoke network API to obtain networks and countries list.
  useEffect(() => {
    fetch(networksAPI, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        const networksData = filterNetworks(response, 50, -50);
        const countriesData = groupNetworksByCountry(networksData);
        setCountries(countriesData);
        setIsLoading(false);
      })
      .catch(() => {});
  }, [selectedCountry]);

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
          <Typography variant="h1" align="center" color="secondary">
            ...
          </Typography>
        ) : (
          keys(countries).map((item, index) => {
            return <Country key={index} name={item} selected={selectedCountry === item? true : false} />;
          })
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Grid container spacing={3}>
            {isLoading ? (
              <Grid item xs={12}>
                <Typography variant="h1" align="center" className={classes.loadingText}>
                  Loading ...
                </Typography>
              </Grid>
            ) : (
              <Cities cities={countries[selectedCountry]} />
            )}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
