import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Row,Col,Table,Input,Popconfirm,message  } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './index.styl'
import moment from 'moment';
//const { RangePicker } = DatePicker;
const FIRST_PAGE = 0;
const PAGE_SIZE = 10;
const Search = Input.Search;
var user_id=window.sessionStorage.getItem("user_id")
class InspectionPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,  
      data:[],  
      dataChange:[],
      inspection_person:'',
      nowCurrent:FIRST_PAGE,
  
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);    
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size,inspection_person } = this.state;
    axios.get(`/api/v1/info/inspectionPlanByPage?limit=${size}&page=${page}&inspection_person=${inspection_person}&user_id=${user_id}`)
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

  setRowClassName = (record) => {
    var now = new Date().getTime();
    if(now>record.inspection_date){
      return 'redback'
    }
    else{
      return 'blueback'
    }
  }
  //搜索
 selectActivity = (value) => {
   const nameValue=value
   this.setState({
     inspection_person:nameValue
   }) ;
   console.log(this.state)
   this.getGroupList(0)
 }
  //分页
  handlePageChange = (page) => {
    this.getGroupList(page-1)
  }

  //删除
  deleteGroup = (record) => {
    axios.delete(`/api/v1/info/plan?id=${record.id}&user_id=${user_id}`)
      .then(() => {
        this.getGroupList(this.state.nowCurrent)
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
      <div>
        <PageTitle titles={['巡检维护','巡检计划']}>
          {
            <Link to={"/inspection/plan/new"}>
              <Button type="primary">+ 新建巡检计划</Button>
            </Link>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={2}>巡检人姓名：</Col>
            <Col span={4}>
              <Search
                placeholder="请输入巡检人姓名"
                enterButton
                onSearch={value => this.selectActivity(value)}
              />
            </Col>
          </Row> 
        </Module>
        <Table
          className="group-list-module"
          bordered
          showHeader={false}
          pagination={{
            current,
            total,
            pageSize: size,
            onChange: this.handlePageChange,
            showTotal: () => `共${allCount} 条数据`
          }}
          rowClassName={this.setRowClassName}
          dataSource={data}
          columns={[{
            key: 'inspectState', 
            width:50,
            render: (text, record) => {
              var now = new Date().getTime();
              if(now>record.inspection_date){
                return "已超时"
              }
              else{
                return "待巡检"
              }
            }
          }, {
            title: '描述',
            key: 'content',
            render: (text, record) => {
              return "任务编号: "+((record.number && record.number) || '--')+"   描述: "+((record.content && record.content) || '--')
            }   
          }, {
            title: '创建时间',
            width:200,
            key: 'create_date',
            render: (text, record) => {
              var date= moment(parseInt(record.create_date)).format('YYYY-MM-DD')
              return "创建时间: "+(date && date) || '--'
            }
          }, {
            title: '计划巡检时间',
            key: 'inspection_date',
            render: (text, record) => {
              var date= moment(parseInt(record.inspection_date)).format('YYYY-MM-DD')
              return "计划巡检时间: "+(date && date) || '--'
            }
          }, {
            title: '巡检执行人',
            key: 'inspection_person',
            render: (text, record) => {
              return "巡检执行人: "+(record.inspection_person && record.inspection_person) || '--'
            }
          },{
            title: '巡检完成状态',
            key: 'status',
            render: (text, record) => {
              return "巡检完成状态: "+(record.status && record.status) || '--'
            }
          },{
            title: '操作',
            width:120,
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                {/* <Link
                    to={`/inspection/plan/edit/${record.id}`}
                  >                  
                    <Button type="simple" className="btns" style={{marginRight:'5px'}}>编辑</Button>
                  </Link>
                  <Popconfirm
                  title="确定要删除吗？"
                  onConfirm={()=> {this.deleteGroup(record)}}
                >
                  <Button type="simple" className="deleteBtns" style={{marginTop:'2px'}}>删除</Button>  
                 </Popconfirm> */}
                <Link
                  to={`/inspection/plan/edit/${record.id}`}
                  style={{marginRight:'5px'}}
                >编辑</Link>
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

export default InspectionPlan;