import React, { Component, } from 'react';
import { Input,Row,Col,Button, Icon ,Avatar,Card } from 'antd';
import { PageTitle,Module  } from '../../../../../components';
import axios from 'axios';
//import { Link } from 'react-router-dom'
var user_id=window.sessionStorage.getItem("user_id")
const Search = Input.Search;
const { Meta } = Card;
class EmergencyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList();    
  }
  //获取列表信息
  getGroupList = () => {
    axios.get(`/api/v1/info/allDevice?user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          this.setState({
            data: res.data,
          }) ;
          console.log(this.state.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  render() {
    const {
      data
    } = this.state;
    const content="设备号："+data.DeivceId
    return (
      <div>
        <PageTitle titles={['监督预测','设备信息']}>
          {
           
            <a href="http://39.104.84.131/thingsTenantManager#/deviceList" 
              _target="blank"
            >
              <Button>+新建设备</Button>
            </a>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={7}>
              <Search
                placeholder="请输入设备ID"
                onSearch={value => console.log(value)}
                enterButton
              />
            </Col>
          </Row>
        </Module>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[         
          // <Link to={`/monitor/device/edit/${data.DeivceId}`}>
          //   <Icon type="edit"/>
          // </Link>,     
            <a href="http://39.104.84.131/thingsTenantManager#/deviceList" _target="blank">
              <Icon type="edit"/>
            </a>,     
            // <Icon type="delete"
            //   onClick={()=> {
            //   const {
            //     history,
            //   } = this.props
            //   history.push('/monitor/device/detail')
            // }}/>,
            <a href="http://39.104.84.131/thingsTenantManager#/deviceList"
              _target="blank"
            >
              <Icon type="delete"/>
            </a>, 
            <a href="http://39.104.84.131/thingsTenantManager#/deviceList"
              _target="blank"
            >
              <Icon type="ellipsis"/>
            </a>, 
          // <Link to={`/monitor/device/detail`}>
          //    <Icon type="ellipsis" />
          // </Link>,
          ]}
        >
          <Meta
            avatar={<Avatar>DEVICE</Avatar>}
            title={data.deviceName}
            description={content}
          />
        </Card>
      </div>

    );
  }
}

export default EmergencyPlan;

