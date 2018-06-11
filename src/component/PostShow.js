import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../action/posts';
import {Link} from 'react-router-dom';

class PostShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

   render() {
       const {post} = this.props;
        
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

                
                <p>Posted on January 1, 2018 at 12:00 PM</p>

                <hr/>

                
                <img className="img-fluid rounded" src="https://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-01.jpg" alt=""/>

                <hr/>

                
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>

                <p>{post.content}</p>

                <hr/>

                
                <div className="card my-4">
                    <h5 className="card-header">Leave a Comment:</h5>
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
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                </div>
                </div>
                </div>
                </div>
           </div>
       )
   };
};

function mapStateToProps(state){
    return { post: state.posts.post }
};

export default connect(mapStateToProps,{fetchPost})(PostShow);