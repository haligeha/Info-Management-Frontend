import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../../components';
import {Button,Form,Input,Select,message} from 'antd';
import { SELECT_TEAM_CATEGORY } from '../../configs';
import './index.styl'
import axios from 'axios';
const user_id = window.sessionStorage.getItem("user_id");
class RescueTeamNew extends Component{
  constructor(props){
    super(props);
    this.state={
      teamDetail:{}
    };
    
  }
  //回显当前条目信息
  componentDidMount() {
    const {match : {params : {id}}} = this.props
    if(id){
      axios.get(`/api/v1/info/team?teamId=${id}&user_id=${user_id}`)
        .then((res)=>{
          this.setState({teamDetail:res.data})
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
  //创建或更新
  handleSubmit = (e) =>{
    e.preventDefault()
    const {
      form,
      history,
      match: {params : {id}}
    }= this.props
    const {getFieldValue} = form;
    const values = form.getFieldsValue()
    if(!getFieldValue('name')){
      message.error('请输入队伍名称')
    }
    if(!getFieldValue('category')){
      message.error('请选择队伍类别')
    }
    if(!getFieldValue('level')){
      message.error('请输入队伍级别')
    }
    if(!getFieldValue('principal')){
      message.error('请输入负责人')
    }
    if(!getFieldValue('affiliation')){
      message.error('请输入所属部门')
    }
    // values.date = new Date()
    if(id){
      console.log(values)
      values.team_id = id
      axios.put('/api/v1/info/team',values)
        .then(function(response){
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/emergency/resource/team')
          }
        })
        .catch(function(error){
          console.log(error)
        })
    }else{
      axios.post('/api/v1/info/team',values)
        .then(function(response){
          if(response.status === 200){
            message.info('创建成功')
            history.push('/emergency/resource/team')
          }
        })
        .catch(function(error){
          console.log(error)
        })
    }
  }

  render() {
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { 
      form: { getFieldDecorator },
      match: { params : {id}}
    } = this.props
    const {teamDetail} = this.state
    return (
      <div>
        {id ? 
          <PageTitle titles={['应急指挥','应急资源','应急救援队伍','编辑']} />
          :
          <PageTitle titles={['应急指挥','应急资源','应急救援队伍','新建']} />
        }
        
        <div className="emergency-team-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="队伍名称"
              >
                {getFieldDecorator('name',{
                  initialValue: id && teamDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入队伍名称",
                  }]
                })(
                  <Input placeholder="请输入队伍名称" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="队伍类别"
              >
                {getFieldDecorator('category',{
                  initialValue: id && teamDetail.category,
                  rules:[{
                    required:true,
                    message:"请输入队伍类别",
                  }]
                })(
                  <Select 
                    placeholder="请输入队伍类别" 
                    allowClear
                  >
                    {SELECT_TEAM_CATEGORY &&
                      SELECT_TEAM_CATEGORY.map(cur => (
                        <Select.Option key={cur.id}
                          value={cur.name}
                        >{cur.name}</Select.Option>
                          
                      ))
                    
                    }
                  </Select>
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="队伍级别"
              >
                {getFieldDecorator('level',{
                  initialValue: id && teamDetail.level,
                  rules:[{
                    required:true,
                    message:"请输入队伍级别",
                  }]
                })(
                  <Input placeholder="请输入队伍级别" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="救援专业"
              >
                {getFieldDecorator('specialty',{
                  initialValue: id && teamDetail.specialty,
                  rules:[{
                    required:true,
                    message:"请输入救援专业",
                  }]
                })(
                  <Input placeholder="请输入救援专业" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="队伍简介"
              >
                {getFieldDecorator('introduction',{
                  initialValue: id && teamDetail.introduction,
                  rules:[{
                   
                    message:"请输入队伍简介",
                  }]
                })(
                  <Input placeholder="请输入队伍简介" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属单位（部门）"
              >
                {getFieldDecorator('affiliation',{
                  initialValue: id && teamDetail.affiliation,
                  rules:[{
                    required:true,
                    message:"请输入所属单位",
                  }]
                })(
                  <Input placeholder="请输入所属单位" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="负责人"
              >
                {getFieldDecorator('principal',{
                  initialValue: id && teamDetail.principal,
                  rules:[{
                    required:false,
                    message:"请输入负责人",
                  }]
                })(
                  <Input placeholder="请输入负责人" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="办公电话"
              >
                {getFieldDecorator('phone',{
                  initialValue: id && teamDetail.phone,
                  rules:[{
                    required:false,
                    message:"请输入办公电话",
                  }]
                })(
                  <Input placeholder="请输入办公电话" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="队伍所在地址"
              >
                {getFieldDecorator('location',{
                  initialValue: id && teamDetail.location,
                  rules:[{
                    required:true,
                    message:"请输入队伍所在地址",
                  }]
                })(
                  <Input placeholder="请输入队伍所在地址" />
                )}  
              </Form.Item>
              <section className="operator-container">
                <div style={{textAlign:"center"}}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                  >{id?'编辑':'创建'}
                  </Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                      const {
                        history,
                      } = this.props
                      history.push('/emergency/resource/team')
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

export default Form.create()(RescueTeamNew);