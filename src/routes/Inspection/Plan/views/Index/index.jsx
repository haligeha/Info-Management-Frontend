import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Row,Col,DatePicker,Table  } from 'antd';
import axios from 'axios';
import './index.styl'
const { RangePicker } = DatePicker;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

class InspectionPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,  
      data:[],  
      dataChange:[],
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);
   // this.changeTableList();
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size } = this.state;
    axios.get(`/api/v1/info/allReport?limit=${size}&page=${page}`)
      .then((res) => {
        if(res && res.status === 200){
          console.log(res);
          this.setState({
            data: res.data,
          }) ;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  changeTableList = () => {
    const { data,dataChange} = this.state;
    for(let i=0;i<data.length;i++){
      let dataChangeObj={};
     if(data[i].id<Math.round(new Date().getTime()/1000).toString()){
       if(data[i].state==""&&data[i].summary==""&&data[i].abnoarmal==""&&data[i].maintennance==""){
        dataChangeObj.judge="超时未处理"
       }
       else{
        dataChangeObj.judge="处理完成"
       }
     }
     else{
      dataChangeObj.judge="待巡检"
      dataChangeObj.id=data[i].id
      dataChangeObj.duty_person = data[i].duty_person;
      dataChangeObj.inspection_person = data[i].inspection_person;
      dataChangeObj.create_date = data[i].create_date;
      dataChangeObj.calendar_date = data[i].calendar_date;
      dataChangeObj.state = data[i].state;
      dataChangeObj.summary = data[i].summary;
      dataChangeObj.abnormal = data[i].abnormal;
      dataChangeObj.maintenance = data[i].maintenance;
     }
      dataChange.push(dataChangeObj);
    }
    return dataChange;
  }

  render() {
    const {
      data,
      current,
      total,
      size,
    } = this.state;
    let dataChangeArr=this.changeTableList();
    return (
      <div>
        <PageTitle titles={['巡检维护','巡检计划']}>
          {
            <Button type="primary">+ 新建巡检计划</Button>
          }
        </PageTitle>
        <Module>
          <DatePicker
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
              }
              return (
                <div className="ant-calendar-date"
                  style={style}
                >
                  {current.date()}
                </div>
              );
            }}
          />
        </Module>
        <Table
          className="group-list-module"
          bordered
          pagination={{
            current,
            total,
            pageSize: size,
            onChange: this.handlePageChange,
          }}
          dataSource={dataChangeArr}
          columns={[{
            title: '待检情况',
            key: 'tagJudge', 
           // className:(record.id === 118?"Judge-Design":"Judge-Unfinish")
           render: (text, record) => (record.judge && record.judge) || '--',
          }, {
            title: '排列序号', 
            key: 'tagId',
            render: (text, record) => (record.id && record.id) || '--',
          }, {
            title: '工期',
            key: 'tagName',
            render: (text, record) => (record.duty_person && record.duty_person) || '--',
          }, {
            title: '创建时间',
            key: 'tagType',
            render: (text, record) => (record.inspection_person && record.inspection_person) || '--',
          }, {
            title: '活动范围',
            dataIndex: 'creatorNameZh',
            render: (text, record) => `${record.create_date || ''}`,
          }, {
            title: '评价',
            key: 'createTime',
            render: (text, record) => `${record.calendar_date}`,
          }, {
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

export default InspectionPlan;