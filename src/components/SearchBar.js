import React from "react";

class SearchBar extends React.Component {
  state = { input: "" };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.state.input === ""
      ? this.setState({ input: "" })
      : this.props.onSearchSubmit(this.state.input);
  };

  render() {
    return (
      <div>
        <h2 className="text-center">CORONA<span style={{ color: "red" }}>TRACKER</span></h2>
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <h3><label>Search By Country</label></h3>
            <h4><input
              placeholder="Enter Country..."
              type="text"
              value={this.state.input}
              onChange={this.onInputChange}
            /></h4>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default SearchBar;
