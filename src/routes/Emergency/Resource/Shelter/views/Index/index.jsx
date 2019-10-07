import React, { Component, } from 'react';
import './index.styl';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {SELECT_SHELTER_CATEGORY} from '../../configs'
import { PageTitle,Module } from '../../../../../../components';
import {Button,Table,Row,Col,Select,Popconfirm} from 'antd';
//const FormItem = Form.Item;
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const user_id = window.sessionStorage.getItem("user_id");

class Shelter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,     
      data:[],
      category:'',
      nowCurrent:FIRST_PAGE
    };
    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);
  }
  //配合分页和筛选条件获取信息
  getGroupList = (page)=>{
    const { size,category } = this.state;
    axios.get(`/api/v1/info/emergencyPlaceByPage?limit=${size}&page=${page}&category=${category}&user_id=${user_id}`)
      .then((res)=>{
        if(res&&res.status === 200){
          console.log(res);
          this.setState({
            data:res.data,
            nowCurrent:res.data.page  
          });
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }
  //页码改变
  handlePageChange=(page)=>{
    this.getGroupList(page-1)
  }
  //筛选条件：category
  selectActivity=(value)=>{
    this.setState({category:SELECT_SHELTER_CATEGORY[value].name})
  }
  //删除
  deleteGroup = (record) =>{
    axios.delete(`/api/v1/info/place?placeId=${record.place_id}&user_id=${user_id}`)
      .then(()=>{
        this.getGroupList(this.state.nowCurrent)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  render() {
    const {
      data:{
        data,
        allCount,
        limit,
        page
      }} = this.state;
    const total = allCount
    const current = page+1;
    const size = limit

    console.log(data);
    return (
      <div className="report-page">
        <PageTitle titles={['应急指挥','应急资源','应急避难场所']}>
          { 
            <Link to="/emergency/resource/shelter/new">
              <Button type="primary">+ 新建应急避难场所</Button>
            </Link>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={2}>场所类型：</Col>
            <Col span={4}>
              <Select placeholder="请选择场所类型"
                style={{ width: 220 }}
                onChange={this.selectActivity}
              >
                {
                  SELECT_SHELTER_CATEGORY&&
                  SELECT_SHELTER_CATEGORY.map(cur =>(
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
                onClick={()=>{this.getGroupList(0)}}
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
            showTotal:()=> `共${allCount}条数据`
          }}
          dataSource={data}
          columns={[{
            title: '场所ID',
            key: 'place_id',
            render: (text, record) => (record.place_id && record.place_id) || '--',
          }, {
            title: '场所名称',
            key: 'name',
            render: (text, record) => (record.name && record.name) || '--',
          }, {
            title: '场所类型',
            key: 'category',
            render: (text, record) => (record.category && record.category) || '--',
          }, {
            title: '场所面积',
            dataIndex: 'area',
            render: (text, record) => (record.area && record.area) || '--',
          }, {
            title: '场所容量',
            dataIndex: 'capacity',
            render: (text, record) => (record.capacity && record.capacity) || '--',
          }, {
            title: '所属单位（部门）',
            key: 'affiliation',
            render: (text, record) => (record.affiliation && record.affiliation) || '--',
          },{
            title: '负责人',
            key: 'principal',
            render: (text, record) => (record.principal && record.principal) || '--',
          },{
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Link 
                  to={`/emergency/resource/shelter/edit/${record.place_id}`}
                  style={{marginRight:'5px'}}
                >编辑</Link>
                <Link 
                  to={`/emergency/resource/shelter/detail/${record.place_id}`}
                  style={{marginRight:'5px'}}
                >详情</Link>
                <Popconfirm 
                  title="确定要删除吗" 
                  onConfirm={()=>{this.deleteGroup(record)}}
                >
                  <Button 
                    type="simple"
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

export default Shelter;

