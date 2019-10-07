import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button,message,DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
//import { stringify } from 'querystring';
const Option = Select.Option;
//const dateFormat = 'YYYY-MM-DD';
var user_id=window.sessionStorage.getItem("user_id")
class PlanNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planDetail:{},
      people:[],
      pathBelong:[],
    };
    //this.getInspectionPeople = this.getInspectionPeople.bind(this);
  }
  componentDidMount(){
    this.getInspectionPeople();
    this.getPath();
    const {match : { params : { id } }} = this.props   
    console.log(id)
    if(id){
      axios.get(`/api/v1/info/planById?id=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({planDetail:res.data})
        })
        .catch( (err) => {
          console.log(err);
        });
    }
    
  }

  //获取巡检线路信息
  getPath=()=>{
    axios.get(`/api/v1/info/allPath?user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          const pipeArr=res.data
          const pipe=[]
          const childPipe=[]
          pipeArr.forEach(function(items){
            pipe.push(items.number)
          })
          for(var i=0;i<pipe.length;i++)
            childPipe.push(<Option value={pipe[i]}>{pipe[i]}</Option>)
          this.setState({pathBelong:childPipe})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  //获取人员信息
  getInspectionPeople=()=>{
    axios.get(`/api/v1/info/allStaff?&user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          const personArr=res.data
          const person=[]
          const children=[]
          personArr.forEach(function(item){
            person.push(item.name)
          })
          for(var i=0;i<person.length;i++)
            children.push(<Option value={person[i]}>{person[i]}</Option>)
          this.setState({people:children})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
     
  }

  handleChange=()=>{

  }

  //创建入廊作业
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match : { params : { id } },
    } = this.props
    const { getFieldValue } = form;
    const { planDetail} = this.state
    const values = form.getFieldsValue()
    if(!getFieldValue('inspection_person')){
      message.error('请输入巡检人员')
    }
    if(!getFieldValue('inspection_date')){
      message.error('请输入巡检日期')
    }
    if(!getFieldValue('content')){
      message.error('请输入描述')
    }
    if(!getFieldValue('path')){
      message.error('请输入巡检路线')
    }
    values.create_date =new Date()
    console.log(values.create_date)
    values.status = planDetail.status
    values.inspection_date = new Date(getFieldValue('inspection_date'))
    // values.inspection_date=getFieldValue('inspection_date')._d
    console.log(values.inspection_date)

    if(id){
      values.id=id
      values.number=planDetail.number
      axios.put('/api/v1/info/plan?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/inspection/plan')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      values.status = '未完成'
      axios.post('/api/v1/info/plan?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('创建成功')
            history.push('/inspection/plan')
            // axios.post('/api/v1/info/sendGeneralMessage', values)
            // .then(function(response){
            //   message.info("邮件已发送")
            // }
            // )
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  }

  render() {
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { 
      form: { getFieldDecorator }, 
      match : { params : { id } }
    } = this.props
    const { planDetail,people,pathBelong } = this.state
    return (
      <div>
        {id ?
          <PageTitle titles={['巡检维护','巡检计划','编辑']} />
          :
          <PageTitle titles={['巡检维护','巡检计划','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="描述"
              >
                {getFieldDecorator('content',{
                  initialValue: id && planDetail.content,
                  rules:[{
                    required:true,
                    message:"请输入描述",
                  }]
                })(
                  <Input placeholder="请输入描述" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="巡检人员"
              >
                {getFieldDecorator('inspection_person',{
                  initialValue: id && planDetail.inspection_person,
                  rules:[{
                    required:true,
                    message:"请输入巡检人员",
                  }]
                })(
                  <Select
                    //  mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择巡检人员"
                  >
                    {people}
                  </Select>,
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="巡检时间"
              >
                {getFieldDecorator('inspection_date',{
                  initialValue: id && moment(moment(parseInt(planDetail.inspection_date)).format('YYYY-MM-DD'),'YYYY-MM-DD'),
                  // initialValue:id && moment(parseInt(planDetail.inspection_date)).format('YYYY-MM-DD'), 
                  rules:[{
                    required:true,
                    message:"请选择巡检时间",
                  }]
                })(
                  <DatePicker
                    dateRender={current => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                      }
                      return (
                        <div className="ant-calendar-date" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                  />
                  // <Input placeholder="请输入巡检时间" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="巡检路线"
              >
                {getFieldDecorator('path',{
                  initialValue: id && planDetail.path,
                  rules:[{
                    required:true,
                    message:"请输入巡检路线",
                  }]
                })(
                  <Select
                    //  mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择巡检路线"
                  >
                    {pathBelong}
                  </Select>,
                )}  
              </Form.Item>

              <section className="operator-container">
                <div style={{textAlign:"center"}}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                  >{id ? '编辑' : '新建'}
                  </Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                      const {
                        history,
                      } = this.props
                      history.push('/inspection/plan')
                    }}
                  >取消
                  </Button>
                </div>
              </section>
            </Form>
          </Module>
        </div>
      </div>

    );
  }
}

export default Form.create()(PlanNew);