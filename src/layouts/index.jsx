import React, { Component, } from 'react';
import RouteView from '../routes';
import HeaderLayout from './HeaderLayout';
import Login from './Login'
import { Layout,} from 'antd';
import './index.styl';
const { Content, } = Layout;


class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Layout className={'layout custom-layout'}>
        {/* <HeaderLayout/>
        <Content className={'content-layout'}>
          <IndexView/>
        </Content> */}
        <Login />
      </Layout>
    );
  }
}

export default Layouts;

