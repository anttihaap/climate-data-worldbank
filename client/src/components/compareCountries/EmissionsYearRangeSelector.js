import React from "react";
import { Row, Col, FormGroup, Alert } from "react-bootstrap";
import FormControlSelector from "../util/FormControlSelector";
import getYearRange from "../../yearRange";

class EmissionsYearRangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.yearRange = getYearRange();
    this.state = {
      fromYear: this.yearRange[0],
      toYear: this.yearRange[this.yearRange.length - 1],
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
      this.props.changeYearRange({
        fromYear: this.state.fromYear,
        toYear: this.state.toYear
      });
    }
  }

  render() {
    return (
      <div>
        <FormGroup>
          <Col xs={2}>
            <FormControlSelector
              controlLabel={"from year"}
              options={this.yearRange}
              onChange={e => {
                this.setState(
                  { fromYear: e.target.value },
                  this.validateYearRange
                );
              }}
            />
          </Col>
          <Col xs={2}>
            <FormControlSelector
              controlLabel={"to year"}
              options={getYearRange().reverse()}
              onChange={e => {
                this.setState(
                  { toYear: e.target.value },
                  this.validateYearRange
                );
              }}
            />
          </Col>
          <Col xs={2} />
          <Col xs={2} />
        </FormGroup>
        <Row>
          {this.state.errorMessage && (
            <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
          )}
        </Row>
      </div>
    );
  }
}

export default EmissionsYearRangeSelector;
