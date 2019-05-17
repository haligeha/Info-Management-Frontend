import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Button, Table,Popconfirm, Row, Col, Input} from 'antd';
import axios from 'axios';
import './index.styl';
import { Link } from 'react-router-dom';
import { isNullOrUndefined } from 'util';

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;

class EmergencyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,     
      data:[],
    };
    this.getTotalPage = this.getTotalPage.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
 
  componentDidMount(){
    this.getTotalPage(FIRST_PAGE);
  }

  getTotalPage= (page) => {
    const { size } = this.state;
    axios.get(`/api/v1/info/emergencyByPage?limit=${size}&page=${page}`)
      .then((res) => {
        if(res && res.status === 200){
          console.log(res);
          this.setState({
            data: res.data,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  handleChange=(id)=>{
    this.setState({ 
      currentId:id, 
    
  }, () => {
  });
  }

  render() {
    const {
      data,
      current,
      //total,
      size,
    } = this.state;
    return (
      <div className="emergency-page">
        <PageTitle titles={['应急指挥','应急预案']}>
          {
            <Link to={{pathname:"/emergency/plan/new",state:{id:isNullOrUndefined}}}>
            <Button type="primary">+ 新建预案</Button>
            </Link>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={7}>
              <Search
                placeholder="请输入序列ID"
                onSearch={value => console.log(value)}
                enterButton
              />
            </Col>
          </Row>
        </Module>
        <Table
          className="group-list-module"
          bordered
          pagination={{
            current,
           // total,
            pageSize: size,
            onChange: this.handlePageChagne,
           // showTotal: () => `共 ${total} 条数据`,
          }}
          dataSource={data}
          columns={[{
            title: '序列ID',
            key: 'emergency_id',
            render: (text, record) => (record.emergency_id && record.emergency_id) || '--',
          }, {
            title: '预案名称',
            key: 'name',
            render: (text, record) => (record.name && record.name) || '--',
          }, {
            title: '预案类别',
            key: 'category',
            render: (text, record) => (record.category && record.category) || '--',
          }, {
            title: '预案级别',
            dataIndex: 'level',
            render: (text, record) => (record.level && record.level) || '--',
          }, {
            title: '预案内容',
            dataIndex: 'content',
            render: (text, record) => `${record.content && record.level || ''}`,
          }, {
            title: '签发人',
            key: 'signer',
            render: (text, record) => `${record.signer}`,
          },{
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"> 
                <Link
                  to={{pathname:"/emergency/plan/new",state:{id:record.emergency_id}}}
                  style={{marginRight:'5px'}}
                  onClick={()=>{this.handleChange(record.emergency_id)}}
                >编辑</Link>
                <Link
                  to="/emergency/plan/detail"
                  style={{marginRight:'5px'}}
                >详情</Link>
                <Popconfirm
                  title="确定要删除吗？"
                  onConfirm={()=> {this.deleteGroup(record)}}
                >
                  <Button type="simple"
                  style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
                  >删除</Button>
                </Popconfirm>
              </div>
            ),
          }]}
        />
      </div>

    );
  }
}

export default EmergencyPlan;