import { Form, Icon, Input, Button } from 'antd';
import React,{Component} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';


  class LoginForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        userId : '',
        userPw : '',
        error : null,
      }
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
      this.props.form.validateFields();
      this.props.form.setFieldsValue();
      
    }


  
    handleSubmit = (e) => {
      // var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // var uiConfig = {
      //   signInOptions: [
      //   ]
      // }
      //
      var userId = this.state.userId;
      var userPw = this.state.userPw;
      firebase.auth().signInWithEmailAndPassword(userId, userPw).then(function(){
        //
      }).catch(function(error) { 
          console.error('이메일 로그인 과정 에러', error);
          switch(error.code){ 
          case "auth/invalid-email": alert('잘못 된 이메일입니다'); 
          break; 
          case "auth/user-disabled": alert('사용 정지된 이메일 입니다.'); 
          break; 
          case "auth/user-not-found": alert('등록되지 않은 이메일 입니다.'); 
          break; 
          case "auth/wrong-password": alert("패스워드를 확인하여 주세요.");
          break; 
        }
      });
      e.preventDefault();
    }
  
    render() {
      const {userId, userPw} = this.state;
      return (
        <Form layout="inline" >
          <Form.Item >          
              <Input id="userId" name="userId" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={userId} onChange={(e) => this.setState({userId:e.target.value})} placeholder="Username" />
          </Form.Item>
          <Form.Item>           
              <Input id="userPw" name="userPw" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" value={userPw} onChange={(e) => this.setState({userPw:e.target.value})} placeholder="Password" />           
          </Form.Item>
          <Form.Item>
            <Button type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}>
              Login
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm);

  export default WrappedHorizontalLoginForm;
