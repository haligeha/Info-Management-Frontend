import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../components' ;
import axios from 'axios';
import {Button,Form,Input,message} from 'antd';

const user_id = window.sessionStorage.getItem("user_id");
class ApprovedNew extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ApprovalDetail:[]
    }    
  }
   
  handleSubmitAgree = (e) =>{
    e.preventDefault()
    const {
      form,
      history
    }= this.props
    const {getFieldValue} = form;
    const values = form.getFieldsValue()
    
    if(!getFieldValue('userId')){
      message.error('请输入审批人ID')
    }
    if(!getFieldValue('userName')){
      message.error('请输入审批人姓名')
    }
    if(!getFieldValue('auditInfo')){
      message.error('请输入审批意见')
    }
    
    console.log(values)
    axios.post('/api/v1/user/planAudit',values)
      .then(function(response){
        if(response.status === 200){
          message.info('新建审批成功')
          axios.put(`/api/v1/user/agreeReservePlan?id=${values.planId}&user_id=${user_id}`)
            .then(function(respose){
              message.info('审批成功')
              history.push('/entrance/approval')
            })
            .catch(function(error){
              console.log(error)
              message.info('审批失败')
            })
        }
      })
      .catch(function(error){
        console.log(error)
        message.info('新建审批失败')
      })
    
  }
  handleSubmitDisagree = (e) =>{
    e.preventDefault()
    const {
      form,
      history
    }= this.props
    const {getFieldValue} = form;
    const values = form.getFieldsValue()
    if(!getFieldValue('planId')){
      message.error('请输入作业ID')
    }
    if(!getFieldValue('userId')){
      message.error('请输入审批人ID')
    }
    if(!getFieldValue('userName')){
      message.error('请输入审批人姓名')
    }
    if(!getFieldValue('auditInfo')){
      message.error('请输入审批意见')
    }
    
    console.log(values)
    axios.post('/api/v1/user/planAudit',values)
      .then(function(response){
        if(response.status === 200){
          message.info('新建审批成功')
          axios.put(`/api/v1/user/disagreeReservePlan?id=${values.planId}&user_id=${user_id}`)
            .then(function(respose){
              message.info('审批成功')
              history.push('/entrance/approval')
            })
            .catch(function(error){
              console.log(error)
              message.info('审批失败')
            })
        }
      })
      .catch(function(error){
        console.log(error)
        message.info('新建审批失败')
      })
    
  }
  render(){
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { 
      form: { getFieldDecorator },
      match: { params : {id}}
    } = this.props
    //const {approvalDetail} = this.state
    return (
      <div>
        <PageTitle titles={['入廊作业','作业审批','新建审批']}/>      
        <div className="entrance-approval-create-page">
          <Module>
            <Form>
              <Form.Item
                {...createFormItemLayout}
                label="作业ID"
              >
                {getFieldDecorator('planId',{
                  initialValue:id,
                  rules:[{
                    required:true,
                    message:"请输入作业ID"
                  }]
                })(
                  <Input placeholder="请输入作业ID" />
                )}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="审批人ID"
              >
                {getFieldDecorator('userId',{
                  rules:[{
                    required:true,
                    message:"请输入审批人ID"
                  }]
                })(
                  <Input placeholder="请输入审批人ID（ID必须为数字）" />
                )}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="审批人名称"
              >
                {getFieldDecorator('userName',{
                  rules:[{
                    required:true,
                    message:"请输入审批人名称"
                  }]
                })(
                  <Input placeholder="请输入审批人名称" />
                )}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="审批意见"
              >
                {getFieldDecorator('auditInfo',{
                  rules:[{
                    required:true,
                    message:"请输入审批意见"
                  }]
                })(
                  <Input placeholder="请输入审批意见" />
                )}
              </Form.Item>
              <section className="operator-container">
                <div style={{textAlign:"center"}}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                    onClick={this.handleSubmitAgree}
                  >审批通过</Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    htmlType="submit"
                    type="danger"
                    size="default"
                    onClick={this.handleSubmitDisagree}
                  >不通过</Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    type="default"
                    size="default"
                    onClick={()=>{
                      const {history} = this.props
                      history.push('/entrance/approval')
                    }}
                  >取消</Button>
                </div>
              </section>
            </Form>
          </Module>
        </div>
      </div>
    );
    
      
  
  }
}

export default Form.create()(ApprovedNew);
