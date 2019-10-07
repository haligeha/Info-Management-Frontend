import React from 'react'
import {Button,Form,Input,message,Icon,Row,Col} from 'antd';
//import { Link } from 'react-router-dom';
import IndexView from '../../routes';
import LowerHeaderLayout from '../LowerHeaderLayout';
import HigherHeaderLayout from '../HigherHeaderLayout';
import { Layout,} from 'antd';
import './index.styl'
import '../../routes/Home/views/Index/index.styl'
import axios from 'axios';
import Background from './img/1.jpg'

//var user_id=window.sessionStorage.getItem("user_id")
//背景图片的填充
var sectionStyle = {
  width: "100%",
  height:"960px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background})`,

};

//const FormItem =  Form.Item;
const { Content, } = Layout;
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      token:'',
      menu:false,
      showContent:window.sessionStorage.getItem("user_id") ? true: false,
      //为了实现从首屏返回上一级
      showModule:window.sessionStorage.getItem("showModule") ? true: false,
      // showModule:false,
    }
  }
     
  //跳转到首屏
     showModule=()=>{
       this.setState({showModule:true})
       window.sessionStorage.setItem('showModule',1)
     }

    //设置状态完成跳转
    login=()=>{
      this.setState({showContent:true});    
    }

    //返回上一级
    onChangeState(stateName){
      this.setState(stateName)
      window.sessionStorage.removeItem('showModule')
    }

    //跳转一期
    jumpTo=()=>{
      //const rea=this
      const username= window.sessionStorage.getItem("username")
      const password = window.sessionStorage.getItem("password")
      console.log(username)
      window.location.href='http://39.104.84.131/secondStage?username='+username+'&password='+password
    }
    
    //登陆后，路由跳转到模块化页面
    info=()=>{    
      this.props.history.push("/home")
    }

    //跳转大数据平台
    bigData=()=>{ 
      const username= window.sessionStorage.getItem("username")
      const password = window.sessionStorage.getItem("password")
      window.open('http://39.104.84.131/jumpToBig?username='+username+'&password='+password)
    }
    //跳转3DGis平台
    gis=()=>{
      var user_id=window.sessionStorage.getItem("user_id")
      window.open('http://39.104.189.84:8800/baidu?id='+user_id)
    }
    //跳转日志平台
    log=()=>{
      window.open('http://39.104.189.84:30190/app/kibana')
    }
    //跳转统一配置
    config=()=>{
      window.open('http://39.104.189.84:30090/main.html')
    }
    kuber=()=>{
      window.open('http://39.104.189.84:30000/')
    }
    account=()=>{
      const username= window.sessionStorage.getItem("username")
      const password = window.sessionStorage.getItem("password")
      window.location.href='http://39.104.84.131/jumpToUser?username='+username+'&password='+password
    }
    //退出登录
    logout=()=>{
      sessionStorage.clear()
      window.location.reload()
    }
    //连接登陆接口并设置username,password和token的cookie
    handleSubmit = (e) => {
      e.preventDefault()
      const {
        form,
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
            message.info('登录成功')
            window.sessionStorage.setItem("username",values.username);
            window.sessionStorage.setItem("password",values.password);    
            window.sessionStorage.setItem("user_id", response.data.user_id);
            window.sessionStorage.setItem('level',response.data.authority)     
            rea.login()
          }
        })
        .catch(function (error) {
          message.info("账号或密码错误")
        });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const { showContent,showModule } = this.state;
      const condition='user_id===8'; 
      const sys=window.sessionStorage.getItem("level");
      const sysJudge=(sys==='SYS_ADMIN')?true:false;
      // const tenantJudge=(sys==='TENANT_ADMIN')?true:false;
      return (
        <div className="content">
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
                    <Form.Item >
                      {getFieldDecorator('username',{
                        rules:[{
                          required:true,
                          message:"请输入用户名",
                        }]
                      })(
                        <Input className="inputClass"
                          type="text"
                        />
                      )}  
                    </Form.Item>
                  </div>
                  <div className="password" >
                    <div id="yonghu" >密&nbsp;&nbsp;&nbsp;码&nbsp;</div>
                    <Form.Item >
                      {getFieldDecorator('password',{
                        rules:[{
                          required:true,
                          message:"请输入密码",
                        }]
                      })(
                        <Input className="inputClass"
                          type="password"
                        />
                      )}  
                    </Form.Item>
                  </div>
                  <Button className="btn"
                    htmlType="submit"
                    type="primary"
                  >登录</Button>
                </div>
              </Form>
            </div>
          }
             
          {(showContent&&!showModule&&!sysJudge) &&  
          <div className="wholehomepage" style={{height:'960px'}}>
           {/* <div className="logout"> */}
              <span className="logout" onClick={this.logout}>
                <Icon type="logout"/>退出登录
              </span>
            {/* </div> */}
            <h1 className="section-title">智慧管廊管理系统</h1>

				    <div className="border"></div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6}>
              <div className="service-box" onClick={this.jumpTo}>
                {/* <div className="service-icon "> */}
                  <div className="service-icon"><Icon type="home"/></div>
                  <div className="service-title">物管理平台</div>
                  <p className="service-desc">创建虚拟设备，与被管理的实体设备对应。实现对设备的管理与检测。</p>   
                {/* </div>  */}
              </div></Col>
            <Col span={6}>
              <div className="service-box" onClick={this.bigData}>
              <div className="service-icon"><Icon type="bar-chart"/></div>
                  <div className="service-title">数据分析平台</div>
                  <p className="service-desc">获取物联网中物与物之间的关系，通过对大量数据的分析挖掘找到相应的数据价值。</p>    
                </div>
            </Col>
            <Col span={6} >
              <div className="service-box" onClick={this.gis}>
              <div className="service-icon"><Icon type="desktop" /></div>
              <div className="service-title">3DWebGis</div>
                  <p className="service-desc">以3D模型展示方式给用户提供三维立体交互的方式来控制和查看设备</p>    
                </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
          <Col span={6}>
              <div className="service-box" onClick={this.showModule}>
              <div className="service-icon"><Icon type="info" /></div>
              <div className="service-title">信息管理平台</div>
                  <p className="service-desc">制定巡检路线并管理，提交预案申请并完成审批等。</p>    
                </div>
            </Col>    
          </Row> 
        </div>}
        {(showContent&&!showModule&&sysJudge) &&  
          <div className="wholehomepage" style={{height:'960px'}}>
           {/* <div className="logout"> */}
              <span className="logout" onClick={this.logout}>
                <Icon type="logout"/>退出登录
              </span>
            {/* </div> */}
            <h1 className="section-title">智慧管廊管理系统</h1>

				    <div className="border"></div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6}>
              <div className="service-box" onClick={this.jumpTo}>
                {/* <div className="service-icon "> */}
                  <div className="service-icon"><Icon type="home"/></div>
                  <div className="service-title">物管理平台</div>
                  <p className="service-desc">创建虚拟设备，与被管理的实体设备对应。实现对设备的管理与检测。</p>   
                {/* </div>  */}
              </div></Col>
            <Col span={6}>
              <div className="service-box" onClick={this.bigData}>
              <div className="service-icon"><Icon type="bar-chart"/></div>
                  <div className="service-title">数据分析平台</div>
                  <p className="service-desc">获取物联网中物与物之间的关系，通过对大量数据的分析挖掘找到相应的数据价值。</p>    
                </div>
            </Col>
            <Col span={6} >
              <div className="service-box" onClick={this.gis}>
              <div className="service-icon"><Icon type="desktop" /></div>
              <div className="service-title">3DWebGis</div>
                  <p className="service-desc">以3D模型展示方式给用户提供三维立体交互的方式来控制和查看设备</p>    
                </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
          <Col span={6}>
              <div className="service-box" onClick={this.showModule}>
              <div className="service-icon"><Icon type="info" /></div>
              <div className="service-title">信息管理平台</div>
                  <p className="service-desc">制定巡检路线并管理，提交预案申请并完成审批等。</p>    
                </div>
            </Col>    
            <Col span={6}>
              <div className="service-box" onClick={this.account}>
              <div className="service-icon"><Icon type="apartment" /></div>
              <div className="service-title">权限管理</div>
                  <p className="service-desc">收集多个模块的运行日志并统一管理。</p>    
                </div>
            </Col>
            <Col span={6} onClick={this.log}>
              <div className="service-box">
                <div className="service-icon"><Icon type="book" /></div>
                <div className="service-title">统一日志中心</div>
                    <p className="service-desc">收集多个模块的运行日志并统一管理。</p>    
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">        
            <Col span={6}>
              <div className="service-box" onClick={this.config}>
              <div className="service-icon"><Icon  type="setting" /></div>
              <div className="service-title">统一配置中心</div>
                  <p className="service-desc">解决多个系统配置信息统一管理困难的问题。</p>    
              </div>
            </Col>
            <Col span={6} offset={8}>
              <div className="service-box" onClick={this.kuber}>
               <div className="service-icon"><Icon type="share-alt" /></div>
               <div className="service-title">Kubernetes</div>
                  <p className="service-desc">将谷歌的集群管理工具引入到虚拟机和裸机场景</p>    
              </div>
            </Col>        
          </Row>
               
        </div>}
          {(showContent&&showModule)&&(condition?<div>                
                 <HigherHeaderLayout onClicked={this.onChangeState.bind(this)}/>
                   <Content className={'content-layout'}>
                     <IndexView/>            
                   </Content>
               </div>:<div>
                 <LowerHeaderLayout/>
                  <Content className={'content-layout'}>
                    <IndexView/>
                  </Content>
               </div>)}
           
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