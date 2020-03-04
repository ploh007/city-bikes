import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import City from './City';

// Translate Cities object to fit PropTypes of City Component
class CityService {
  constructor(city) {
    this.name = city.location.city;
    this.companies = city.company;
    this.id = city.id;
  }
}

export const Cities = ({ cities }) => {
  const cityList = cities.map((city) => new CityService(city));

  return (
    <>
      {cityList.map((item, index) => {
        return (
          <Grid item key={index} xs={12}>
            <City {...item} />
          </Grid>
        );
      })}
    </>
  );
};

Cities.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default Cities;
