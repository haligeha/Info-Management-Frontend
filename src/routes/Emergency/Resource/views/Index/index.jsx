import React, { Component, } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { PageTitle,Module } from '../../../../../components';
import {Button,Table,Form,Row,Col,Select} from 'antd';
const FormItem = Form.Item;
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;


class EmergencyResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,     
      data:[]
    };
    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);
  }
  
  getGroupList = (page)=>{
    const { size } = this.state;
    axios.get(`/api/v1/info/suppliesByPage?limit=${size}&page=${page}`)
      .then((res)=>{
        if(res&&res.status === 200){
          console.log(res);
          this.setState({
            data:res.data  
          });
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }
      

  render() {
    const {
      data,
      current,
      size,
    } = this.state;
    console.log(data);
    return (
      <div className="report-page">
        <PageTitle titles={['应急指挥','应急资源']}>
          { 
            <Link to="/emergency/resource/work/new">
              <Button type="primary">+ 新建应急资源</Button>
            </Link>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={2}>存放地点：</Col>
            <Col span={6}>
              <Select placeholder="请选择存放地点"
                style={{ width: 220 }}
              >
                
              </Select>
            </Col>
            
          </Row> 
        </Module>
        <Table
          className="group-list-module"
          bordered
          pagination={{
            current,
            pageSize: size,
            onChange: this.handlePageChagne
          }}
          dataSource={data}
          columns={[{
            title: '序列ID',
            key: 'tagId',
            render: (text, record) => (record.supply_id && record.supply_id) || '--',
          }, {
            title: '物资名称',
            key: 'name',
            render: (text, record) => (record.name && record.name) || '--',
          }, {
            title: '物资类别',
            key: 'category',
            render: (text, record) => (record.category && record.category) || '--',
          }, {
            title: '物资数量',
            dataIndex: 'quantity',
            render: (text, record) => (record.quantity && record.quantity) || '--',
          }, {
            title: '物资型号',
            dataIndex: 'model',
            render: (text, record) => (record.model && record.model) || '--',
          }, {
            title: '存放地点',
            key: 'location',
            render: (text, record) => (record.location && record.location) || '--',
          },{
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Button type="simple">编辑</Button>
                <Button type="simple">详情</Button>
                <Button type="simple">删除</Button>
              </div>
            ),
          }]}
        />
      </div>

    );
  }
}

export default EmergencyResource;

