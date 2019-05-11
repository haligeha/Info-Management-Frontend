import React, { Component, } from 'react';
import { PageTitle } from '../../../../../components';
import { Row,Col } from 'antd';
import TitleNav from './TitleNav';
import BasicInfo from './BasicInfo'
import './index.styl';

class EntranceWorkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div className="entrance-work-detail-page">
        <PageTitle titles={['巡检维护','入廊作业','详情']} />
        <section className="basic-info-container">
          <TitleNav title="基本信息"></TitleNav>
          <Row>
            <Col>
              <BasicInfo />
            </Col>
          </Row>
        </section>
      </div>

    );
  }
}

export default EntranceWorkDetail;

