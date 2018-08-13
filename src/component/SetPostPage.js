import React,{Component} from 'react';
import {fire,setPosts} from '../Firebase';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm} from 'redux-form';
import '../style/SetPostPage.css';


class SetPostPage extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        alert("handleSubmit "+ this.state.value);
        event.preventDefault();
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    render(){
        return (
         <div className="setPostForm">   
        <form onSubmit={this.handleSubmit}>
            <label>
                Title:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
    }
}
export default SetPostPage;