import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home.jsx';
import Sanatorium from './components/Sanatorium/Sanatorium';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';



ReactDOM.render((
  <Router>
      <Header/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/sanatorium' component={Sanatorium}/>
      <Footer/>
  </Router>
  ), document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
