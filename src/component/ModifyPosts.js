import React,{Component} from 'react';
import {fire,getPosts,fireStorage,setPosts,getPost} from '../Firebase';
import ReactQuill,{ Quill } from 'react-quill';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import uuid4 from 'uuid4';

const uuid = () => {
  //string 문자열 저장, 디비 인덱싱 성능 위해 토근의 배열 순서 2-1-0-3-4 순서로 수 체계 변환
  const tokens = uuid4().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
}

export{
  uuid
}
//게시물 수정 컴포넌트
export default class ModifyPosts extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: [],
            title:'',
            content:'',
            category:'',
            postKey: ''
        }
        fire();
        this.modules = {
            toolbar: {
              container : [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
  
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
  
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [ 'link', 'image', 'video', 'formula' ],          // add's image support
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
  
              ['clean']
              ],
              handlers: {
                image : this.imageHandler
              }              
            }
          }
    }

    componentDidMount(){
        let key = this.props.match.params.id;
        getPost().child(key).on('value',snapshot => {
            if( snapshot != null){

            }
            const posts = [];
            snapshot.forEach(ss => {
                posts.push(ss.val());
            });
            Object.keys(posts).map((key) => {
                    this.setState({
                        post: posts,
                        title: posts[4],
                        content: posts[1],
                        category: posts[0]
                    });                
            });
        });
    };

    imageHandler = (image, callback) => {
        //인풋 태그 동적으로 생성해서 파일 업로드하고 다운로드 url 얻어서 에디터에 삽입
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
  
        // Listen upload local image and save to server
        input.onchange = () => {
          const file = input.files[0];
  
          // file type is only image.
          if (/^image\//.test(file.type)) {
            //업로드용 파일 리더 생성
            const reader = new FileReader();
            reader.onloadend = (event) => {
              const blob = new Blob([event.target.result], {type: "image/jpeg"});
              
              const storageUrl = 'postImages/';
              const addFileName = uuid();
              const storageRef = fireStorage().ref(storageUrl + file.name + addFileName);
              const uploadTask = storageRef.put(blob);
  
              //업로드 완료 후 바로 url 다운로드하여 에디터에 url 삽입
              uploadTask.then( () => {
                //저장 된 파일에서 url 얻기 
                storageRef.getDownloadURL().then( (url) => {
                  var range = this.quillRef.getEditor().getSelection();
                  this.quillRef.getEditor().insertEmbed(range.index, 'image', url, "user");
                }).catch((error) => {
                  // Handle any errors
                  console.log("firebase storage url 다운로드 실패");
                });
              });   
            }
  
            reader.onerror = (e) => {
              console.log("failed file read : "+e.toString());
            };
  
            reader.readAsArrayBuffer(file);
  
          } else {
            console.warn('plase : image file only');
          }
        
        };
  
    }
  
  
      handleTextChange = (value) => {
        this.setState({content: value});
      }
  
      //기존 데이터 업데이트
      handleUpdate = (event) => {
          event.preventDefault();
          let key = this.props.match.params.id;
          
          const postDate = new Date();
          const y = postDate.getFullYear();
          const m = postDate.getMonth()+1;
          const d = postDate.getDate();
          const h = postDate.getHours();
          const min = postDate.getMinutes();

          if(this.min < 10){this.min += "0"+min };

          const user = firebase.auth().currentUser;
          const userEmail = user.email;
          setPosts().child(key).update({
              "content" : this.state.content,
              "title" : this.state.title,
              "userId" : userEmail,
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
  
      //enter submit 방지
      disabledEnterControl = (event) => {
        if(event.which === 13){
          event.preventDefault();
        }
      }
     
   
      //이미지 객체 클릭 이벤트 발생 시 css width 변경
      handleImageResize = (event) => {
        //
        if(event !== null){
          //
          if('IMG' == event.target.tagName){
            //
            event.target.setAttribute('draggable',true);
            event.target.addEventListener("drag",eventOption,eventOption);
            
            function eventOption(event){ 
              //
              let resize_X=event.clientX;
              let resize_Y=event.clientY;
              if(resize_X !== 0 && resize_Y !== 0){
                //
                event.target.style.width=resize_X + 'px';
                event.target.style.height=resize_Y + 'px';
              }
            }
          }else{
            console.log("리사이즈 실패");
          }            
        }   
      }

    render(){
        const { post,title,content,category } = this.state;
        return(
            <div className="newPostContainer">
                <div id="newPost">새로운 글 작성</div>
                <form onSubmit={this.handleUpdate} onKeyPress={this.disabledEnterControl} >
                <div className="row">
                    <div className="col-25">
                    <label>제목</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="title" name="firstname" placeholder="제목을 입력해주세요." value={title} onChange={(e) => this.setState({title:e.target.value})}/>
                    </div>
                </div>         
                <div className="row">
                    <div className="col-25">
                    <label>카테고리</label>
                    </div>            
                    <div className="col-75">
                    <select id="category" name="category" value={category} onChange={(e) => this.setState({category:e.target.value})} >
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
                    <div id="editor" className="editor" onDragStart={this.handleImageResize}>
                    <ReactQuill 
                    ref={(el) => this.quillRef = el}
                    value={content}
                    onChange={this.handleTextChange}
                    modules={this.modules}
                    placeholder="내용을 입력해주세요."
                    />
                    </div>
                    
                    </div>
                </div>
                <div className="row">
                    <Link className="returnHome" to="/">Cancle</Link>            
                    <input type="submit" value="Submit"/>                             
                </div>
                </form>
            </div>
        )
    }
}