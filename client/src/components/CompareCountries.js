import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Alert } from "react-bootstrap";

import {
  setFatalError,
  setCountries
} from "../reducers/compareCountriesReducer";

import CountryAdd from "./compareCountries/CountryAdd";
import SelectedCountries from "./compareCountries/SelectedCountries";
import EmissionsDisplay from "./compareCountries/EmissionsDisplay";

class CompareCountries extends React.Component {
  async componentDidMount() {
    try {
      const res = await axios.get("/api/countries");
      if (res.status !== 200) throw "";
      this.props.setCountries(res.data);
    } catch (err) {
      this.props.setFatalError();
    }
  }

  render() {
    if (this.props.fatalError) {
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
            <CountryAdd />
            <SelectedCountries />
            <EmissionsDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ fatalError: state.fatalError }),
  { setFatalError, setCountries }
)(CompareCountries);
