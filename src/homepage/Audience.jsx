import React, { Component } from "react";

class Audience extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="audience-container">
          <h2>Who We Help</h2>
          <div className="row">
            <div className="col-sm-4">
              <h3>Patients</h3>
              <img src="public/patient.png" />
              <p>We help patients</p>
            </div>
            <div className="col-sm-4">
              <h3>Pharmaceuticals</h3>
              <img src="public/pharma.png" />
              <p>We help Pharmaceuticals</p>
            </div>
            <div className="col-sm-4">
              <h3>Doctors</h3>
              <img src="public/doctor.png" />
              <p>We help doctors</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Audience;