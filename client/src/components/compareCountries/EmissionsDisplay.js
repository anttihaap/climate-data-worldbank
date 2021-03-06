import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";

import { toggleShowPerCapita } from "../../reducers/compareCountriesReducer.js";

import EmissionsYearRangeSelector from "./EmissionsYearRangeSelector";
import EmissionsLineGraph from "./EmissionsLineGraph";

const PerCapitaCheckBox = ({ toggleShowPerCapita, showPerCapita }) => {
  return (
    <div className="col-xs2 checkbox">
      <label>
        <input
          type="checkbox"
          checked={showPerCapita}
          onChange={toggleShowPerCapita}
        />
        Show emissions per capita
      </label>
    </div>
  );
};

class EmissionsDisplay extends React.Component {
  render() {
    return (
      <div>
        <Row className="marketing">
          <h3>Emissions</h3>
          <EmissionsYearRangeSelector />
        </Row>
        <Row className="marketing">
          <Col sm={6}>
            <PerCapitaCheckBox
              toggleShowPerCapita={this.props.toggleShowPerCapita}
              showPerCapita={this.props.showPerCapita}
            />
          </Col>
        </Row>
        <Row className="text-center">
          {this.props.showPerCapita
            ? "CO2 emissions (metric tons per capita)"
            : "CO2 emissions (kt)"}
        </Row>
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
