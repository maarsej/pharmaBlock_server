import React, { Component } from "react";

class Team extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="team-container">
          <h2>Our Team</h2>
          <div className="row">
            <div className="col-sm-4">
              <h3>Jody</h3>
            </div>
            <div className="col-sm-4">
              <h3>Jacob</h3>
            </div>
            <div className="col-sm-4">
              <h3>Thomas</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;