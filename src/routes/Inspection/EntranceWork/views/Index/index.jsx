import React, { Component } from 'react';
import './index.styl';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Select, Table } from 'antd';
import {
  SELECT_HOME_WORK_NUM,
}from '../../configs';
import { PageTitle,Module } from '../../../../../components';
import axios from 'axios';
const FormItem = Form.Item;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;
  
class Homework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,     
    };
  } 
  componentDidMount(){
    console.log('此处发送ajax请求');
    axios.get('/api/v1/info/entranceWorkByPage?limit=10&page=0')
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('css');
  }
  render() {
    const {
      data,
      current,
      total,
      size,
    } = this.state;
    return (
      <div className="report-page">
        <PageTitle titles={['巡检维护','入廊作业']}>
          {
            <Link to="/inspection/entrance/work/new">
              <Button type="primary"> + 添加如廊作业</Button>
            </Link>
          }       
        </PageTitle>
        <Module>
          <Row>
            <Col span={2}>活动范围：</Col>
            <Col span={6}>
              <Select placeholder="请选择活动范围"
                style={{ width: 220 }}
              >
                {
                  SELECT_HOME_WORK_NUM &&
                  SELECT_HOME_WORK_NUM.map(cur => (
                    <Select.Option key={cur.id}
                      value={cur.id}
                    >{cur.name}</Select.Option>
                  ))
                }
              </Select>
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
            onChange: this.handlePageChagne,
            showTotal: () => `共 ${total} 条数据`,
          }}
          dataSource={data}
          columns={[{
            title: '排列序号',
            key: 'tagId',
            render: (text, record) => (record.tagId && record.tagId) || '--',
          }, {
            title: '工期',
            key: 'tagName',
            render: (text, record) => (record.tagName && record.tagName) || '--',
          }, {
            title: '创建时间',
            key: 'tagType',
            render: (text, record) => (record.type && record.type.name) || '--',
          }, {
            title: '施工人员数量',
            dataIndex: 'actualUserCount',
            render: (text, record) => `${record.type.id === '3'
              ? (record.actualAmount === '0' ? '--' : record.actualAmount) : (record.actualAmount || 0)}`,
          }, {
            title: '活动范围',
            dataIndex: 'creatorNameZh',
            render: (text, record) => `${record.creatorNameZh || ''}`,
          }, {
            title: '评价',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          }, {
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Button type="simple">编辑</Button>
                <Button type="simple">详情</Button>
                <Button type="simple">删除</Button>
                <Button type="simple">评价</Button>
              </div>
            ),
          }]}
        />
      </div>
    );
  }
}

export default Homework;

