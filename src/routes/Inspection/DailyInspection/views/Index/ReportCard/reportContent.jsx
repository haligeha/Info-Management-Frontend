import React, { Component, } from 'react';
import { Button, Icon, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '@src/modules/DailyInspection';
import EmptyReportCard from './reportEmpty'
import moment from 'moment';
import './index.styl';

class ReportCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1
    };
  }
  componentDidMount() { }

  render() {
    const { reportCardData: { data } } = this.props
    console.log("右侧巡检报告")
    console.log(data)
    return (
      <div className="report-card">
        {data && data.map((item, index) => (
          <div key={index}>
            <div className="report-card-header">
              <p>{moment(item.create_date * 1000).format('YYYY/MM/DD')} 巡检报告</p>
              <Button className="whiteButton" value="small"><Icon type="printer" />打印</Button>
            </div>
            <div className="report-card-content">
              <div className="content-name">
                <p>值班人 ：{item.duty_person}</p>
                <p>
                  <Icon type="user" className="prople-icon" /> {item.inspection_person}
                  <Icon type="user" className="prople-icon" /> {moment(item.calendar_date * 1000).format('YYYY/MM/DD HH:mm:ss')}
                </p>
              </div>
              <Row>
                <Col span={5}>
                  巡检总况 ：
                </Col>
                <Col span={19}>
                  <p>
                    <Icon
                      type="exclamation-circle"
                      style={{ color: (1 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }}
                    /> {item.state}</p>
                  <p>{item.summary}</p>
                </Col>
              </Row>
            </div>
            <div className="report-card-content">
              <Row>
                <Col span={5}>
                  异常项 ：
                </Col>
                <Col span={19}>
                  <p className="content-line">
                    <Icon
                      type="exclamation-circle"
                      style={{ color: (1 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }}
                    /> 地下综合管廊-1号防火区
                    <span className="content-remark"> 平均温度：25*C（舒适）；平均温度：50（较干燥）</span>
                  </p>
                  <p className="content-line"><Icon type="exclamation-circle" style={{ color: (2 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }} /> 地下电缆仓-接地箱</p>
                  <p className="content-line"><Icon type="exclamation-circle" style={{ color: (2 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }} /> 地下电缆仓-接地箱</p>
                  <p className="content-line"><Icon type="exclamation-circle" style={{ color: (1 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }} /> 德胜路地下综合管廊-1号防火区</p>
                </Col>
              </Row>
            </div>
            <div className="report-card-content">
              <Row>
                <Col span={5}>
                  维保信息 ：
                </Col>
                <Col span={19}>
                  <p>{item.maintenance}</p>
                  <p>我是对维保公司的说明，目前还没这个字段（maintenanceCompany）</p>
                </Col>
              </Row>
            </div>
          </div>
        ))

        }
        {!data &&
          <EmptyReportCard />
        }

      </div>
    );
  }
}
export default connect(
  state => ({
    reportCardData: state.dailyInspention.reportCardData.data
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(ReportCard)
// export default ReportCard

