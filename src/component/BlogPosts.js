import React,{ Component } from 'react';
import * as actions from '../action/posts';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class BlogPosts extends Component {
    componentWillMount() {
       this.props.fetchPosts();
       
    }
    //화면상 출력은 최근것 부터이지만 맵핑 시 링크는 오래된게 처음에 온다.
    renderPosts() {
        const id = Object.keys(this.props.posts).reverse();
        return Object.keys(this.props.posts).map((key) =>{
                  return (
                    <article className="card" key={key}>
                        <Link to={"/posts/" + id[key] } >
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
        if(!this.props.posts) {
            return <div>Empty Post!</div>
        };
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
    return {
        posts : state.posts,
        postKey : state.postKey
    };
}

export default connect(mapStateToProps, actions)(BlogPosts);