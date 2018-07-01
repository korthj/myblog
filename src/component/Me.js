import React,{Component} from 'react';
import {fire, getFireDB,setPosts} from '../Firebase';
import {Link} from 'react-router-dom';

class Me extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: []
        };
        fire();
    }
    
    componentDidMount(){
        getFireDB()
        .then(res => (
            this.setState({
                mes: res.val().me
            })       
        ));
    }
    
    render(){
        const { mes } = this.state;
      return(
        <div>            
            {mes.host}
        </div>
      )
    }
}

export default Me;