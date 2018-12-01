import React from "react";
import { Line } from "react-chartjs-2";
import Loader from "react-loader-spinner";

const EmissionsChart = ({ years, selectedCountries, emissionData }) => {
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
    return years.map(year => emissionsForCountry[year]);
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
          years={this.props.years}
          selectedCountries={this.props.selectedCountries}
          emissionData={this.props.emissionData}
        />
        {this.props.loading && (
          <div className="emissions-graph-spinner">
            <Loader type="Oval" color="#00BFFF" height="100" width="100" />
          </div>
        )}
      </div>
    );
  }
}

export default EmissionsLineGraph;
