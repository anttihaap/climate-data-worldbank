import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Loader from "react-loader-spinner";
import numeral from "numeral";

import BootstrapTable from "react-bootstrap-table-next";
import YearScrollDropdown from "./util/YearScrollDropdown";

import {
  setEmissionData,
  setCurrentYear,
  setFetchingEmissionData
} from "../reducers/compareYearsReducer";

const columns = [
  {
    dataField: "countryName",
    text: "Country",
    sort: true
  },
  {
    dataField: "emissions",
    text: "C02 (kt)",
    sort: true,
    formatter: cell => (cell === null ? "" : numeral(cell).format("0,0.000")),
    style: { "text-align": "right" }
  },
  {
    dataField: "emissionsPerCapita",
    text: "CO2 (metric tons per capita)",
    sort: true,
    formatter: cell => (cell === null ? "" : numeral(cell).format("0,0.000")),
    style: { "text-align": "right" }
  },
  {
    dataField: "gdp",
    text: "GDP (million US$)",
    sort: true,
    formatter: cell => (cell === null ? "" : numeral(cell).format("0,0.00")),
    style: { "text-align": "right" }
  }
];

class CompareYears extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noYearSelected: true,
      fetchError: false
    };
  }

  async fetchAllEmissionsForYear() {
    this.props.setFetchingEmissionData(true);
    this.setState({
      noYearSelected: false
    });
    try {
      const res = await axios.get(
        `/api/emissions-and-gdp/all/year/${this.props.currentYear}/`
      );
      if (res.status !== 200) throw "";
      this.props.setFetchingEmissionData(false);
      this.setState({
        fetchError: false
      });
      this.props.setEmissionData(res.data);
    } catch (err) {
      this.setState({ fetchError: true });
    }
  }

  async changeYear(year) {
    await this.props.setCurrentYear(year);
    this.fetchAllEmissionsForYear();
  }

  render() {
    return (
      <div>
        <YearScrollDropdown changeYear={this.changeYear.bind(this)} />
        {this.state.fetchError
          ? this.renderFetchError()
          : this.renderEmissionsTable()}
      </div>
    );
  }

  renderEmissionsTable() {
    return this.props.fetchingEmissionData && !this.state.noYearSelected ? (
      <div className="row">
        <div className="text-center">
          <h4>Loading data..</h4>
          <Loader type="Oval" color="#00BFFF" height="50" width="50" />
        </div>
      </div>
    ) : (
      <div>
        <h4>Emissions for year {this.props.currentYear}</h4>
        <BootstrapTable
          className="row marketing"
          keyField="countryName"
          data={this.props.emissionData}
          columns={columns}
        />
      </div>
    );
  }

  renderFetchError() {
    return (
      <Alert bsStyle="danger">
        <h4>
          Unable to fetch emission data for year {this.props.currentYear}.
        </h4>
        <p>Try again later.</p>
      </Alert>
    );
  }
}

export default connect(
  state => ({
    fetchingEmissionData: state.compareYears.fetchingEmissionData,
    currentYear: state.compareYears.currentYear,
    emissionData: state.compareYears.emissionData
  }),
  { setFetchingEmissionData, setEmissionData, setCurrentYear }
)(CompareYears);
