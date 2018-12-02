import React from "react";
import { Row, Col, FormGroup, Alert } from "react-bootstrap";
import FormControlSelector from "../util/FormControlSelector";
import getYearRange from "../../yearRange";

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
              options={getYearRange()}
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
