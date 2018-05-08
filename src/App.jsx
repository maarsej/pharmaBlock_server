import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import NavBar from './navbar/Navbar.jsx';
import HomePage from './homepage/HomePage.jsx';
import PatientIndex from './patient-dash/PatientIndex.jsx'
import Footer from './footer/Footer.jsx';

const App = (props) => (

<Router>
  <div>
  <NavBar/>

      <Route path="/" component={HomePage} />
      <Route path="/patient/:id" component={PatientIndex} />
           
  <Footer/>
  </div>
</Router>


    )

export default App;
