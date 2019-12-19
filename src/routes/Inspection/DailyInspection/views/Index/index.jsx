import React, { Component, } from 'react';
import { PageTitle } from '@src/components';
import { Button, Calendar, LocaleProvider, Badge, Icon, Row, Col } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '@src/modules/DailyInspection';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import ReportCard from '../ReportCard/reportContent'
import EmptyReportCard from '../ReportCard/reportEmpty'
import './index.styl'

let dateList = [];
let reportList = []
var user_id = window.sessionStorage.getItem("user_id")
// var user_id = 1
class DailyInspection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
      data: [],
      report: [],
      reportShow: '',
    };
    this.getAllReport = this.getAllReport.bind(this);
  }

  componentDidMount() {
    this.getAllReport();
  }

  //获取全部巡检信息
  getAllReport = () => {
    axios.get(`/api/v1/info/allReport?user_id=${user_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({
            data: res.data,
          });
          this.getData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //在有事件发生的日期上添加标识
  dateCellRender = (value) => {
    for (let m = 0; m < dateList.length; m++) {
      if (this.getdate(value) === dateList[m]) {
        return (
          <Badge dot>
            <Icon type="notification" />
          </Badge>
        )
      }
    }
  }

  //获取日期数组
  getData = () => {
    const { data } = this.state
    const DateList = []
    let calen = '';
    for (var i = 0; i < data.length; i++) {
      calen = this.timestampToTime(data[i].calendar_date)
      DateList.push(calen);
      dateList = this.unique(DateList)
    }
  }
  //数组去重
  unique = (arr) => {
    return Array.from(new Set(arr))
  }

  //点击日期时，将该天状态存入state
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    }, () => {
      this.getListData()
    });

  };

  //点击日期后 右侧显示具体信息
  getListData = () => {
    const { selectedValue } = this.state;
    const select = this.getdate(selectedValue) + " 0:0:0"
    const selected = Math.round(new Date(select).getTime() / 1000).toString()
    // redux 传参需要一个对象
    const value = {}
    value.date = selected
    value.limit = 4
    value.page = 0
    value.user_id = user_id
    const { actions: { fetchDailyInspentionReport } } = this.props
    fetchDailyInspentionReport(value)

    axios.get(`/api/v1/info/inspectionReportByPage?date=${selected}&limit=4&page=0&user_id=${user_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          console.log(res.data.data + '组件中内容')
          reportList = []
          for (var i = 0; i < res.data.data.length; i++) {
            let reportone = res.data.data[i]
            reportList.push(reportone)
          }
          this.setState({ report: reportList })

        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getdate = (value) => {
    var now = new Date(value),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
  }

  //数据库中日期格式转换
  timestampToTime = (timestamp) => {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return Y + M + D;
  }

  insertReport = () => {
    const { report } = this.state
    for (var i = 0; i < report.length; i++) {
      console.log(i)
      return (<div>123</div>)
    }
  }

  render() {
    const { reportCardData } = this.props
    console.log(reportCardData)
    const { report } = this.state
    const elements = [];
    report.forEach((item) => {
      elements.push(
        <div className="report">
          巡检时间：{this.timestampToTime(item.calendar_date)}&nbsp;
          巡检人员：{item.inspection_person}<br />
          负责人：{item.duty_person}&nbsp;
          创建时间：{item.create_date}<br />
          巡检状态：{item.state}&nbsp;
          异常项：{item.abnormal}<br />
          维修公司：{item.maintenance}&nbsp;
          图像：{item.image}<br />
          视频：{item.video}&nbsp;
          总结：{item.summary}<br />
        </div>
      )
    });
    return (
      <div>
        <PageTitle titles={['巡检维护', '日常/年度巡检']}>
          {
            <Link to={"/inspection/calendar/new"}>
              <Button type="primary">+ 新建日常巡检</Button>
            </Link>
          }
        </PageTitle>
        <Row>
          <Col span={13}>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, }}>
              <LocaleProvider locale={zh_CN}>
                <Calendar
                  onSelect={this.onSelect}
                  dateCellRender={this.dateCellRender}
                />
              </LocaleProvider>
            </div>
          </Col>
          <Col span={10} offset={1}>
            <ReportCard cardData={reportCardData.data} />
          </Col>
        </Row>


        {/* <div style={{ width: 500, height: 320, border: '1px solid #d9d9d9', borderRadius: 4, float: "right", "overflow-y": "scroll" }}>
          {elements}
        </div> */}
      </div>
    )
  }

}

export default connect(
  state => ({
    reportCardData: state.dailyInspention.reportCardData
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(DailyInspection)







//   render() {
//     const { report } = this.state
//     const elements = [];
//     report.forEach((item) => {
//       elements.push(
//         <div className="report">
//           巡检时间：{this.timestampToTime(item.calendar_date)}&nbsp;
//           巡检人员：{item.inspection_person}<br />
//           负责人：{item.duty_person}&nbsp;
//           创建时间：{item.create_date}<br />
//           巡检状态：{item.state}&nbsp;
//           异常项：{item.abnormal}<br />
//           维修公司：{item.maintenance}&nbsp;
//           图像：{item.image}<br />
//           视频：{item.video}&nbsp;
//           总结：{item.summary}<br />
//         </div>
//       )
//     });
//     return (
//       <div>
//         <PageTitle titles={['巡检维护', '日常/年度巡检']}>
//           {
//             <Link to={"/inspection/calendar/new"}>
//               <Button type="primary">+ 新建日常巡检</Button>
//             </Link>
//           }
//         </PageTitle>
//         <div style={{ width: 700, border: '1px solid #d9d9d9', borderRadius: 4, float: "left" }}>
//           <LocaleProvider locale={zh_CN}>
//             <Calendar
//               onSelect={this.onSelect}
//               dateCellRender={this.dateCellRender}
//             />
//           </LocaleProvider>

//         </div>

//         <div style={{ width: 500, height: 320, border: '1px solid #d9d9d9', borderRadius: 4, float: "right", "overflow-y": "scroll" }}>
//           {elements}
//         </div>
//       </div>
//     )
//   }

// }
