import { combineReducers } from "redux";

const compareYearsPrefix = "CY";

const SET_FETCH_ERROR = `${compareYearsPrefix}_SET_FETCH_ERROR`;
const SET_FETCHING_EMISSION_DATA = `${compareYearsPrefix}_SET_FETCHING_EMISSION_DATA`;
const SET_EMISSION_DATA = `${compareYearsPrefix}_SET_EMISSION_DATA`;
const SET_CURRENT_YEAR = `${compareYearsPrefix}_SET_CURRENT_YEAR`;

const fetchErrorReducer = (state = false, action) => {
  switch (action.type) {
    case SET_FETCH_ERROR:
      return action.data.value;
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

const currentYearReducer = (state = "", action) => {
  switch (action.type) {
    case SET_CURRENT_YEAR:
      return action.data.value;
    default:
      return state;
  }
};

const emissionForCurrentYear = (state = [], action) => {
  switch (action.type) {
    case SET_EMISSION_DATA:
      return action.data.emissionData;
    default:
      return state;
  }
};

export const setFetchError = value => {
  return {
    type: SET_FETCH_ERROR,
    data: { value }
  };
};

export const setCurrentYear = value => {
  return {
    type: SET_CURRENT_YEAR,
    data: { value }
  };
};
export const setFetchingEmissionData = value => {
  return {
    type: SET_FETCHING_EMISSION_DATA,
    data: { value }
  };
};

export const setEmissionData = emissionData => ({
  type: SET_EMISSION_DATA,
  data: { emissionData }
});

export default combineReducers({
  fetchError: fetchErrorReducer,
  fetchingEmissionData: fetchingEmissionDataReducer,
  currentYear: currentYearReducer,
  emissionData: emissionForCurrentYear
});
