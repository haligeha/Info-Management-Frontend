import React, { Component, } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const user_id = window.sessionStorage.getItem("user_id");
class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0, 
      data:[],
      nowCurrent:FIRST_PAGE    
    };
    this.getGroupList = this.getGroupList.bind(this);
  }
  
  componentDidMount(){
    this.getGroupList();
  }
  getGroupList = ()=>{
    axios.get(`/api/v1/user/planAudit?user_id=${user_id}`)
      .then((res)=>{
        if(res&&res.status === 200){
          console.log(res);
          this.setState({
            data:res.data

          })
        }
      })
      .catch(function(error){
        console.log(error);
      })
  }

  render() {
    const {
      data
      // current,
      // total,
      // size
      
    } = this.state;
    return (
      <div>
        <Table
          className="group-list-module"
          bordered
          // pagination={{
          //   current,
          //   total,
          //   pageSize: size,
          //   onChange: this.handlePageChagne,
          //   showTotal: () => `共 ${total} 条数据`,
          // }}
          dataSource={data}
          columns={[{
            title: '作业ID',
            key: 'planId',
            render: (text, record) => (record.planId && record.planId) || '--',
          },{
            title: '用户ID',
            key: 'userId',
            render: (text, record) => (record.userId && record.userId) || '--',
          }, {
            title: '用户名',
            dataIndex: 'userName',
            render: (text, record) =>  (record.userName && record.userName) || '--',
          }, {
            title: '审批信息',
            dataIndex: 'auditInfo',
            render: (text, record) => (record.auditInfo && record.auditInfo) || '--',
          }]}
        />
      </div>

    );
  }
}

export default Results;

