import { Layout, Menu, Breadcrumb, Icon,} from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, {Component} from 'react';
import '../style/miniDrawer.css'
import BlogMain from '../component/BlogMain'; 
import PostShow from '../component/PostShow';
import Me from '../component/Me';
import SetPostPage from '../component/SetPostPage';
import LoginForm from '../component/login';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import ModifyPosts from '../component/ModifyPosts';


const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;


class SiderDemo extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail : false,
      collapsed : true,
    };
    this.logoutHandler = this.logoutHandler.bind(this);
  };
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          userEmail : true
        })
      }else{
        this.setState({
          userEmail : false,
        })
      }
    })
  };
 
  logoutHandler = () => {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      console.log("logout error");
    });
    
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    const {userEmail} = this.state;
    return ( 
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
          <Menu.Item key="home">
              <Icon type="home" />
              <span><Link to={"/"} style={{color : '#FFFFFF'}}>Home.</Link></span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="user" />
              <span><Link to="/me" style={{color:'#FFFFFF'}}>About.</Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="desktop" /><span>포스팅.</span></span>}
            >
              <Menu.Item key="2">프로그래밍</Menu.Item>
              <Menu.Item key="3">잡담</Menu.Item>
              <Menu.Item key="4">온갖리뷰</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background:'#f0f2f5', padding: 0,textAlign:"center"}}><font style={{color:'#404040'}}>kortlog.</font></Header>
          <div className="newpostbutton">
            { userEmail  !=  false && 
              <Link to="/SetPostPage" style={{color: 'rgba(0, 0, 0, 0.15)'}}>새글</Link>
            }           
          </div>
          <div className="logoutbutton">
            { userEmail == false && 
              <LoginForm/>
            }
          </div>
          <div className="logoutbutton">
            { userEmail != false && 
              <Link to="/" onClick={this.logoutHandler} style={{color: 'rgba(0, 0, 0, 0.15)'}}>logout</Link>
            }
          </div>
          <Content style={{ margin: '0 16px' }}>

              <Route exact path="/" component={ BlogMain } />
              <Route path="/posts/:id" component={PostShow}/>
              <Route path="/me" component={ Me } />
              <Route path="/SetPostPage" component={ SetPostPage } />
              <Route path="/modifyPosts/:id" component={ModifyPosts}/>

          </Content>
          <Footer style={{ textAlign: 'center' }}>
            kortlog.com ©2018 Development by kort.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;