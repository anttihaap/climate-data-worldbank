import React from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, Alert } from "react-bootstrap";
import FormControlSelector from "../util/FormControlSelector";
import * as R from "ramda";
import { fromYear, toYear } from "../../yearRange";

import {
  setSelectedFromYear,
  setSelectedToYear
} from "../../reducers/selectedYearRangeReducer";

class EmissionsYearRangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromYear: this.props.fromYear,
      toYear: this.props.toYear,
      errorMessage: null
    };
  }

  validateYearRange() {
    if (this.state.toYear <= this.state.fromYear) {
      this.setState({
        errorMessage: "'to year' must be greater than 'from year'"
      });
      return;
    } else {
      this.setState({ errorMessage: null });
      this.props.setSelectedFromYear(Number(this.state.fromYear));
      this.props.setSelectedToYear(Number(this.state.toYear));
    }
  }

  render() {
    const yearRange = R.range(fromYear, toYear + 1);
    return (
      <div>
        <div className="container-fluid">
          <Row>
            <Col sm={2}>
              <FormControlSelector
                controlLabel={"from year"}
                options={yearRange}
                onChange={e => {
                  this.setState(
                    { fromYear: e.target.value },
                    this.validateYearRange
                  );
                }}
              />
            </Col>
            <Col sm={2}>
              <FormControlSelector
                controlLabel={"to year"}
                options={[...yearRange].reverse()}
                onChange={e => {
                  this.setState(
                    { toYear: e.target.value },
                    this.validateYearRange
                  );
                }}
              />
            </Col>
          </Row>
        </div>
        {this.state.errorMessage && (
          <Row className="marketing">
            <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
          </Row>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    fromYear: state.compareCountries.selectedYearRange.fromYear,
    toYear: state.compareCountries.selectedYearRange.toYear
  }),
  { setSelectedFromYear, setSelectedToYear }
)(EmissionsYearRangeSelector);
