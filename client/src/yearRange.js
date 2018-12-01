import * as R from "ramda";

export default () => {
  const earliestYear = 1960;
  const latestYear = new Date().getFullYear();
  return R.range(earliestYear, latestYear + 1);
};
