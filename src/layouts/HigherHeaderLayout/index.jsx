import React, { Component, } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Icon, Dropdown, Avatar,Modal } from 'antd';
import axios from 'axios';

const { Header,} = Layout;
const { SubMenu } = Menu; 
class HeaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meuList:[
        {
          id:'1',
          name:"监测预警",
          url:'/monitor',
          children:[
            {
              id:'11',
              name:'首页展示',
              url:'/'
            },{
              id:'12',
              name:"实时监控",
              url:'/monitor/video'
            },
            {
              id:'13',
              name:'GIS地图',
              url:'/monitor/gis'
            },
            {
              id:'14',
              name:'设备信息',
              url:'/monitor/device'
            }
          ]
        },
        {
          id:'2',
          name:"巡检维护",
          url:'/inspection',
          children:[
            {
              id:'21',
              name:'巡检计划',
              url:'/inspection/plan'
            },
            {
              id:'22',
              name:'巡检人员信息',
              url:'/inspection/employee'
            },
            {
              id:'23',
              name:'日常/年度巡检',
              url:'/inspection/calendar'
            },
            {
              id:'24',
              name:'巡检路线管理',
              url:'/inspection/pathway'
            }
            
          ]
        },
        {
          id:'3',
          name:"应急指挥",
          url:'/emergency',
          children:[
            {
              id:'31',
              name:"告警处理",
              url:'/emergency/alarm'
            },
            {
              id:'32',
              name:'应急资源',
              url:'/emergency/resource/material'
            },
            {
              id:'33',
              name:'应急预案',
              url:'/emergency/plan'
            },
            
            {
              id:'34',
              name:'预案审批',
              url:'/emergency/approval'
            },
          ]
        },
        {
          id:'4',
          name:"入廊作业",
          url:'/entrance',
          children:[
            {
              id:'41',
              name:'入廊作业',
              url:'/entrance/work'
            },
            {
              id:'42',
              name:'作业审批',
              url:'/entrance/work'
            },
          ]
        }, {
          id:'5',
          name:"运营管理",
          url:'/pipe',
          children:[
            {
              id:'51',
              name:'管廊信息',
              url:'/pipe/management'
            },
            {
              id:'52',
              name:'管廊区域信息',
              url:'/pipe/area'
            },
            // {
            //   id:'53',
            //   name:'设备管理',
            //   url:'/pipe/area'
            // },
            {
              id:'54',
              name:'用户操作日志',
              url:'/pipe/area'
            },
          ]
        }
      ],
      modalVisible:false,
    };
  }
  
  componentDidMount(){
   
  }

  // handleOk=()=>{      
  //   // var session=this.getCookie("JSESSIONID")
  //   // console.log("123")
  //   // console.log("session")
  //   window.location.href = "http://10.112.175.8/home";
  //   this.state.modalVisible=false;
  // }
  jumpTo=()=>{
    const rea=this
    const username= window.sessionStorage.getItem("username")
    const password = window.sessionStorage.getItem("password")
    console.log(username)
    // axios.post('/api/v1/auto/devicemanagement', {username:username,password:password})
     window.location.href='http://39.104.84.131:80/secondStage?username='+username+'&password='+password
    // window.location.href="http://localhost:80/fromSecondStage?username="+username+'&password='+password
  }

  //设置cookie
  setCookie=(cname, cvalue, exdays)=> {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  //获取cookie
    getCookie(cname){
      var name = cname + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1){
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  //退出登录
  handleExit=()=>{
    console.log(window.sessionStorage.getItem('username'))
    sessionStorage.clear()
    window.location.href="http://localhost:3003"
  };

  render() {
    const menu = (
      <Menu className={'menu'}>
        <Menu.Item key="logout">
          <Icon type="logout" onClick={this.handleExit} 
          // onClick={()=>this.props.onClick({showContent:false})}
          />退出登录
        </Menu.Item>
      </Menu>
    );
  
    return (
      <Header className="custom-header">
        <Link to="/"><div className={'logo'}>信息管理系统</div></Link>
        <div className={'userInfo'}>
          <Dropdown overlay={menu}
            placement="bottomRight"
          >
            <span>
              <Avatar className={'avatar-custom'}>
                <Icon type="user"
                  style={{ fontSize: '18px', }}
                />
              </Avatar>
              <span style={{ color: 'white', }}>{window.sessionStorage.getItem("username")}</span>
            </span>
          </Dropdown>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.currentTabId,]}
        >
          {this.state.meuList && this.state.meuList.map((subMenu) =>{
            return(
              <Menu.SubMenu
                className="custom-sub-menu"
                key={subMenu.id}
                title={<span>{subMenu.name}</span>}
              >
                {subMenu.children && subMenu.children.map(item =>
                  <Menu.Item key={item.id}>
                    <Link to={item.url}>{item.name}</Link>
                  </Menu.Item>
                )
                }
              </Menu.SubMenu>
            );

          })
          }
          {/*为实现向外部跳转，单独罗列出的导航部分 */}
            <SubMenu
            key="sub1"
            className="custom-sub-menu"
            title={
              <span>
                <span>更多</span>
              </span>
            }
          >
            <Menu.Item key="5"><a href="https://10.112.217.199" target="_blank" ></a>视频通话</Menu.Item>
            <Menu.Item key="6"><a href="http://39.104.84.131/bigData/device1.html?id=1" target="_blank" ></a>大数据平台</Menu.Item>
            <Menu.Item key="7" > <p onClick={this.jumpTo}> 物管理平台</p>
             {/* <a href="http://39.104.84.131"></a> */}
            </Menu.Item>
          </SubMenu>
        </Menu>
        {/* <Modal
          title=" "
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>确认打开三化平台？</p>
        </Modal> */}
      </Header>
    );
  }
}

export default HeaderLayout;