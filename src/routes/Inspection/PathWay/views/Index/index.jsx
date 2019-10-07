import React from 'react';
import { PageTitle , Module, } from '../../../../../components';
import { Button,Row,Col,Table,Input, Popconfirm,message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import moment from 'moment';

const FIRST_PAGE = 0;
const PAGE_SIZE = 6;
const Search = Input.Search;

class PathWay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,  
      data:[],  
      area:'',
      nowCurrent:FIRST_PAGE,
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);    
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size,area_belong } = this.state;
    axios.get(`/api/v1/info/inspectionPathByPage?limit=${size}&page=${page}&area_belong=${area_belong}&user_id=6`)
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
    axios.delete(`/api/v1/info/inspection?id=${record.id}`)
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
   const nameValue=value
   this.setState({
     area_belong:nameValue
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
       <PageTitle titles={['巡检维护','巡检路线管理']}>
         {
           <Link to={"/inspection/pathway/new"}>
             <Button type="primary">+ 新建巡检路线</Button>
           </Link>
         }
       </PageTitle>
       <Module>
         <Row>
           <Col span={2}>所属区域：</Col>
           <Col span={4}>        
             <Search
               placeholder="请输入所属区域"
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
           //    showTotal: () => `共${allCount} 条数据`
         }}
         dataSource={data}
         columns={[{
           title: '线路编号',
           key: 'number',
           render: (text, record) => {return (record.number && record.number) || '--'}
         },{
           title: '所属区域',
           width:200,
           key: 'area_belong',
           render: (text, record) => {
             return (record.area_belong && record.area_belong) || '--'
           }
         }, {
           title: '所属管廊',
           key: 'pipe_belong',
           render: (text, record) => {
             return (record.pipe_belong && record.pipe_belong) || '--'
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
           title: '创建时间',
           key: 'create_date',
           render: (text, record) => {
             return(moment(parseInt(record.create_date)).format('YYYY-MM-DD HH:mm:ss')) || '--'
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
                 to={`/inspection/pathway/edit/${record.id}`}
                 style={{marginRight:'5px'}}
               >编辑</Link>
               {/* <Link
                   to={`/inspection/pathway/${record.id}`}
                   style={{marginRight:'5px'}}
                 >详情</Link> */}
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

export default PathWay;