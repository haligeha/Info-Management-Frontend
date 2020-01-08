import React, { Component, } from 'react';
import { PageTitle, } from '@src/components';
import { Timeline, message } from 'antd';
import axios from 'axios'
import moment from 'moment'
import './index.styl'

let user_id = window.sessionStorage.getItem("user_id")
let limit = 100

class OperationLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInfo: {}
    };
  }
  componentDidMount() {
    this.getLogData(limit)
    //this.windowAddMouseWheel()
  }
  getLogData = (limit) => {
    axios.get(`/api/v1/info/syslog?user_id=${user_id}&limit=${limit}&page=0`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({ logInfo: res.data })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // 防抖
  debounce = (func, wait) => {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)

      if (callNow) func.apply(context, args)
    }
  }

  windowAddMouseWheel = () => {

    var scrollFunc = function (e) {
      e = e || window.event;
      if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
          console.log("滑轮向上滚动,limit-10");
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
          console.log("滑轮向下滚动，limit+10");
          //this.debounce(this.getLogData(20), 1000)

        }
      } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向上滚动时
          console.log("滑轮向上滚动，limit+10");
        }
        if (e.detail < 0) { //当滑轮向下滚动时
          console.log("滑轮向下滚动，limit-10");
        }
      }
    };
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    //滚动滑轮触发scrollFunc方法
    window.onmousewheel = document.onmousewheel = scrollFunc;
  }


  render() {
    const { logInfo: { data } } = this.state

    return (
      <div>
        <PageTitle titles={['运营管理', '操作日志']} />
        <div className="operation-log">
          <Timeline>
            {data && data.map((item, index) => (
              <Timeline.Item color={item.action.indexOf("更新") >= 0 ? "red" : "blue"} key={index}>
                <span className="log-info">
                  <span className="log-title">
                    <img src={[require('@src/img/operating.svg')]} alt="操作" width="30" height="20" />操作：
                  </span>{item.action}
                </span>
                <span className="log-info">
                  <span className="log-title">
                    <img src={[require('@src/img/authority.svg')]} alt="权限" width="30" height="20" />操作权限：
                  </span>{item.role}
                </span>
                <span className="log-info">
                  <span className="log-title">
                    <img src={[require('@src/img/name.svg')]} alt="名称" width="30" height="20" />操作人名称：
                  </span>{item.user_name}
                </span>
                <span className="log-info">
                  <span className="log-title">
                    <img src={[require('@src/img/account.svg')]} alt="账户" width="30" height="20" />登录账户：
                  </span>{item.account}
                </span>
                <span className="log-info">
                  <img src={[require('@src/img/date.svg')]} alt="日期" width="30" height="20" />
                  {moment(item.create_Time).format('YYYY/MM/DD HH:mm:ss')}
                </span>
              </Timeline.Item>
            ))
            }
          </Timeline>
        </div>

      </div>
    );
  }
}

export default OperationLog;