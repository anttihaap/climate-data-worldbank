import React from "react";
import * as R from "ramda";
import { FormGroup } from "react-bootstrap";
import FormControlSelector from "./FormControlSelector";
class YearScrollDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: ""
    };
  }

  onYearChange(e) {
    const year = e.target.value;
    this.setState({ year });
    if (year > 1950 && year < 2018 && !isNaN(2018)) {
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
              options={[" "].concat(R.range(1950, 2018 + 1).reverse())}
              placeHolder=" "
            />
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default YearScrollDropDown;
