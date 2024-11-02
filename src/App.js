// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';


import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=9

  render() {
    return (
      
      <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News  key="general" pageSize={this.pageSize} category="general" />} /> 
          <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} category="science" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} category="entertainment" source="us"/>} />
          <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} category="general"/>} />
          <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} category="health" />} />
          <Route exact path="/sports" element={<News  key="sports"pageSize={this.pageSize} category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} category="technology"/>} />
          <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} category="business"/>} />
        </Routes>
      </div>
      </Router>
    )
  }
}

// ## render is a lifecycle method, it will render html on screen (uder return)