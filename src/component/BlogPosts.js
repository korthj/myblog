import React,{ Component } from 'react';
import * as actions from '../action/posts';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/post.css'

//메인 페이지 글 뿌려주는 컴포넌트
class BlogPosts extends Component {
    componentWillMount() {
       this.props.fetchPosts();
    }
  
    componentWillUnmount(){
        this.props.fetchPosts();
    }

    //배열 거꾸로 뒤집어서 최근 것 부터 화면에 뿌려준다.
    renderPosts() { 
        //
        const id = Object.keys(this.props.posts).reverse();
        return Object.keys(this.props.posts).map((key) =>{   
                let content = this.props.posts[key].content;         
                return (
                    <article className="custom-card-aticle" key={key}> 
                        <Link to={"/posts/" + id[key] } >                                
                            <div id="postThumbnail">
                                <img className="imgStyle" src={this.props.posts[key].thumbnail}/>
                                <h3>{this.props.posts[key].title}</h3>
                                <p id="textContent">{content.replace(/(<([^>]+)>)/gi,"\n")}</p>
                            </div>                    
                        </Link>
                    </article>                         
                  )
            });
        }

    render() {
        if(this.props.posts.length == 0) {
            return <div style={{textAlign:'center'}}>현재 작성된 게시물이 없습니다.</div>
        };
        return (
                <div className="custom-card-list">                   
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