import React from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import { toggleShowPerCapita } from "../../reducers/compareCountriesReducer.js";

import EmissionsYearRangeSelector from "./EmissionsYearRangeSelector";
import EmissionsLineGraph from "./EmissionsLineGraph";

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
  render() {
    return (
      <div>
        <h3>Emissions</h3>
        <EmissionsYearRangeSelector />
        <Col ms={6}>
          <PerCapitaCheckBox
            toggleShowPerCapita={this.props.toggleShowPerCapita}
          />
        </Col>

        <div className="row text-center">
          {this.props.showPerCapita
            ? "CO2 emissions (metric tons per capita)"
            : "CO2 emissions (kt)"}
        </div>
        <EmissionsLineGraph />
      </div>
    );
  }
}

export default connect(
  state => ({
    showPerCapita: state.compareCountries.showPerCapita
  }),
  { toggleShowPerCapita }
)(EmissionsDisplay);
