import React,{Component} from 'react';
import {fire,getPosts,deletePost} from '../Firebase';
import {Link} from 'react-router-dom';
import { database } from 'firebase';
import "../style/PostShow.css";

export default class PostShow extends Component {  
   constructor(props){
        let deleteKey = "";
        super(props);
        this.state = {
            post: [],
        },
        fire();
        this.deleteHandler = this.deleteHandler.bind(this);
        this.pageBackHandler = this.pageBackHandler.bind(this);
    }
   
   componentDidMount(){
       //포스트를 가져와서 배열 인덱스를 맵을 사용하여 파라미터로 넘어온 아이디와 비교하여 일치하는 포스트를 스테이트에 저장한다.
        getPosts().on('value',snapshot => {
            if( snapshot != null){
            this.deleteKey = Object.keys(snapshot.val())[this.props.match.params.id];
            }
              
            const posts = [];
            snapshot.forEach(ss => {
                posts.push(ss.val());                
            });            
            Object.keys(posts).map((key) => {
                if(key == this.props.match.params.id){
                    this.setState({
                        post: posts[key]
                    });
                };              
            });            
        });
   };
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
       const { post } = this.state;
    
       return(
           <div>
            <div>
                <button onClick={this.pageBackHandler}>뒤로가기</button>   
                <button id="postDeleteButton" onClick={this.deleteHandler}>삭제</button>    
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
                <img className="img-fluid rounded" src="https://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-01.jpg" alt=""/>
                <hr/>                
                <p className="lead">{post.content} </p>
                <hr/>                
           
                </div>
                </div>
                </div>
           </div>
       )
   };
};
