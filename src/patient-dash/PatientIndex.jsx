import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PatientSidebar from './PatientSidebar.jsx';

class PatientIndex extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
      
         <PatientSidebar />
      
      );
    }
  }
  
  export default PatientIndex;