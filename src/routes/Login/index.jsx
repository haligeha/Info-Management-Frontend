import React from 'react'
import {Button,Form,Input,Select,Icon} from 'antd';
import { Link } from 'react-router-dom';
const FormItem =  Form.Item;

class Login extends React.Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       user:"123",
    //       pwd:"12"
    //     };
   
    //   }
    
    login = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
            sessionStorage.setItem("isLogin","1");
                this.props.history.push('./monitor/view');
            }else {
            console.log(err);
            }
        })
    
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div className="content">
            <Form className="login-form">
              <FormItem>
                {
                  getFieldDecorator('userName',{
                    rules: [
                      {
                        required: true,
                        message: '请填写用户名！'
                      }
                    ]
                  })(
                    <Input prefix={ 
                      <Icon type='user' style={{color:'rgba(0,0,0,.25)'}}/>
                    } placeholder='userName'></Input>
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('password',{
                    rules: [{required: true, message: "请填写密码！"}]
                  })(
                    <Input prefix={
                      <Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}/> } placeholder="password"></Input>
                  )
                }
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className={"btn"} onClick={this.login}>
                  登录
                  <Link to='/monitor/gis'></Link>
                </Button>
              </FormItem>
            </Form> 
          </div>
          
        )
      }
    
}

export default Form.create()(Login);