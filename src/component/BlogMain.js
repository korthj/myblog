import React,{ Component } from 'react';
import {todayReset} from '../Firebase';

class BlogMain extends Component {
    constructor(props){
        super(props);
      };

    componentDidMount(){
     this.todayCountReset();
    }

    todayCountReset = () => {
        todayReset().update({'today' : 0});
      }  
      render(){
          return(
          <div>asd</div>
          )
      }
}

export default BlogMain; 