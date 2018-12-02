import React from "react";
import * as R from "ramda";
import { Col } from "react-bootstrap";

import EmissionsYearRangeSelector from "./EmissionsYearRangeSelector";
import EmissionsLineGraph from "./EmissionsLineGraph";
import getYearRange from "../../yearRange";

const PerCapitaCheckBox = ({ toggleShowPerCapita }) => {
  return (
    <div className="col-xs2 checkbox">
      <label>
        <input type="checkbox" onChange={toggleShowPerCapita} />
        Show emissions per capita
      </label>
    </div>
  );
};

class EmissionsDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.yearRange = getYearRange();
    this.state = {
      fromYear: this.yearRange[0],
      toYear: this.yearRange[this.yearRange.length - 1],
      showPerCapita: false
    };
  }

  changeYearRange({ fromYear, toYear }) {
    this.setState({
      fromYear,
      toYear
    });
  }

  toggleShowPerCapita() {
    this.setState({
      showPerCapita: !this.state.showPerCapita
    });
  }

  render() {
    return (
      <div>
        <h3>Emissions</h3>
        <EmissionsYearRangeSelector
          fromYear={this.state.fromYear}
          toYear={this.state.toYear}
          changeYearRange={this.changeYearRange.bind(this)}
        />
        <Col ms={6}>
          <PerCapitaCheckBox
            toggleShowPerCapita={this.toggleShowPerCapita.bind(this)}
          />
        </Col>

        <div className="row text-center">
          {this.state.showPerCapita
            ? "CO2 emissions (metric tons per capita)"
            : "CO2 emissions (kt)"}
        </div>
        <EmissionsLineGraph
          selectedCountries={this.props.selectedCountries}
          emissionData={
            this.state.showPerCapita
              ? this.props.emissionPerCapitaData
              : this.props.emissionData
          }
          years={R.range(
            Number(this.state.fromYear),
            Number(this.state.toYear) + 1
          )}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default EmissionsDisplay;
