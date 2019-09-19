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
  // componentDidMount(){
  //   var url = window.location.href; 
  //   var theRequest = new Object();  
  //   var str = url.substr(1);  //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
  //   var strs = str.split("&");  //截除“&”生成一个数组
  //   window.sessionStorage.setItem('username',strs[0])
  //   window.sessionStorage.setItem('user_id',strs[1]) 
  // }
  render() {
    return (
      <Layout className={'layout custom-layout'}>
       <Login/>
      </Layout>
    );
  }
}

export default Layouts;

