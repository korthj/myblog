import React,{ Component } from 'react';
import {fetchPosts} from '../action/posts';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class BlogPosts extends Component {
    componentWillMount() {
       this.props.fetchPosts();
    }

    renderPosts() {
        console.log("state"+this.state);
        console.log("props"+this.props);
        return Object.keys(this.props.posts).map((key) =>{
                  return (
                    <article className="card" key={key}>
                        <Link to={"/posts/" + this.props.posts[key]}>                    
                            <picture className="thumbnail">
                                <img src="https://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-01.jpg" alt="A banana that looks like a bird"/>
                            </picture>
                            <div className="card-content">
                                <h2>{this.props.posts[key].title}</h2>
                                <p>{this.props.posts[key].content}</p>
                            </div>                    
                        </Link>
                    </article>                              
                  )
                }     
            );
        }


    render() {
        return (
            <main className="main-area">                        
                <div className="centered">
                    <section className="cards">  
                        {this.renderPosts()}    
                    </section>                        
                </div>                        
            </main>
        )        
    };
};

 function mapStateToProps(state){
    return {posts : state.data}
}

export default connect(mapStateToProps, { fetchPosts })(BlogPosts);