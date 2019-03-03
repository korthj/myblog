import React,{ Component } from 'react';
import * as actions from '../action/posts';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/post.css'


class BlogPosts extends Component {
    componentWillMount() {
       this.props.fetchPosts();
       
    }
    //배열 거꾸로 뒤집어서 최근 것 부터 화면에 뿌려준다.
    renderPosts() {
        const id = Object.keys(this.props.posts).reverse();
        return Object.keys(this.props.posts).map((key) =>{
                  return (
                    <article className="w3-quarter" key={key}>
                        <Link to={"/posts/" + id[key] } >                                
                            <div>
                                <img className="imgStyle" src="https://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-01.jpg"/>
                                <h3>{this.props.posts[key].title}</h3>
                                <p>{this.props.posts[key].content}</p>
                            </div>                    
                        </Link>
                    </article>                              
                  )
                }     
            );
        }

    render() {
        if(this.props.posts.length == 0) {
            return <div style={{textAlign:'center'}}>현재 작성된 게시물이 없습니다.</div>
        };
        return (
                <div className="w3-row-padding w3-padding-16 w3-center">                   
                            {this.renderPosts()}                    
                </div>            
        )        
    };
};

 function mapStateToProps(state){
    return {
        posts : state.posts,
    };
}

export default connect(mapStateToProps, actions)(BlogPosts);