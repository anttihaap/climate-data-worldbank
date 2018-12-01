import React from "react";
import { ControlLabel, FormControl } from "react-bootstrap";

class FormControlSelector extends React.Component {
  render() {
    return (
      <div>
        <ControlLabel>{this.props.controlLabel}</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder=" "
          onChange={this.props.onChange}
        >
          {this.props.options.map(option => (
            <option value={option}>{option}</option>
          ))}
        </FormControl>
      </div>
    );
  }
}

export default FormControlSelector;
