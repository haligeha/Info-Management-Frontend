import React, { Component, } from 'react';
import { Button,Table,Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;
const user_id = window.sessionStorage.getItem("user_id");
class NotApproved extends Component {
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
  
  componentDidMount() {
    this.getGroupList();
  }
  
  getGroupList = () =>{
    axios.get(`/api/v1/user/noReservePlan?user_id=${user_id}`)
      .then((res)=>{
        if(res&&res.status ===200){
          console.log('====================================');
          console.log(res);
          console.log('====================================');
          this.setState({
            data:res.data
          })
        }
      })
      .catch(function(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      })
  }

  deleteGroup = (record) =>{
    axios.delete(`/api/v1/user/planAuditById?id=${record.id}&user_id=${user_id}`)
      .then(()=>{
        this.getGroupList(this.state.nowCurrent)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  render() {
    const {
      data,
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
            title: '预案ID',
            key: 'id',
            render: (text, record) => (record.id && record.id) || '--',
          }, {
            title: '计划名',
            key: 'planName',
            render: (text, record) => (record.planName && record.planName) || '--',
          }, {
            title: '用户ID',
            key: 'userId',
            render: (text, record) => (record.userId && record.userId) || '--',
          }, {
            title: '用户名',
            dataIndex: 'userName',
            render: (text, record) => (record.userName) || '--'
          }, {
            title: '创建日期',
            dataIndex: 'addDate',
            render: (text, record) => moment(parseInt(record.addDate)).format("YYYY-MM-DD HH:mm:ss") || '--'
          }, {
            title: '状态',
            key: 'state',
            render: (text, record) => `${record.state === 2 ? text = "未通过" : (record.state === 1 ? text = "通过" : text = "未审批")}`,
          }, {
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Link 
                  to={`/emergency/approval/new/${record.id}`}
                  style={{marginRight:'5px'}}
                >新建审批</Link>
                
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

export default NotApproved;

