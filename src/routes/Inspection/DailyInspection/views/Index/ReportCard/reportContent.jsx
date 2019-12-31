import React, { Component, } from 'react';
import { Button, Icon, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '@src/modules/DailyInspection';
import EmptyReportCard from './reportEmpty'
import moment from 'moment';
import { SELECT_MAINTENANCE_COMPANY, SELECT_INSPECTION_ABNORMA_ITEM } from '../../../configs';
import './index.styl';

class ReportCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1
    };
  }
  // 维保公司-静态数据
  weiBaoCompanyName = (value) => {
    const result = SELECT_MAINTENANCE_COMPANY.filter(item => item.id === value)
    return result[0] ? result[0].name : ''
  }
  // 设备异常项-静态数据
  abnormalDevice = (value) => {
    const result = SELECT_INSPECTION_ABNORMA_ITEM.filter(item => item.id === value)
    return result[0] ? result[0].name : ''
  }
  // 巡检人
  render() {
    const { reportCardData: { data }, dutyPeople, selectedDate } = this.props
    return (
      <div className="report-card">
        <div className="report-card-header">
          <p>{selectedDate} 巡检报告</p>
          <Button className="whiteButton" value="small"><Icon type="printer" />打印</Button>
        </div>
        {data && data.map((item, index) => (
          <div key={index}>
            <div className="report-card-content">
              <div className="content-name">
                <p>值班人 ：{dutyPeople}</p>
                <p>
                  <Icon type="user" className="prople-icon" /> {item.inspection_person}
                  <Icon type="user" className="prople-icon" /> {moment(item.create_date).format('YYYY/MM/DD HH:mm:ss')}
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
                      style={{ color: (1 === item.state) ? "#ff461f" : "#52c41a" }}
                    /> {(item.state === 1) ? '异常' : '正常'}</p>
                  <p> {item.summary}</p>
                </Col>
              </Row>
            </div>
            <div className="report-card-content">
              <Row>
                <Col span={5}>
                  异常项 ：
                </Col>
                <Col span={19}>
                  {data[0] && JSON.parse(data[index].abnormal).map((item, index) => (
                    <p className="content-line" key={index}>
                      <Icon
                        type="exclamation-circle"
                        style={{ color: (1 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }}
                      /> {this.abnormalDevice(item.device)}
                      <span className="content-remark">{item.description}</span>
                    </p>
                  ))}
                </Col>
              </Row>
            </div>
            <div className="report-card-content">
              <Row>
                <Col span={5}>
                  维保信息 ：
                </Col>
                <Col span={19}>
                  <p>{this.weiBaoCompanyName(item.maintenance)}</p>
                  <p>{item.maintenanceDescription}</p>
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
    reportCardData: state.dailyInspention.reportCardData.data,
    selectedDate: state.dailyInspention.selectedDate
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(ReportCard)
// export default ReportCard

