import React, { Component, } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Icon, Dropdown, Avatar, } from 'antd';


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
  
  
  //设置cookie
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  
  componentDidMount(){
    this.setCookie("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjIsInVzZXJfaWQiOjMsInVzZXJfbmFtZSI6Iuenn-aIt-euoeeQhuWRmCIsInBlcm1pc3Npb25zIjpbImdldENyZWRlbnRpYWxzQnlJZCIsImluc2VydERhc2hib2FyZCIsImdldE1vZGVscyIsImdldFVzZXJCeVRlbmFudElkIiwiY3JlYXRlQ3VzdG9tZXJVc2VyIiwiZ2V0RGV2aWNlc0J5VGVuYW50SWRBbmRTaXRlSWQiLCJhY3RpdmF0ZURldmljZXMiLCJnZXRNYW51ZmFjdHVyZXJzIiwidXBkYXRlRGV2aWNlU2l0ZUlkIiwidW5hc3NpZ25DdXN0b21lckRldmljZXMiLCJzYXZlQWJpbGl0eUdyb3VwIiwiZ2V0RXZlbnRCeUlkIiwiZmluZEFiaWxpdGllc0J5TW9kZWxJZCIsImdldEVudGl0eUJ5SWQiLCJzdXNwZW5kUnVsZSIsImFzc2lnbkRldmljZVRvU2l0ZSIsImdldEN1c3RvbWVyVXNlcnMiLCJnZXRFbnRpdHlCeVR5cGUiLCJmaW5kQWJpbGl0aWVzQnlUaHJlZVRvdXBsZSIsImdldFRlbmFudERldmljZXNDb3VudEJ5VGV4dFNlYXJjaCIsImdldERldmljZXNCeVNlcnZpY2UiLCJyZW1vdmVBbGxEYXNoYm9hcmQiLCJnZXRBdHRyaWJ1dGVzIiwic2F2ZUdyb3VwIiwiZGVsZXRlRGV2aWNlIiwiZ2V0RGV2aWNlc0J5R3JvdXBJZCIsInJlbW92ZUFsbEVudGl0eSIsImdldEFsbEFiaWxpdHlHcm91cHMiLCJnZXRBbGxEZXZpY2VUeXBlIiwiZ2V0VGVuYW50QnlJZCIsImdldERldmljZXNCeVBhcmVudERldmljZUlkIiwidXBkYXRlRW50aXR5IiwiYWRkUnVsZSIsImdldFJ1bGVCeVRlbmFudElkQW5kVGV4dCIsImNyZWF0ZUNyZWRlbnRpYWxzIiwidXBkYXRlQ3VzdG9tZXIiLCJkZWxldGVVc2VyIiwiZ2V0R3JvdXBzQnlUZW5hbnRJZCIsInVwZGF0ZUNyZWRlbnRpYWxzIiwiZ2V0RGV2aWNlQnlUZW5hbnRJZEFuZE5hbWUiLCJkZWxldGVDcmVkZW50aWFscyIsImRlbGV0ZUFiaWxpdHkiLCJhc3NpZ25EZXZpY2VUb0dyb3VwIiwiZ2V0VXNlckJ5SWQiLCJnZXRQbHVnaW5TdGF0ZSIsImdldERldmljZXNCeVRlbmFudElkQW5kQ3VzdG9tZXJJZCIsImFjdGl2YXRlUnVsZSIsImluc2VydEVudGl0eSIsImdldERhc2hib2FyZHMiLCJnZXRSdWxlQnlUZW5hbnRJZCIsImdldERldmljZVN0YXR1cyIsInNhdmVEZXZpY2VUeXBlIiwiZ2V0RGV2aWNlVHlwZXMiLCJwbHVnaW5NZXRyaWNzIiwiZmluZEFsbEtleXMiLCJ1bmFzc2lnbkRldmljZXNGcm9tR3JvdXAiLCJnZXRBbGxFbnRpdHkiLCJnZXRsYXRlc3REYXRhIiwiZ2V0Q3VzdG9tZXJCeUlkIiwiZGVsZXRlRGV2aWNlVHlwZSIsImdldEFsbERhdGEiLCJnZXRBbGxBdHRyaWJ1dGVzIiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlUnVsZSIsImRlbGV0ZUdyb3VwIiwiZ2V0QVJ1bGUiLCJyZW1vdmVBbGxBdHRyaWJ1dGVzIiwiZ2V0RGV2aWNlcyIsImFzc2lnbkRldmljZVRvQ3VzdG9tZXIiLCJnZXRBbGxQbHVnaW5zIiwiZ2V0Q3VzdG9tZXJzIiwiY3JlYXRlQ3VzdG9tZXIiLCJzdXNwZW5kRGV2aWNlcyIsImZpbmRDdXN0b21lck5hbWUiLCJ1bmFzc2lnbkRldmljZUJ5R3JvdXBJZCIsInNhdmVEZXZpY2UiLCJ1cGRhdGVVc2VyIiwiZGVsZXRlQ3VzdG9tZXIiLCJ1bmFzc2lnbkRldmljZUZyb21DdXN0b21lciIsInNlbmRScGNDb21tYW5kVG9EZXZpY2UiLCJyZW1vdmVEYXNoYm9hcmRCeUlkIiwicmVtb3ZlRW50aXR5Iiwic2F2ZUFiaWxpdHkiLCJwbHVnaW5SUENVcmxzIiwiZ2V0Q3JlZGVudGlhbHNCeVRva2VuIiwiZ2V0RGV2aWNlQnlJZCIsImRlbGV0ZUFiaWxpdHlHcm91cCIsImdldEFsbEVudGl0eUJ5RGFzaGJvYXJkSWQiLCJnZXREYXNoYm9hcmRCeUlkIl0sInNjb3BlIjpbInNlbGVjdCJdLCJhdXRob3JpdHkiOiJURU5BTlRfQURNSU4iLCJleHAiOjE1NjIxMjYwMzMsImN1c3RvbWVyX2lkIjoxLCJhdXRob3JpdGllcyI6WyJURU5BTlRfQURNSU4iXSwianRpIjoiOGI1MTA1YTYtYzA0Ni00YmZmLTg5NTEtOTJhODQ4YjFlNjFmIiwiaXNzdWVyIjoiYnVwdC5lZHUuY24iLCJjbGllbnRfaWQiOiJjbGllbnRfMiJ9.sMX_3WLjSrPP650T-15_81ZclZTEelP8z5DTdrBj1xA",7000)
    this.setCookie("tenant_id",2,7000)
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
            <Menu.Item key="5"><a href="https://10.112.217.199" target="_blank"></a>视频通话</Menu.Item>
            <Menu.Item key="6"><a href="http://39.104.84.131/bigData/device1.html?id=1" target="_blank"></a>大数据平台</Menu.Item>
            <Menu.Item key="7"><a href="http://39.104.84.131/thingsTenantManager#/homePage" target="_blank"></a>物管理平台</Menu.Item>
          </SubMenu>
        </Menu>
       
      </Header>
    );
  }
}

export default HeaderLayout;

