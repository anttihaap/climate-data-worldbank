import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import YearScrollDropdown from "./util/YearScrollDropdown";

const columns = [
  {
    dataField: "countryName",
    text: "Country",
    sort: true
  },
  {
    dataField: "emissions",
    text: "C02 (kt)",
    sort: true
  },
  {
    dataField: "emissionsPerCapita",
    text: "CO2 (metric tons per capita)",
    sort: true
  },
  {
    dataField: "gdp",
    text: "GDP (million US$)",
    sort: true
  }
];

const convertStrNumWithCommasToNum = strNum => {
  return strNum
    .split(",")
    .reverse()
    .reduce((sum, num, index) => {
      return sum + num * Math.pow(1000, index);
    }, 0);
};

class CompareYears extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAllEmissionsPerCapita: [],
      currentYear: "2014",
      fetchingData: true,
      noYearSelected: true,
      fetchError: false
    };
  }

  async fetchAllEmissionsForYear() {
    this.setState({
      fetchingData: true,
      noYearSelected: false,
      currentAllEmissionsPerCapita: []
    });
    try {
      const res = await axios.get(
        `/api/emissions-and-gdp/all/year/${this.state.currentYear}/`
      );
      if (res.status !== 200) throw "";
      this.setState({
        currentAllEmissionsPerCapita: res.data,
        fetchingData: false,
        fetchError: false
      });
    } catch (err) {
      this.setState({ fetchError: true });
    }
  }

  changeYear(year) {
    this.setState({ currentYear: year }, () => {
      this.fetchAllEmissionsForYear();
    });
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
    return this.state.fetchingData && !this.state.noYearSelected ? (
      <p>Fetching data...</p>
    ) : (
      <BootstrapTable
        className="row marketing"
        keyField="countryName"
        data={this.state.currentAllEmissionsPerCapita}
        columns={columns}
      />
    );
  }

  renderFetchError() {
    return (
      <Alert bsStyle="danger">
        <h4>
          Unable to fetch emission data for year {this.state.currentYear}.
        </h4>
        <p>Try again later.</p>
      </Alert>
    );
  }
}

export default CompareYears;
