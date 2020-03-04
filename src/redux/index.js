import { createStore } from 'redux'

export const SELECT_COUNTRY = 'SELECT_COUNTRY'

// Sets the initial state of the selected country
export const initialState = {
  country: "US"
};

export function selectCountry(country) {
  return { type: SELECT_COUNTRY, country }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_COUNTRY:
      return Object.assign({}, state,  {
        country: action.country
      });
    default:
      return state
  }
}

const store = createStore(reducer)

export default store;