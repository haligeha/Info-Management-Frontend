import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Button, Table,Popconfirm, Row, Col, Select,message } from 'antd';
import axios from 'axios';
import './index.styl';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  SELECT_EMERGENCY_PLAN_LEVEL,
}from '../../config';

var user_id=window.sessionStorage.getItem("user_id")
const FIRST_PAGE = 0;
const PAGE_SIZE = 7;
//const Search = Input.Search;
class EmergencyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,   
      data:[],
      level:'',
      nowCurrent:FIRST_PAGE,
    };
    this.getTotalPage = this.getTotalPage.bind(this);
  }
 
  componentDidMount(){
    this.getTotalPage(FIRST_PAGE);
  }

  getTotalPage= (page) => {
    const { size,level } = this.state;
    axios.get(`/api/v1/info/emergencyPlanByPage?limit=${size}&page=${page}&level=${level}&user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          console.log(res);
          this.setState({
            data: res.data,
            nowCurrent:res.data.page
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //分页
  handlePageChange = (page) => {
    this.getTotalPage(page-1)
  }
  //搜索
  selectLevel = (value) => {
    this.setState({level:SELECT_EMERGENCY_PLAN_LEVEL[value].name})
  }
  //删除
  deleteGroup = (record) => {
    axios.delete(`/api/v1/info/emergency?id=${record.emergency_id}&user_id=${user_id}`)
      .then(() => {
        this.getTotalPage(this.state.nowCurrent)
      })
      .catch( (err) => {
        message.info('无相应权限')
        console.log(err);
      });
  }
  render() {
    const {
      data:{
        data,
        allCount,
        limit,
        page,
      },
    } = this.state;
    const total = allCount
    const current = page+1
    const size = limit
    return (
      <div className="emergency-page">
        <PageTitle titles={['应急指挥','应急预案']}>
          {
            <Link to={{pathname:"/emergency/plan/new"}}>
              <Button type="primary">+ 新建预案</Button>
            </Link>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={2}>预案等级：</Col>
            <Col span={4}>
              <Select placeholder="请选择预案等级"
                style={{ width: 220 }}
                onChange={this.selectLevel}
              >
                {
                  SELECT_EMERGENCY_PLAN_LEVEL &&
                  SELECT_EMERGENCY_PLAN_LEVEL.map(cur => (
                    <Select.Option key={cur.id}
                      value={cur.id}
                    >{cur.name}</Select.Option>
                  ))
                }
              </Select>
            </Col>
            <Col span={2}>
              <Button  
                type="primary" 
                onClick={() => {this.getTotalPage(0)}}
              >搜索</Button>
            </Col>
          </Row> 
        </Module>
        <Table
          className="group-list-module"
          bordered
          pagination={{
            current,
            total,
            pageSize: size,
            onChange: this.handlePageChange,
            showTotal: () => `共 ${allCount} 条数据`,
          }}
          dataSource={data}
          columns={[{
            title: '预案等级',
            dataIndex: 'level',
            render: (text, record) => (record.level && record.level) || '--',
          },{
            title: '预案名称',
            key: 'name',
            render: (text, record) => (record.name && record.name) || '--',
          }, {
            title: '预案类别',
            key: 'category',
            render: (text, record) => (record.category && record.category) || '--',
          }, {
            title: '预案关联事件类型',
            key: 'associated_event_type',
            render: (text, record) => (record.associated_event_type && record.associated_event_type) || '--',
          },{
            title: '编制单位/部门',
            dataIndex: 'department',
            render: (text, record) => (record.department && record.department) || '--',
          }, {
            title: '创建日期',
            dataIndex: 'release_date',
            render: (text, record) => (record.release_date && 
              moment(parseInt(record.release_date)).format('YYYY-MM-DD')) || '--',
          },{
            title: '发布文号',
            dataIndex: 'release_number',
            render: (text, record) => (record.release_number && record.release_number) || '--',
          },{
            title: '发布单位',
            dataIndex: 'issued',
            render: (text, record) => (record.issued && record.issued) || '--',
          },{
            title: '签发人',
            key: 'signer',
            render: (text, record) => (record.signer && record.signer) || '--',
          },{
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"> 
                <Link
                  to={`/emergency/plan/edit/${record.emergency_id}`}
                  style={{marginRight:'5px'}}
                >编辑</Link>
                {/* <Link
                  to={`/emergency/plan/detail/${record.emergency_id}`}
                  style={{marginRight:'5px'}}
                >详情</Link> */}
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