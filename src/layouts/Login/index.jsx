import React from 'react'
import {Button,Form,Input,Select,Icon,message,Row,Col} from 'antd';
import { Link } from 'react-router-dom';
import IndexView from '../../routes';
// import SceneView from '../../routes/Monitor/Scene';
import LowerHeaderLayout from '../LowerHeaderLayout';
import HigherHeaderLayout from '../HigherHeaderLayout';
import { Layout,} from 'antd';
import './index.styl'
import '../../routes/Home/views/Index/index.styl'
import axios from 'axios';
import Background from './img/1.jpg'

var user_id=window.sessionStorage.getItem("user_id")
//背景图片的填充
var sectionStyle = {
  width: "100%",
  height:"700px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background})`,

};

const FormItem =  Form.Item;
const { Content, } = Layout;
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      token:'',
      showContent:window.sessionStorage.getItem("user_id") ? true: false,
    }
  }
  
     
    //设置状态完成跳转
    login=()=>{
      this.setState({showContent:true});    
    }

    //子组件设置父组件状态
    Logout=()=>{
      // this.setState({
      //   showContent:false
      // })
      const {
        history,
      } = this.props
      sessionStorage.clear();       
      window.location.href="http://localhost:3003" 
   //   history.push('/')
    }

    info=()=>{  
      console.log("home")   
      this.props.history.push("/home")
    }

    //连接登陆接口并设置username,password和token的cookie
    handleSubmit = (e) => {
      e.preventDefault()
      const {
        form,
        token,
      } = this.props
      const rea=this
      const { getFieldValue } = form;
      const values = form.getFieldsValue()
      if(!getFieldValue('username')){
        message.error('请输入用户名')
      }
      if(!getFieldValue('password')){
        message.error('请输入密码')
      }
    
      axios.post('/api/v1/user/login', values)
        .then(function (response) {
          if(response.status === 200){
            message.info('登陆成功')
            window.sessionStorage.setItem("username",values.username);
            window.sessionStorage.setItem("password",values.password);    
            window.sessionStorage.setItem("user_id", response.data.user_id);          
            rea.login()
          }
        })
        .catch(function (error) {
          message.info("账号或密码错误")
        });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const { showContent } = this.state;
       const condition='user_id===8';
      return (
        <div className="content">
           {/* <div className="backgroundPic" style={sectionStyle}>
              <div className="bg1"></div>
              <Form className="login-form"
                onSubmit={this.handleSubmit}
              >
                <div className="gyl">
                        智慧管廊管理系统
                        
                  <div className="gy2" >打造国内最具规模的、最专业的管廊管理服务平台 </div>   
                </div>
                <div className="bg">
                  <div className="wel">用户登录</div>			
                  <div className="user">
                    <div id="yonghu">用户名&nbsp;</div>
                    <Form.Item
                    >
                      {getFieldDecorator('username',{
                        rules:[{
                          required:true,
                          message:"请输入用户名",
                        }]
                      })(
                        <Input className="inputClass"
                          type="text"/>
                      )}  
                    </Form.Item>
                  </div>
                  <div className="password" >
                    <div id="yonghu" >密&nbsp;&nbsp;&nbsp;码&nbsp;</div>
                    <Form.Item
                    >
                      {getFieldDecorator('password',{
                        rules:[{
                          required:true,
                          message:"请输入密码",
                        }]
                      })(
                        <Input className="inputClass"
                          type="password"/>
                      )}  
                    </Form.Item>
                  </div>
                  <Button className="btn"
                    htmlType="submit"
                    type="primary">登陆</Button>
                </div>
              </Form>
            </div> */}
          {!showContent &&
            <div className="backgroundPic" style={sectionStyle}>
              <div className="bg1"></div>
              <Form className="login-form"
                onSubmit={this.handleSubmit}
              >
                <div className="gyl">
                        智慧管廊管理系统
                        
                  <div className="gy2" >打造国内最具规模的、最专业的管廊管理服务平台 </div>   
                </div>
                <div className="bg">
                  <div className="wel">用户登录</div>			
                  <div className="user">
                    <div id="yonghu">用户名&nbsp;</div>
                    <Form.Item
                    >
                      {getFieldDecorator('username',{
                        rules:[{
                          required:true,
                          message:"请输入用户名",
                        }]
                      })(
                        <Input className="inputClass"
                          type="text"/>
                      )}  
                    </Form.Item>
                  </div>
                  <div className="password" >
                    <div id="yonghu" >密&nbsp;&nbsp;&nbsp;码&nbsp;</div>
                    <Form.Item
                    >
                      {getFieldDecorator('password',{
                        rules:[{
                          required:true,
                          message:"请输入密码",
                        }]
                      })(
                        <Input className="inputClass"
                          type="password"/>
                      )}  
                    </Form.Item>
                  </div>
                  <Button className="btn"
                    htmlType="submit"
                    type="primary">登陆</Button>
                </div>
              </Form>
            </div>
          }
             
          {showContent &&   
              (condition?<div>
                <HigherHeaderLayout/>
                <Content className={'content-layout'}>
                      <IndexView/>              
                </Content>
                 </div>:<div>
                <LowerHeaderLayout/>
                  <Content className={'content-layout'}>
                    <IndexView/>
                </Content>
              </div>)
          }
             {/* <div>
                 <HeaderLayout/>
                     <Content className={'content-layout'}>
                         <IndexView/>
                 </Content>
             </div> */}  
        </div>
          
      );
    }
  
}


export default Form.create()(Login);