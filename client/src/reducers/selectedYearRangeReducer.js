import { combineReducers } from "redux";
import { toYear, fromYear } from "../yearRange";

const fromYearReducer = (state = fromYear, action) => {
  switch (action.type) {
    case "SET_SELECTED_FROM_YEAR":
      return action.data.fromYear;
    default:
      return state;
  }
};

const toYearReducer = (state = toYear, action) => {
  switch (action.type) {
    case "SET_SELECTED_TO_YEAR":
      return action.data.toYear;
    default:
      return state;
  }
};

export const setSelectedFromYear = fromYear => ({
  type: "SET_SELECTED_FROM_YEAR",
  data: { fromYear }
});

export const setSelectedToYear = toYear => ({
  type: "SET_SELECTED_TO_YEAR",
  data: { toYear }
});

export default combineReducers({
  fromYear: fromYearReducer,
  toYear: toYearReducer
});
