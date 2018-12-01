import React from "react";
import { Row } from "react-bootstrap";

const SelectionDisplay = ({ name, removeCountry }) => {
  return (
    <div className="col-xs-3">
      <span>{name}</span>
      <button
        className="country-display-delete-button close"
        type="button"
        aria-label="Close"
        onClick={() => {
          removeCountry(name);
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

class SelectedCountries extends React.Component {
  render() {
    const countryNames = Object.keys(this.props.selectedCountries);
    return (
      <div>
        <h3>Selected countries</h3>
        <div className="country-display">
          {countryNames.length === 0 ? (
            <p>No countries selected.</p>
          ) : (
            <Row>
              {countryNames.map(countryName => (
                <SelectionDisplay
                  name={countryName}
                  removeCountry={this.props.removeCountry}
                />
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default SelectedCountries;
