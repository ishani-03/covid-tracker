import React from "react";
import SearchBar from "./SearchBar";
import WorldInfo from "./WorldInfo";
import Guidelines from "./Guidelines";
import covid19 from "../apis/covid-19";
import './App.css'

class App extends React.Component {
  state = {
    err: "",
    country: "",
    confirmed: null,
    active: null,
    cured: null,
    dead: null
  };

  onSearchSubmit = country => {
    covid19
      .get("/statistics", {
        params: {
          country
        }
      })
      .then(resp => {
        this.setState({
          confirmed: resp.data.response[0].cases.total,
          active: resp.data.response[0].cases.active,
          cured: resp.data.response[0].cases.recovered,
          country: resp.data.response[0].country,
          dead: resp.data.response[0].deaths.total,
          err: ""
        });
      })
      .catch(err => {
        this.setState({
          err:
            "Couldn't Find Country. Try hyphen between words for country with two words. Try UK for united kingdom, USA for america or UAE for united arab emirates"
        });
      });
  };

  renderSearch() {
    return (
      <div>
        <h3 className="ui huge header">Country: {this.state.country}</h3>
        <div>
          <div className="ui segment">
            <h3 className="ui header" style={{ color: "orange" }}>
              Confirmed Cases:
            </h3>
            <h4>{this.state.confirmed}</h4>
          </div>
          <div className="ui segment">
            <h3 className="ui header">Active Cases:</h3>
            <h4>{this.state.active}</h4>
          </div>
          <div className="ui segment">
            <h3 className="ui header" style={{ color: "red" }}>
              Dead:
            </h3>
            <h4>{this.state.dead}</h4>
          </div>
          <div className="ui segment">
            <h3 className="header" style={{ color: "green" }}>
              Cured:
            </h3>
            <h4>{this.state.cured}</h4>
          </div>
        </div>
        <div className="ui section divider"></div>
      </div>
    );
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: "20px" }}>
        <SearchBar onSearchSubmit={this.onSearchSubmit} />
        {this.state.country === "" ? <div></div> : this.renderSearch()}
        {this.state.err ? (
          <div>
            <div>Error: {this.state.err}</div>
            <div className="ui section divider"></div>
          </div>
        ) : (
          <div></div>
        )}
        <WorldInfo />
        <Guidelines />
      </div>
    );
  }
}

export default App;
