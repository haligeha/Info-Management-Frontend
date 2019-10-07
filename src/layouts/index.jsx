import React, { Component, } from 'react';
//import HeaderLayout from './HeaderLayout';
import IndexView from '../routes';
import Login from './Login'
import { Layout,} from 'antd';
import './index.styl';
import HigherHeaderLayout from './HigherHeaderLayout';
//const { Content, } = Layout;


class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Layout className={'layout custom-layout'}>
       <Login/>
      </Layout>
    );
  }
}

export default Layouts;

