import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import blogMain from './blog_main';

export default class App extends Component {

  
  render() {
    return (
      <div>
        <Route exact path="/" component={ blogMain } />
      </div>
    );
  }
};


 