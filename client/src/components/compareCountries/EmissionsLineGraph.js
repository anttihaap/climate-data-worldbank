import React from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import Loader from "react-loader-spinner";
import * as R from "ramda";

const EmissionsChart = ({
  years,
  selectedCountries,
  emissionData,
  showPerCapita
}) => {
  const colors = [
    "100,0,0",
    "0,0,100",
    "0,50,0",
    "100,100,0",
    "50,0,50",
    "0,100,0",
    "0,100,100"
  ];
  const parseEmissionDataForDataset = countryCode => {
    const emissionsForCountry = emissionData[countryCode];
    return years.map(year => {
      const emissionsForYear = emissionsForCountry[year];
      if (!emissionsForYear) {
        return { emissions: null, emissionsPerCapita: null };
      }
      return showPerCapita
        ? emissionsForYear.emissionsPerCapita
        : emissionsForYear.emissions;
    });
  };

  const createDataset = (countryName, color, data) => {
    const [r, g, b] = color.split(",");
    return {
      label: countryName,
      fill: false,
      lineTension: 0.1,
      backgroundColor: `rgba(${r},${g},${b},0.4)`,
      borderColor: `rgba(${r},${g},${b},1)`,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: `rgba(${r},${g},${b},1)`,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: `rgba(${r},${g},${b},1)`,
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data
    };
  };

  const dataset = () => {
    return {
      labels: years,
      datasets: Object.keys(selectedCountries).map((countryName, index) => {
        const color =
          colors[
            index +
              1 -
              Math.floor((index + 1) / colors.length) * colors.length -
              1
          ];
        const data = parseEmissionDataForDataset(
          selectedCountries[countryName]
        );
        return createDataset(countryName, color, data);
      })
    };
  };
  return (
    <div>
      <Line data={dataset()} />
    </div>
  );
};

class EmissionsLineGraph extends React.Component {
  render() {
    return (
      <div>
        <EmissionsChart
          years={R.range(
            this.props.selectedYearRange.fromYear,
            this.props.selectedYearRange.toYear + 1
          )}
          selectedCountries={this.props.selectedCountries}
          emissionData={this.props.emissionData}
          showPerCapita={this.props.showPerCapita}
        />
        {this.props.fetchingEmissionData && (
          <div className="emissions-graph-spinner">
            <Loader type="Oval" color="#00BFFF" height="100" width="100" />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedCountries: state.compareCountries.selectedCountries,
    emissionData: state.compareCountries.emissionData,
    showPerCapita: state.compareCountries.showPerCapita,
    fetchingEmissionData: state.compareCountries.fetchingEmissionData,
    selectedYearRange: state.compareCountries.selectedYearRange
  }),
  null
)(EmissionsLineGraph);
