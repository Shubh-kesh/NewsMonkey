// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export default class App extends Component {
  pageSize=9

  state={
    progress:0
  }
  
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      
      <Router>
      <div>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress= {this.setProgress}      key="general" pageSize={this.pageSize} category="general" />} /> 
          <Route exact path="/science" element={<News setProgress={this.setProgress}    key="science" pageSize={this.pageSize} category="science" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress}    key="entertainment" pageSize={this.pageSize} category="entertainment" source="us"/>} />
          <Route exact path="/general" element={<News setProgress={this.setProgress}    key="general" pageSize={this.pageSize} category="general"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress}    key="health" pageSize={this.pageSize} category="health" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress}     key="sports"pageSize={this.pageSize} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress}    key="technology" pageSize={this.pageSize} category="technology"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress}    key="business" pageSize={this.pageSize} category="business"/>} />
        </Routes>
      </div>
      </Router>
    )
  }
}

// ## render is a lifecycle method, it will render html on screen (uder return)