import React, { Component, } from 'react';
import { PageTitle } from '../../../../../components';
import { Row,Col } from 'antd';
import TitleNav from './TitleNav';
import BasicInfo from './BasicInfo';
import axios from 'axios';
import './index.styl';
//import { resolveModuleName } from '_typescript@2.9.2@typescript';
const user_id = window.sessionStorage.getItem("user_id");
class EntranceWorkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entranceDetail:[]
    };
  }
  componentDidMount(){
    const {
      match : { params : { id } } 
    }= this.props
    axios.get(`/api/v1/info/entranceWorkById?entranceId=${id}&user_id=${user_id}`)
      .then((res) => {
        const arr = []
        arr.push(res.data)
        this.setState({entranceDetail:arr})
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  render() {
    const {entranceDetail} = this.state
    return (
      <div className="entrance-work-detail-page">
        <PageTitle titles={['巡检维护','入廊作业','详情']} />
        <section className="basic-info-container">
          <TitleNav title="基本信息"></TitleNav>
          <Row>
            <Col>
              {entranceDetail[0] && <BasicInfo data={entranceDetail[0]}/>}
            </Col>
          </Row>
        </section>
      </div>

    );
  }
}

export default EntranceWorkDetail;

