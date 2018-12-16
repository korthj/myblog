import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm} from 'redux-form';
import {setPosts} from '../Firebase';
import '../style/SetPostPage.css';

//게시물 작성 페이지
class SetPostPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            category: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();

            const postDate = new Date();
            const y = postDate.getFullYear();
            const m = postDate.getMonth()+1;
            const d = postDate.getDate();
            const h = postDate.getHours();
            const min = postDate.getMinutes();

            if(this.min < 10){this.min += "0"+min };

            setPosts().push({
                "content" : this.state.content,
                "title" : this.state.title,
                "userId" : "5",
                "category" : this.state.category,
                "date" :  y+"-"+m+"-"+d+" "+h+":"+min        
            });
        this.props.history.push('/');
    }

   /* handleChange(event){
        this.setState(
                {value: event.target.value}
        );
    }*/

    render(){
        return (
        <div className="newPostContainer">
        <div id="newPost">새로운 글 작성</div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>제목</label>
            </div>
            <div className="col-75">
              <input type="text" id="title" name="firstname" placeholder="제목을 입력해주세요." value={this.state.title} onChange={(e) => this.setState({title:e.target.value})}/>
            </div>
          </div>         
          <div className="row">
            <div className="col-25">
              <label>카테고리</label>
            </div>            
            <div className="col-75">
              <select id="category" name="category" value={this.state.category} onChange={(e) => this.setState({category:e.target.value})} >
                <option value="프로그래밍">프로그래밍</option>
                <option value="잡담">잡담</option>
                <option value="리뷰">리뷰</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>내용</label>
            </div>
            <div className="col-75">
              <textarea id="content" name="content" placeholder="내용을 작성해주세요." style={{height:200}} value={this.state.content} onChange={(e) => this.setState({content:e.target.value})}></textarea>
            </div>
          </div>
          <div className="row">
            <Link className="returnHome" to="/">Cancle</Link>            
            <input type="submit" value="Submit"/>                             
          </div>
        </form>
      </div>
)}
}
export default SetPostPage;