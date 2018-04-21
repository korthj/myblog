import React, { Component } from 'react';
import BlogSearchBar from './blog_search_bar';
const API_KEY = 'AIzaSyCELFBNzyjWIWXaQOLLbchN4kYiZlS9dTk';

export default class App extends Component {
  render() {
    return (
      <div>
      <BlogSearchBar />
       {this.props.children}
      </div>
    );
  }
};


