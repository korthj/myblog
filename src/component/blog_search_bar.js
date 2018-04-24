import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BlogSearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term : '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
        
    }
        
    onFormSubmit(event) {
        event.preventDefault();
        this.props.searchBlog(this.state.term)
        this.setState({ term: event.target.value });
    }

    render() {
        return(
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input 
                    placeholder="Google Search!"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Search</button>
                </span>    
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
}

export default connect(null,mapDispatchToProps)(BlogSearchBar);