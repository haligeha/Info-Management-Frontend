import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Row,Col,Table,Input, Popconfirm,message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
const FIRST_PAGE = 0;
const PAGE_SIZE = 6;
const Search = Input.Search;
var user_id=window.sessionStorage.getItem("user_id")
class Management extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,  
      data:[],  
      unit:'',
      nowCurrent:FIRST_PAGE,
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);    
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size,unit } = this.state;
    axios.get(`/api/v1/info/pipeByPage?limit=${size}&page=${page}&unit=${unit}&user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          this.setState({
            data: res.data,
            nowCurrent:res.data.page
          }) ;
          console.log(this.state.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //分页
  handlePageChagne = (page) => {
    this.getGroupList(page-1)
  }

  //删除
  deleteGroup = (record) => {
    axios.delete(`/api/v1/info/pipeGallery?Id=${record.id}&user_id=${user_id}`)
      .then(() => {
        this.getGroupList(this.state.nowCurrent)
      })
      .catch( (err) => {
        message.info('无相应权限')
        console.log(err);
      });
  }
 //搜索
 selectActivity = (value) => {
   //const nameValue=value
   this.setState({
     unit:value
   }) ;
   console.log(this.state)
   this.getGroupList(0)
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
     <div>
       <PageTitle titles={['管廊维护','管廊管理']}>
         {
           <Link to={"/pipe/management/new"}>
             <Button type="primary">+ 新建管廊信息</Button>
           </Link>
         }
       </PageTitle>
       <Module>
         <Row>
           <Col span={2}>所属公司：</Col>
           <Col span={4}>        
             <Search
               placeholder="请输入所属公司名称"
               enterButton
               onSearch={value => this.selectActivity(value)}
             />
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
           showTotal: () => `共${allCount} 条数据`
         }}
         dataSource={data}
         columns={[{
           title: '管廊编号',
           key: 'number',
           render: (text, record) => {
             return (record.number && record.number) || '--'
           }
         }, {
           title: '管廊名称',
           width:200,
           key: 'name',
           render: (text, record) => {
             return (record.name && record.name) || '--'
           }
         }, {
           title: '管廊长度',
           key: 'length',
           render: (text, record) => {
             return (record.length && record.length) || '--'
           }
         }, {
           title: '所属单位',
           key: 'unit',
           render: (text, record) => {
             return (record.unit && record.unit) || '--'
           }
         },{
           title: '起点',
           key: 'startpoint',
           render: (text, record) => {
             return (record.startpoint && record.startpoint) || '--'
           }
         },{
           title: '终点',
           key: 'endpoint',
           render: (text, record) => {
             return (record.endpoint && record.endpoint) || '--'
           }
         },{
           title: '说明描述',
           key: 'description',
           render: (text, record) => {
             return (record.description && record.description) || '--'
           }
         },{
           title: '操作',
           render: (text, record, index) => (
             <div className="operate-btns"
               style={{ display: 'block' }}
             >
               <Link
                 to={`/pipe/management/edit/${record.id}`}
                 style={{marginRight:'5px'}}
               >编辑</Link>
               <Link
                 to={`/pipe/management/detail/${record.id}`}
                 style={{marginRight:'5px'}}
               >详情</Link>
               <Popconfirm
                 title="确定要删除吗？"
                 onConfirm={()=> {this.deleteGroup(record)}}
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

export default Management;