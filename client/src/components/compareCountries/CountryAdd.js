import React from "react";
import { connect } from "react-redux";
import {
  addSelectedCountry,
  addEmissionData,
  setFetchingEmissionData
} from "../../reducers/compareCountriesReducer";
import axios from "axios";
import ReactAutocomplete from "react-autocomplete";
import { Col, Row, Alert, Button } from "react-bootstrap";

class CountryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      value: ""
    };
  }

  validateCountry() {
    const countryName = this.state.value;
    if (Object.keys(this.props.selectedCountries).includes(countryName)) {
      this.setState({ errorMessage: "Country already added!" });
      return false;
    } else if (!Object.keys(this.props.countries).includes(countryName)) {
      this.setState({
        errorMessage: `"${this.state.value}" is not a country!`
      });
      return false;
    }
    return true;
  }

  async addCountry() {
    if (!this.validateCountry()) {
      return;
    }

    this.setState({ errorMessage: null });

    const countryName = this.state.value;
    const countryCode = this.props.countries[countryName];

    this.props.setFetchingEmissionData(true);

    const resEmissions = await axios.get(`/api/emissions/${countryCode}`);

    this.props.addEmissionData(countryCode, resEmissions.data);

    this.props.addSelectedCountry(countryName, countryCode);
    this.props.setFetchingEmissionData(false);
  }

  render() {
    return (
      <div class="row marketing">
        <div class="col">
          <ReactAutocomplete
            items={Object.keys(this.props.countries)}
            shouldItemRender={(item, value) =>
              item.toLowerCase().includes(value.toLowerCase())
            }
            inputProps={{
              className: "form-control form-control-lg",
              placeholder: "Search Countries"
            }}
            getItemValue={item => item}
            renderItem={(item, highlighted) => <div key={item}>{item}</div>}
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onSelect={value => this.setState({ value })}
            menuStyle={{
              borderRadius: "3px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.9)",
              padding: "2px 0",
              fontSize: "90%",
              position: "fixed",
              zIndex: 9001,
              overflow: "auto",
              maxHeight: "50%"
            }}
          />

          <p />
        </div>
        <div>
          <Button onClick={this.addCountry.bind(this)}>Add</Button>
        </div>
        <div>
          <Col>
            {this.state.errorMessage && (
              <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
            )}
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    countries: state.compareCountries.countries,
    selectedCountries: state.compareCountries.selectedCountries
  };
};

export default connect(
  mapStateToProps,
  {
    addSelectedCountry,
    addEmissionData,
    setFetchingEmissionData
  }
)(CountryAdd);
