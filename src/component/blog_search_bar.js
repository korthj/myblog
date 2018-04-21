import React, { Component } from 'react';

class BlogSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term : ''};
    }

    render() {
        return (
            <div className="search-bar">
                <input 
                    vlaue={this.state.term} 
                    onChange = {event => this.onInputChange(event.target.value)} 
                />
            </div>
        );
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default BlogSearchBar;