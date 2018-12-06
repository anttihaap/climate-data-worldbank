import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import { FormGroup } from "react-bootstrap";
import FormControlSelector from "./FormControlSelector";
import { fromYear, toYear } from "../../yearRange";

class YearScrollDropDown extends React.Component {
  onYearChange(e) {
    const year = e.target.value;
    if (year.match(/^\d+$/)) {
      this.props.changeYear(year);
    } else {
      console.log("year not valid!");
    }
  }

  render() {
    return (
      <div className="row marketing">
        <FormGroup controlId="formControlsSelect">
          <div className="col-xs-3">
            <FormControlSelector
              controlLabel={"Select a year"}
              onChange={this.onYearChange.bind(this)}
              options={[" "].concat(R.range(fromYear, toYear + 1).reverse())}
              placeHolder=" "
            />
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(YearScrollDropDown);
