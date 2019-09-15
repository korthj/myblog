import React,{Component} from 'react';
import {fire,getPosts,deletePost} from '../Firebase';
import "../style/PostShow.css";
import * as firebase from 'firebase/app';
import { Link } from 'react-router-dom';

//게시물 보기 컴포넌트
export default class PostShow extends Component {  
   constructor(props){
        let deleteKey = "";
        //유저 이메일 유효성 체크, 삭제 버튼 컨트롤
        const user = firebase.auth().currentUser;
        let userEmail;
        if(user != null){
            userEmail = user.email;
        }else{
            userEmail = '';
        }
        super(props);
        this.state = {
            post: [],
            userId: userEmail,
        }
        fire();
        this.deleteHandler = this.deleteHandler.bind(this);
        this.pageBackHandler = this.pageBackHandler.bind(this);
    }

    componentDidMount(){ 
       //포스트를 가져와서 배열 인덱스를 맵을 사용하여 파라미터로 넘어온 아이디와 비교하여 일치하는 포스트를 스테이트에 저장한다.
        getPosts().on('value',snapshot => {
            if (this.isUnmounted) {
                return;
            }
            if( snapshot != null){
            this.deleteKey = Object.keys(snapshot.val())[this.props.match.params.id];
            }
            const posts = [];
            snapshot.forEach(ss => {
                posts.push(ss.val());                
            });            
            Object.keys(posts).map((key) => {
                if(key === this.props.match.params.id){
                    this.setState({
                        post: posts[key]
                    });
                };              
            });            
        });
   };
   componentWillUnmount() {
    this.isUnmounted = true;
  }

   //버튼 클릭시 삭제 함수
    deleteHandler(){
        const keys = this.deleteKey;
        deletePost().child(keys).remove(); 
        this.props.history.push('/');

    }   

    //fatarrow로 만들면 event binding을 안해줘도 된다.
    pageBackHandler(){
        this.props.history.goBack();
    }
    

   render() {
        const { post,userId } = this.state;
        const modifyKey = this.deleteKey;
       return(
           <div>
            <div>
                <button onClick={this.pageBackHandler}>뒤로가기</button>   

                { userId !== '' &&
                    <button id="modifyButton" ><Link to={"/modifyPosts/"+modifyKey}>수정</Link></button>
                }

                { userId !== '' && 
                    <button id="postDeleteButton" onClick={this.deleteHandler}>삭제</button> 
                }
            </div>
            <div className="container">
            <div className="row">            
                <div className="col-lg-8">                
                <h1 className="mt-4">{post.title}</h1>                
                <p className="lead">
                    <a href="#">{post.category}</a>
                </p>
                <hr/>                
                <p>{post.date}</p>
                <hr/>
                
                <div dangerouslySetInnerHTML={{__html:post.content}}>
                </div>         
           
                </div> 
                </div>
                </div>
           </div>
       )
   };
};
