import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

import CountryAdd from "./compareCountries/CountryAdd";
import SelectedCountries from "./compareCountries/SelectedCountries";
import EmissionsDisplay from "./compareCountries/EmissionsDisplay";

class CompareCountries extends React.Component {
  constructor(props) {
    super();
    this.state = {
      countries: {},
      selectedCountries: {},
      emissionData: {},
      emissionPerCapitaData: {},
      loading: false,
      fatalError: false
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/api/countries");
      if (res.status !== 200) throw "";
      this.setState({ countries: res.data });
    } catch (err) {
      this.setState({ fatalError: true });
    }
  }

  async addCountry(countryName) {
    const countryCode = this.state.countries[countryName];

    this.setState({ loading: true });
    const resEmissionsPerCapita = await axios.get(
      `/api/emissions-per-capita/${countryCode}`
    );
    const resEmissions = await axios.get(`/api/emissions/${countryCode}`);

    this.setState({
      emissionData: {
        ...this.state.emissionData,
        [countryCode]: resEmissions.data
      }
    });

    this.setState({
      emissionPerCapitaData: {
        ...this.state.emissionPerCapitaData,
        [countryCode]: resEmissionsPerCapita.data
      }
    });
    this.setState({
      selectedCountries: {
        ...this.state.selectedCountries,
        [countryName]: countryCode
      }
    });
    this.setState({ loading: false });
  }

  removeCountry(countryName) {
    const { [countryName]: x, ...rest } = this.state.selectedCountries;
    this.setState({ selectedCountries: rest });
  }

  render() {
    if (this.state.fatalError) {
      return (
        <Alert bsStyle="danger">
          <h4>Unable to load data from API!</h4>
          <p>Try again later.</p>
        </Alert>
      );
    }

    return (
      <div class="row marketing">
        <div class="col">
          <div>
            <CountryAdd
              countries={Object.keys(this.state.countries)}
              selectedCountries={Object.keys(this.state.selectedCountries)}
              addCountry={this.addCountry.bind(this)}
            />
            <SelectedCountries
              selectedCountries={this.state.selectedCountries}
              removeCountry={this.removeCountry.bind(this)}
            />

            <EmissionsDisplay
              emissionData={this.state.emissionData}
              emissionPerCapitaData={this.state.emissionPerCapitaData}
              selectedCountries={this.state.selectedCountries}
              loading={this.state.loading}
              errorMessage={this.state.errorMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CompareCountries;
