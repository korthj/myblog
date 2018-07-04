import React,{Component} from 'react';
import {fire,getPosts} from '../Firebase';
import {Link} from 'react-router-dom';

export default class PostShow extends Component {
   constructor(props){
        super(props);
        this.state = {
            post: []
        },
        fire();
   };
   
   componentDidMount(){
       //포스트를 가져와서 배열 인덱스를 맵을 사용하여 파라미터로 넘어온 아이디와 비교하여 일치하는 포스트를 스테이트에 저장한다.
        getPosts().on('value',snapshot => {
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

   render() {
       const { post } = this.state;
       if(!post){
           return <div>Loading...</div>
       }

       return(
           <div>
             <Link to="/">Back</Link>   
            <div className="container">
            <div className="row">                
                <div className="col-lg-8">                
                <h1 className="mt-4">{post.title}</h1>                
                <p className="lead">
                    <a href="#">{post.category}</a>
                </p>
                <hr/>                
                <p>게시물 생성 날짜</p>
                <hr/>                
                <img className="img-fluid rounded" src="https://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-01.jpg" alt=""/>
                <hr/>                
                <p className="lead">{post.content} </p>
                <hr/>                
                <div className="card my-4">
                    <h5 className="card-header">댓글 작성</h5>
                    <div className="card-body">
                    <form>
                        <div className="form-group">
                        <textarea className="form-control" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary pull-xs-right" >댓글 쓰기</button>
                    </form>
                    </div>
                </div>                
                <div className="media mb-4">
                <img className="rounded-circle" src="https://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-01.jpg" alt="img area"/>                   
                    <div className="media-body">                     
                    <h5 className="mt-0">User Name Area</h5>
                    댓글 내용
                    </div>
                </div>
                </div>
                </div>
                </div>
           </div>
       )
   };
};
