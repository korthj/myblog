//메인 페이지에서 출력할 카테고리 인자를 매개변수로 받아 넘어와서 firebase db-post에 저장된 매개변수와 일치하는 카테고리만 출력하여준다.
//react-router = link: /adress/:param으로 보낸 값을 this.props.match.params로 받아온 category의 값을 db에 접속해서 가져온 값들 중에 비교해서 출력해준다
import React, { Component } from 'react';
import * as actions from '../action/posts';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../style/post.css';

class PostShowfromCategory extends Component{
    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillUnmount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        //가져온 게시물들을 category로 나눈다
        const id = Object.keys(this.props.posts).reverse();
        const category = this.props.match.params.category;
        let postArr = this.props.posts;
        let arg = [];
        for(let i in postArr){            
            if(postArr[i].category == category){
                arg[i] = postArr[i];
            }
        }

        return Object.keys(arg).map((key) => {
            let content = arg[key].content;
            return (
                <article className="custom-card-aticle" key={key}>
                    <Link to={ "/posts/" + id[key] }>
                        <div id="postThumbnail">
                            <img className="imgStyle" src={arg[key].thumbnail}/>
                            <h3>{arg[key].title}</h3>
                            <p id="textContent"> {content.replace(/(<([^>]+)>)/gi,"\n")} </p>
                        </div>
                    </Link>
                </article>
            )
        })
    }

    render(){
        if(this.props.posts.length == 0) {
            return <div style={{textAlign:'center'}}>현재 작성된 게시물이 없습니다.</div>
        }
        return(
            <div className="custom-card-list">
                {this.renderPosts()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        posts : state.posts
    };
}

export default connect(mapStateToProps, actions)(PostShowfromCategory);