import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import YearScrollDropdown from "./util/YearScrollDropdown";
import axios from "axios";

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
      noYearSelected: true
    };
  }

  async fetchAllEmissionsForYear() {
    this.setState({
      fetchingData: true,
      noYearSelected: false,
      currentAllEmissionsPerCapita: []
    });
    const res = await axios.get(
      `/api/emissions-and-gdp/all/year/${this.state.currentYear}/`
    );
    this.setState({
      currentAllEmissionsPerCapita: res.data,
      fetchingData: false
    });
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

        <h4>
          Emissions for year{" "}
          {this.state.noYearSelected ? "-" : this.state.currentYear}
        </h4>
        {this.state.fetchingData && !this.state.noYearSelected ? (
          <p>Fetching data...</p>
        ) : (
          <BootstrapTable
            className="row marketing"
            keyField="countryName"
            data={this.state.currentAllEmissionsPerCapita}
            columns={columns}
          />
        )}
      </div>
    );
  }
}

export default CompareYears;
