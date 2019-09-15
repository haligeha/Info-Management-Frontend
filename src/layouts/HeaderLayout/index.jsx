import React, { Component, } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Icon, Dropdown, Avatar, } from 'antd';


const { Header,} = Layout;
//const { SubMenu } = Menu; 

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
              url:'/monitor/view'
            },
            {
              id:'12',
              name:'GIS地图',
              url:'/monitor/gis'
            },
            {
              id:'13',
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
            }, 
            {
              id:'25',
              name:'开始巡检',
              url:'/inspection/report'
            },
            
          ]
        },
        {
          id:'3',
          name:"应急指挥",
          url:'/emergency',
          children:[
            {
              id:'31',
              name:'应急预案',
              url:'/emergency/plan'
            },
            {
              id:'32',
              name:'应急资源',
              url:'/emergency/resource/material'
            },
            {
              id:'33',
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
              url:'/entrance/approval'
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
      ]
    };
  }
  
  componentDidMount(){
   
  }

  render() {
    const menu = (
      <Menu className={'menu'}>
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
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
              <span style={{ color: 'white', }}>刘苗苗</span>
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
        </Menu>
       
      </Header>
    );
  }
}

export default HeaderLayout;