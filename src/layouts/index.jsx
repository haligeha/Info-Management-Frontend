import React, { Component, } from 'react';
import HeaderLayout from './HeaderLayout';
import RouteView from '../routes';
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
<<<<<<< HEAD
        {/* <HeaderLayout/>
        <Content className={'content-layout'}>
          <RouteView/>
        </Content> */}
=======
>>>>>>> b3f59ee0817d10666d290827e5493d99939a32f9
        <Login />
      </Layout>
    );
  }
}

export default Layouts;

