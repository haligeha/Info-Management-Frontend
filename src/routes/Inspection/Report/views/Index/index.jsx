import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Input,Form,message,DatePicker,} from 'antd';
import axios from 'axios';
import './index.styl'
import { Link } from 'react-router-dom'
// const RadioGroup = Radio.Group;
// const { TextArea } = Input;
var user_id=window.sessionStorage.getItem("user_id")
class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {   
      // visible: false,
      // treatment:'',
      // abnormal:''
      reportDetail:{},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
    } = this.props
    const { getFieldValue } = form;
    //const { reportDetail} = this.state
    const values = form.getFieldsValue()
    if(!getFieldValue('duty_person')){
      message.error('请输入值班人员')
    }
    if(!getFieldValue('inspection_person')){
      message.error('请输入巡检人员')
    }
    if(!getFieldValue('calendar_date')){
      message.error('请选择巡检日期')
    }
    if(!getFieldValue('state')){
      message.error('请输入巡检总况')
    }
    if(!getFieldValue('abnormal')){
      message.error('请输入异常项')
    }
    if(!getFieldValue('maintenance')){
      message.error('请输入维修情况')
    }
    if(!getFieldValue('summary')){
      message.error('请输入总结')
    }
    values.create_date =new Date()
    values.inspection_date = new Date(getFieldValue('calendar_date'))
    axios.post('/api/v1/info/inspection?user_id='+user_id, values)
      .then(function (response) {
        if(response.status === 200){
          message.info('创建成功')
          history.push('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
    
  }
  // showDrawer = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // onClose = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // onChange = e => {
  //   this.setState({
  //     placement: e.target.value,
  //   });
  // };

  // spec = () => {

  // }
  // onAbnormal = ()=> {

  // }
  // onDealing = ()=>{

  // }
  render() {
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { 
      form: { getFieldDecorator }, 
    } = this.props
    // const {abnormal,treatment}=this.state
    //const {reportDetail}=this.state
    return (
      <div>
        <PageTitle titles={['巡检维护','开始巡检']}>
          {
            <Link to={"/inspection/plan/new"}>
              <Button type="primary">总结报告</Button>
            </Link>
          }
        </PageTitle>
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="巡检时间"
              >
                {getFieldDecorator('calender_date',{
                  // initialValue: id && reportDetail.calender_date,
                  rules:[{
                    required:true,
                    message:"请选择巡检时间",
                  }]
                })  ( <DatePicker
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
                />)} 
                  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="值班人"
              >
                {getFieldDecorator('duty_person',{
                  // initialValue: id && reportDetail.duty_person,
                  rules:[{
                    required:true,
                    message:"请输入值班人",
                  }]
                })  (<Input placeholder="请输入值班人员"/>)} 
                  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="巡检人员"
              >
                {getFieldDecorator('inspection_person',{
                  // initialValue: id && reportDetail.inspection_person,
                  rules:[{
                    required:true,
                    message:"请输入巡检人员",
                  }]
                }) (<Input placeholder="请输入值班人员"/>)}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="巡检总况"
              >
                {getFieldDecorator('state',{
                  // initialValue: id && reportDetail.state,
                  rules:[{
                    required:true,
                    message:"请输入巡检总况",
                  }]
                })(<Input placeholder="请输入巡检总况"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="异常项"
              >
                {getFieldDecorator('abnormal',{
                  // initialValue: id && reportDetail.abnormal,
                  rules:[{
                    required:true,
                    message:"请输入异常项",
                  }]
                })(<Input placeholder="请输入异常项"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="维护信息"
              >
                {getFieldDecorator('maintenance',{
                  // initialValue: id && reportDetail.maintenance,
                  rules:[{
                    required:true,
                    message:"请输入维护信息",
                  }]
                }) (<Input placeholder="请输入维护信息"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="巡检内容总结"
              >
                {getFieldDecorator('summary',{
                  // initialValue: id && reportDetail.summary,
                  rules:[{
                    required:true,
                    message:"请输入巡检内容总结",
                  }]
                })(<Input placeholder="请输入巡检内容总结"/>)} 
              </Form.Item>  
              <section className="operator-container">
                <div style={{textAlign:"center"}}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                  >总结
                  </Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                      const {
                        history,
                      } = this.props
                      history.push('/inspection/report')
                    }}
                  >取消
                  </Button>
                </div>
              </section>
            </Form>
          </Module>
        </div>
        {/* <RadioGroup
          style={{ marginRight: 8 }}
          defaultValue="left"
          onChange={this.onChange}
        >
          <Radio.Button value="a"
            style={{marginRight:30}}
            onClick={this.showDrawer}
          >1号防火区</Radio.Button>
          <Radio.Button value="b"
            style={{marginRight:30}}
            onClick={this.showDrawer}
          >2号防火区</Radio.Button>
          <Radio.Button value="c"
            style={{marginRight:30}}
            onClick={this.showDrawer}
          >3号防火区</Radio.Button>
          <Radio.Button value="d"
            style={{marginRight:30}}
            onClick={this.showDrawer}
          >4号防火区</Radio.Button>
        </RadioGroup>
        <Drawer
          title="巡检结果"
          placement="right"
          closable={false}
          width={500}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <div>        
                <Radio
                onClick={this.spec}
                >摄像头</Radio>
            <div className="formsub">
              <div>
                    管廊1号3z型号<br/>
                    巡检人
              </div>
              <Form 
                className="formsubmit"
                onSubmit={this.handleSubmit}
              >
                <Form.Item
                  {...createFormItemLayout}
                  label="正常项"
                >
                  {getFieldDecorator('abnormal',{
                    initialValue:'',
                    rules:[{
                      required:true,
                    }]
                  })(
                    <Radio.Group onChange={this.onAbnormal}
                      value={this.state.abnormal}
                    >
                      <Radio value={1}>正常</Radio>
                      <Radio value={2}>异常</Radio>
                    </Radio.Group>
                  )}  
                </Form.Item>
                <Form.Item
                  {...createFormItemLayout}
                  label="异常描述"
                >
                  {getFieldDecorator('description',{
                    initialValue: '',
                    rules:[{
                      required:true,
                      message:"请输入异常描述",
                    }]
                  })(
                    <TextArea rows={4} />
                  )}  
                </Form.Item>    
                <Form.Item
                  {...createFormItemLayout}
                  label="处理否"
                >
                  {getFieldDecorator('treatment',{
                    initialValue:'',
                    rules:[{
                      required:true,
                    }]
                  })(
                    <Radio.Group onChange={this.onDealing}
                      value={this.state.treatment}
                    >
                      <Radio value={1}>未处理</Radio>
                      <Radio value={2}>已处理</Radio>
                      <Radio value={3}>处理中</Radio>
                    </Radio.Group>
                  )}  
                </Form.Item>
                <Form.Item
                  {...createFormItemLayout}
                  label="处理说明"
                >
                  {getFieldDecorator('content',{
                    initialValue: '',
                    rules:[{
                      required:true,
                      message:"请输入处理说明",
                    }]
                  })(
                    <TextArea rows={6} />
                  )}  
                </Form.Item>  
              </Form>
            </div>
          </div>
        </Drawer>*/}
      </div>
 
    );
  }
}

export default Form.create()(Report);