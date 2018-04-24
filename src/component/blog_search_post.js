import React,{ Component } from 'react';
import { connect } from 'react-redux';

class BlogSearchPost extends Component {
   
    renderPosts(posts) {
        const name = posts.items.map(posts => posts.title);
        const link = posts.items.map(posts => posts.link);
      return (
         <tr key={posts.items}> 
            <td>{name}</td>
            <a>{link}</a>
         </tr>
      )
    }

    render(){
        return (
            <table>
                <thead>
                <tr><td>Posts</td></tr>
                </thead>
                <tbody>
                    {this.props.posts.map(this.renderPosts)}
                </tbody>
            </table>
        )
    };
}

function mapStateToProps({posts}) {
    console.log(posts);
    return { posts };
}

export default connect(mapStateToProps)(BlogSearchPost);