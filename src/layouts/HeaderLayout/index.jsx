import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import { Menu, Layout, Icon, Dropdown, Avatar, } from 'antd';
const { Header,} = Layout;

class HeaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          id:'1',
          name:'场景汇报',
          url:'/infomation/report',
        },
        {
          id:'2',
          name:'应急预案',
          url:'/infomation/plan',
        },
        {
          id:'3',
          name:'入廊作业',
          url:'/infomation/work',
        },
      ],
    };
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

        </Menu>
      </Header>
    );
  }
}

export default HeaderLayout;

