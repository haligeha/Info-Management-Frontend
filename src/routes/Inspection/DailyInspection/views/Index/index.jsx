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
import ReportCard from './ReportCard/reportContent';
import { INSPECTION_DUTY_PEOPLE } from '../../configs';
import './index.styl'

let dateList = [];

var user_id = window.sessionStorage.getItem("user_id")
// var user_id = 1 Inspection report

class InspectionReport extends Component {
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
  //点击日期时，将该天状态存入state
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    })
    this.getListData(value._d)
  };
  //点击日期后 右侧显示具体信息
  getListData = (item) => {
    let standardDate = new Date(moment(item).format("YYYY-MM-DD")).getTime()
    let standardDateItem = moment(item).format("YYYY/MM/DD")
    let weekDay = item.getDay()
    // redux 传参需要一个对象
    const value = {}
    value.date = standardDate
    value.limit = 400
    value.page = 0
    value.user_id = user_id
    const { actions: { fetchDailyInspentionReport, fetchDutyPeople, fetchInspectionDate } } = this.props
    fetchDailyInspentionReport(value)
    fetchDutyPeople(weekDay)
    fetchInspectionDate(standardDateItem)
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
  onDutyPeople = (value) => {
    return (<div>
      <ReportCard
        dutyPeople={INSPECTION_DUTY_PEOPLE.filter(item => item.id == value)[0] ?
          INSPECTION_DUTY_PEOPLE.filter(item => item.id == value)[0].name : ''}
      />
    </div>)

  }

  render() {
    const { dutyPeople } = this.props
    return (
      <div className="inspection-report">
        <PageTitle titles={['巡检维护', '巡检报告']}>
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
          <Col span={1}>
            <Icon type="swap" className="inspection-report-contact" />
          </Col>
          <Col span={10}>
            {this.onDutyPeople(dutyPeople)}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({
    dutyPeople: state.dailyInspention.dutyPeople
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(InspectionReport)