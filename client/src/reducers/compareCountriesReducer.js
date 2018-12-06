import { combineReducers } from "redux";
import selectedYearRangeReducer from "./selectedYearRangeReducer";

const compareCountriesPrefix = "CC";

const SET_FATAL_ERROR = `${compareCountriesPrefix}_SET_FATAL_ERROR`;
const SET_COUNTRIES = `${compareCountriesPrefix}_SET_COUNTRIES`;
const ADD_SELECTED_COUNTRY = `${compareCountriesPrefix}_ADD_SELECTED_COUNTRY`;
const REMOVE_SELECTED_COUNTRY = `${compareCountriesPrefix}_REMOVE_SELECTED_COUNTRY`;
const ADD_EMISSION_DATA = `${compareCountriesPrefix}_ADD_EMISSION_DATA`;
const ADD_EMISSION_PER_CAPITA_DATA = `${compareCountriesPrefix}_ADD_EMISSION_PER_CAPITA_DATA`;
const SET_FETCHING_EMISSION_DATA = `${compareCountriesPrefix}_SET_FETCHING_EMISSION_DATA`;
const TOGGLE_SHOW_PER_CAPITA = `${compareCountriesPrefix}_TOGGLE_SHOW_PER_CAPITA`;

const fatalErrorReducer = (state = false, action) => {
  switch (action.type) {
    case SET_FATAL_ERROR:
      return true;
    default:
      return state;
  }
};

const countriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return action.data;
    default:
      return state;
  }
};

const selectedCountriesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SELECTED_COUNTRY:
      return {
        ...state,
        [action.data.countryName]: action.data.countryCode
      };
    case REMOVE_SELECTED_COUNTRY:
      const { [action.data.countryName]: x, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

const emissionDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMISSION_DATA:
      return {
        ...state,
        [action.data.countryCode]: action.data.emissionData
      };
    default:
      return state;
  }
};

const fetchingEmissionDataReducer = (state = false, action) => {
  switch (action.type) {
    case SET_FETCHING_EMISSION_DATA:
      return action.data.value;
    default:
      return state;
  }
};

const emissionPerCapitaDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMISSION_PER_CAPITA_DATA:
      return {
        ...state,
        [action.data.countryCode]: action.data.emissionPerCapitaData
      };
    default:
      return state;
  }
};

const showPerCapitaReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_PER_CAPITA:
      return !state;
    default:
      return state;
  }
};

export const setFetchingEmissionData = value => {
  return {
    type: SET_FETCHING_EMISSION_DATA,
    data: { value }
  };
};

export const setFatalError = () => ({
  type: SET_FATAL_ERROR
});

export const setCountries = countries => ({
  type: SET_COUNTRIES,
  data: countries
});

export const addSelectedCountry = (countryName, countryCode) => ({
  type: ADD_SELECTED_COUNTRY,
  data: { countryName, countryCode }
});

export const addEmissionData = (countryCode, emissionData) => ({
  type: ADD_EMISSION_DATA,
  data: { countryCode, emissionData }
});

export const addEmissionPerCapitaData = (
  countryCode,
  emissionPerCapitaData
) => ({
  type: ADD_EMISSION_PER_CAPITA_DATA,
  data: { countryCode, emissionPerCapitaData }
});

export const removeSelectedCountry = countryName => ({
  type: REMOVE_SELECTED_COUNTRY,
  data: { countryName }
});

export const toggleShowPerCapita = () => ({
  type: TOGGLE_SHOW_PER_CAPITA
});

export default combineReducers({
  fatalError: fatalErrorReducer,
  fetchingEmissionData: fetchingEmissionDataReducer,
  countries: countriesReducer,
  selectedCountries: selectedCountriesReducer,
  emissionData: emissionDataReducer,
  emissionPerCapitaData: emissionPerCapitaDataReducer,
  showPerCapita: showPerCapitaReducer,
  selectedYearRange: selectedYearRangeReducer
});
