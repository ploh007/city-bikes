import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const bikesAvailable = 0;
const totalBikes = 0;

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  listItem: {
    padding: 0,
  },
}));

export const City = ({ name, id, companies }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography align="center" variant="h6" component="h6">
          {name}
        </Typography>
        <Typography align="center" variant="h5" component="h5">
          {Math.round((bikesAvailable / totalBikes) * 100, 1)} %
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {bikesAvailable} / {totalBikes}
        </Typography>
        <Typography variant="body1" component="p">
          Companies
        </Typography>
        <List dense disablePadding>
          {companies.map((item, index) => {
            return (
              <ListItem
                classes={{
                  root: classes.listItem,
                }}
                key={index}
              >
                <ListItemText primary={item} />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

City.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  companies: PropTypes.array,
};

export default City;
