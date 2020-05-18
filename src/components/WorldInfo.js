import React from "react";
import coronaWorldStats from "../apis/coronaWorldStats";
import Loading from './Loading.gif'
import './App.css'

class WorldInfo extends React.Component {
  state = {
    infected: 0,
    dead: 0,
    cured: 0,
    err: ""
  };

  showLatest = () => {
    coronaWorldStats
      .get()
      .then(Response => {
        this.setState({
          infected: Response.data.total_cases,
          dead: Response.data.total_deaths,
          cured: Response.data.total_recovered
        });
      })
      .catch(err => {
        this.setState({
          err
        });
      });
  };

  componentDidMount = () => {
    this.showLatest();
  };

  render() {
    if (!this.state.infected) {
      return <div><img src={Loading} alt="Loading.." height="200px" width="200px" className="center"/></div>;
    } else {
      return (
        <div className="ui container">
          <h2 className="ui huge header">Global Data:</h2>
          <div className="ui segment">
            <h3 className="header" style={{ color: "orange" }}>
              Infected:
            </h3>
            <h4>{this.state.infected}</h4> 
          </div>
          <div className="ui segment"> 
            <h3 className="header" style={{ color: "red" }}>
              Dead:
            </h3>
            <h4>{this.state.dead} </h4>
          </div>
          <div className="ui segment">
            <h3 className="header" style={{ color: "green" }}>
              Cured:
            </h3>
            <h4>{this.state.cured}</h4>
          </div>
          <div className="ui section divider"></div>
        </div>
      );
    }
  }
}

export default WorldInfo;
