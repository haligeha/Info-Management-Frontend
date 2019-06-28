import React from 'react'
import {Button,Form,Input,Select,Icon,message} from 'antd';
import { Link } from 'react-router-dom';
import IndexView from '../../routes';
import HeaderLayout from '../HeaderLayout';
import { Layout,} from 'antd';
import './index.styl'
import axios from 'axios';
import Background from './img/1.jpg'

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
            showContent:false,
        }
    }
    login = () => {
        this.setState({showContent:true});
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const {
        form,
        history,
      } = this.props
      const { getFieldValue } = form;
      console.log(getFieldValue('username'))
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
          message.info('创建成功')
          history.push('/inspection/entrance/work')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { showContent } = this.state;
        return (
          <div className="content">
            {!showContent &&
              //   <Form className="login-form">
              //      <h1>管廊综合管理系统</h1>
              //   <FormItem>
              //     {
              //       getFieldDecorator('userName',{
              //         rules: [
              //           {
              //             required: true,
              //             message: '请填写用户名！'
              //           }
              //         ]
              //       })(
              //         <Input prefix={ 
              //           <Icon type='user' style={{color:'rgba(0,0,0,.25)'}}/>
              //         } placeholder='userName'></Input>
              //       )
              //     }
              //   </FormItem>
              //   <FormItem>
              //     {
              //       getFieldDecorator('password',{
              //         rules: [{required: true, message: "请填写密码！"}]
              //       })(
              //         <Input prefix={
              //           <Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}/> } placeholder="password"></Input>
              //       )
              //     }
              //   </FormItem>
              //   <FormItem>
              //     <Button type="primary" htmlType="submit" className={"btn"} onClick={this.login}>
              //       登录
                    
              //     </Button>
              //   </FormItem>
              // </Form>
              <div className="backgroundPic" style={sectionStyle}>
                <div className="bg1"></div>
                <Form className="login-form"
                 onSubmit={this.handleSubmit}>
                <div className="gyl">
                        管廊综合管理系统
                        
                    <div className="gy2" >打造国内最具规模的、最专业的管廊管理服务平台 </div>   
                </div>
                <div className="bg">
                  <div className="wel">用户登录</div>			
                      <div className="user">
                          <div id="yonghu">用户名</div>
                          <Form.Item
                            >
                              {getFieldDecorator('username',{
                                rules:[{
                                  required:true,
                                  message:"请输入用户名",
                                }]
                              })(
                                <Input className="inputClass" type="text"/>
                              )}  
                            </Form.Item>
                      </div>
                      <div className="password" >
                        <div id="yonghu" >密&nbsp;&nbsp;&nbsp;码</div>
                        <Form.Item
                            >
                              {getFieldDecorator('password',{
                                rules:[{
                                  required:true,
                                  message:"请输入密码",
                                }]
                              })(
                                <Input className="inputClass" type="password"/>
                              )}  
                            </Form.Item>
                      </div>
                      <div className="rem" >
                        <input type="checkbox" name="" id="" value="" />
                        <div id="reb">
                          记住密码
                        </div>
                      </div>
                      {/* <div className="fg" >
                          <div style={"font-size: 11px;margin-top: 11px;"}>
                            <a style="font-size: 11px;" href="#">忘记密码？</a>
                          </div>
                      </div> */}
                      <Button className="btn" htmlType="submit"  type="primary">登陆</Button>
                  </div>
                  </Form>
                </div>
            }
             
            {showContent &&
            <div>
                <HeaderLayout/>
                    <Content className={'content-layout'}>
                        <IndexView/>
                </Content>
            </div>
                
            }
          </div>
          
        )
      }
    
}

export default Form.create()(Login);