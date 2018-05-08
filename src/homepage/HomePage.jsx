import React, { Component } from "react";
import Block from "./Block.jsx";
import MissionStatement from "./Mission.jsx";
import Audience from "./Audience.jsx";
import Team from "./Team.jsx";


class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="container-square">
          <div class="blocks-container">
            <Block />
          </div>
          <div>
            <h1>PharmaBlock</h1>
            <h3>
              Connecting patients and pharmaceutical providers with smart
              contracts
            </h3>
          </div>
        </div>

        <MissionStatement />
       
        <Audience />

        <Team />

      </div>
    );
  }
}

export default HomePage;
