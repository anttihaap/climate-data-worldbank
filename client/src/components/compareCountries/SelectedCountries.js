import React from "react";
import { connect } from "react-redux";
import { removeSelectedCountry } from "../../reducers/compareCountriesReducer.js";
import { Row, Col } from "react-bootstrap";

const SelectionDisplay = ({ name, removeSelectedCountry }) => {
  return (
    <div className="col-xs-3">
      <span>{name}</span>
      <button
        className="country-display-delete-button close"
        type="button"
        aria-label="Close"
        onClick={() => {
          removeSelectedCountry(name);
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
      <Row className="marketing">
        <Col>
          <h3>Selected countries</h3>
          <div className="country-display">
            {countryNames.length === 0 ? (
              <p>No countries selected.</p>
            ) : (
              <Row>
                {countryNames.map(countryName => (
                  <SelectionDisplay
                    name={countryName}
                    removeSelectedCountry={this.props.removeSelectedCountry}
                  />
                ))}
              </Row>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect(
  state => ({
    selectedCountries: state.compareCountries.selectedCountries
  }),
  { removeSelectedCountry }
)(SelectedCountries);
