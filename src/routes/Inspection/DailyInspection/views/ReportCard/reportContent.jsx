import React, { Component, } from 'react';
import { Button, Icon, Col, Row } from 'antd';
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
    const { cardData } = this.props
    console.log(cardData)
    return (
      <div className="report-card">
        <div className="report-card-header">
          <p>2017/12/22 巡检报告</p>
          <Button className="whiteButton" value="small"><Icon type="printer" />打印</Button>
        </div>
        <div className="report-card-content">
          <div className="content-name">
            <p>值班人 ：张三</p>
            <p><Icon type="user" className="prople-icon" /> 张三 <Icon type="user" className="prople-icon" /> 2017/02/20 10:30</p>
          </div>
          <Row>
            <Col span={5}>
              巡检总况 ：
            </Col>
            <Col span={19}>
              <p><Icon type="exclamation-circle" style={{ color: (1 === this.state.currentIndex) ? "#ff461f" : "#52c41a" }} /> 异常</p>
              <p>巡检总结内容，异常其他异常状况面熟等，讯阿金萨总结嫩容，异常其他异常状态面熟，巡检总结呢绒，异常转台那 的是的经适房了的见风使舵</p>
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
              <p>维保公司名称</p>
              <p>维保说明内容，维保说明内容，维保说明内容，维保说明内容，维保说明内容，维保说明内容，维保说明内容，维保说明内容，</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default ReportCard

