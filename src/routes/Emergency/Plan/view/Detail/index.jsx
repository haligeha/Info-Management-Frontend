import React, { Component, } from 'react';
import { PageTitle} from '../../../../../components';
import { List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './index.styl'
const user_id = window.sessionStorage.getItem("user_id");
class EmergencyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planDetail:{},
      loading:false,
      
    };
  }
  componentDidMount(){
    const {match : { params : { id } }} = this.props
    if(id){
      axios.get(`/api/v1/info/emergencyById?emergencyId=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({planDetail:res.data})
        })
        .catch( (err) => {
          console.log(err);
        });
    }
  }

  render() {
    const {planDetail}= this.state
    const data=(detail) => {
      const dataSource=[]
      let level="预案等级：   "+detail.level
      let name="预案名称：   "+detail.name
      let category="预案类别：   "+detail.category
      let associated_event_type="预案关联事件类型：   "+detail.associated_event_type
      let department="编制单位/部门：   "+detail.department
      let release_date="创建日期：   "+ moment(parseInt(detail.release_date)).format('YYYY-MM-DD')
      let release_number="发布文号：   "+detail.release_number
      let issued="发布单位：   "+detail.issued
      let signer="签发人：   "+detail.signer
      dataSource.push(level)
      dataSource.push(name)
      dataSource.push(category)
      dataSource.push(associated_event_type)
      dataSource.push(department)
      dataSource.push(release_date)
      dataSource.push(release_number)
      dataSource.push(issued)
      dataSource.push(signer)
      return dataSource;
    }
    const Title = ({ title }) => (
      <div className="title-container">
        <div className="circle"/>
        <span>{title}</span>
      </div>
    )
  
    return (
      <div>
        <PageTitle titles={['应急指挥','应急预案','详情']} />
        <div className="listBox">
          <Title title="基本信息"></Title>
          <List
            size="large"
            dataSource={data(planDetail)}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
    );
  }
}

export default EmergencyDetail;