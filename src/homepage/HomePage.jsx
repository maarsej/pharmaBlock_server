import React, {Component} from 'react';
import Block from './Block.jsx'
// import blocks2 from 'react-svg-loader!./blocks.svg'

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
    <h1>
     PharmaBlock
    </h1>
    <h3>Connecting patients and pharmaceutical providers with smart contracts</h3>
</div>
</div>

<div className="mission-container">
<div className="row">
    <div className="col-sm-6">
            <h2>Our Mission</h2>
            <p>Smart Contracts are awesome Smart Contracts are awesome Smart Contracts are awesome Smart Contracts are awesome Smart Contracts are awesome Smart Contracts are awesome Smart Contracts are awesome </p>
    </div>
    <div className="col-sm-6">
        <h3>Hello</h3>
    </div>  
</div>
</div>

<div className="audience-container">
<h2>Who We Help</h2>
    <div className="row">
        <div className="col-sm-4">
                <h3>Patients</h3>
                <img src="public/patient.png"/>
                <p>We help patients</p>
        </div>
        <div className="col-sm-4">
            <h3>Pharmaceuticals</h3>
            <img src="public/pharma.png"/>
            <p>We help Pharmaceuticals</p>
        </div>
        <div className="col-sm-4">
                <h3>Doctors</h3>
                <img src="public/doctor.png"/>
                <p>We help doctors</p>
            </div>
</div> 
 </div>


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

export default HomePage;