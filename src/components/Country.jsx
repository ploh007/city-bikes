import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { selectCountry } from '../redux';
import * as colors from '../theme';

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: 0,
    '&:hover': { backgroundColor: colors.hover },
  },
  selected: {
    backgroundColor: colors.selected,
  },
}));

export const Country = ({ name, selected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Button
      classes={{
        root: classes.button,
      }}
      className={selected ? classes.selected : ''}
      onClick={() => dispatch(selectCountry(name))}
      disableRipple
      disableElevation
    >
      <img alt={name} src={`https://www.countryflags.io/${name}/flat/48.png`}></img>
    </Button>
  );
};

Country.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

Country.defaultProps = {
  selected: false,
};

export default Country;
