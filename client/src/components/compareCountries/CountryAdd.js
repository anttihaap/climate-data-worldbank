import React from "react";
import ReactAutocomplete from "react-autocomplete";
import { Alert, Button } from "react-bootstrap";

class CountryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      value: ""
    };
  }

  addCountry() {
    if (this.props.selectedCountries.includes(this.state.value)) {
      this.setState({ errorMessage: "Country already added!" });
    } else if (!this.props.countries.includes(this.state.value)) {
      this.setState({
        errorMessage: `"${this.state.value}" is not a country!`
      });
    } else {
      this.setState({ errorMessage: null });
      this.props.addCountry(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <div className="col">
          <ReactAutocomplete
            items={this.props.countries}
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
          />

          <p />
        </div>
        <div>
          <Button onClick={this.addCountry.bind(this)}>Add</Button>
        </div>
        <div>
          {this.state.errorMessage && (
            <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
          )}
        </div>
      </div>
    );
  }
}

export default CountryAdd;
