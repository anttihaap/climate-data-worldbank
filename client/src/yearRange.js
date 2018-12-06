import * as R from "ramda";

export const fromYear = 1960;
export const toYear = new Date().getFullYear();

export default () => {
  const earliestYear = 1960;
  const latestYear = new Date().getFullYear();
  return R.range(earliestYear, latestYear + 1);
};
