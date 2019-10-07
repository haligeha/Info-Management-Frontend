import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../../components';
import {Button,Form,Input,Select,message} from 'antd';
import { SELECT_SHELTER_CATEGORY } from '../../configs';
import './index.styl'
import axios from 'axios';
const user_id = window.sessionStorage.getItem("user_id");
class ShelterNew extends Component{
  constructor(props){
    super(props);
    this.state={
      shelterDetail:{}
    };
    
  }
  //回显当前条目信息
  componentDidMount() {
    const {match : {params : {id}}} = this.props
    if(id){
      axios.get(`/api/v1/info/place?placeId=${id}&user_id=${user_id}`)
        .then((res)=>{
          this.setState({shelterDetail:res.data})
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
      message.error('请输入避难场所名称')
    }
    if(!getFieldValue('category')){
      message.error('请选择场所类型')
    }
    if(!getFieldValue('location')){
      message.error('请输入场所地址')
    }
    if(!getFieldValue('capacity')){
      message.error('请输入场所容量')
    }
    if(!getFieldValue('affiliation')){
      message.error('所属单位（部门）')
    }
    // values.date = new Date()
    if(id){
      console.log(values)
      values.place_id = id
      axios.put('/api/v1/info/place',values)
        .then(function(response){
          if(response.status === 200){
            message.info('编辑成功')
            history.push(`/emergency/resource/shelter?user_id=${user_id}`)
          }
        })
        .catch(function(error){
          console.log(error)
        })
    }else{
      axios.post('/api/v1/info/place',values)
        .then(function(response){
          if(response.status === 200){
            message.info('创建成功')
            history.push(`/emergency/resource/shelter?user_id=${user_id}`)
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
    const {shelterDetail} = this.state
    return (
      <div>
        {id ? 
          <PageTitle titles={['应急指挥','应急资源','应急避难场所','编辑']} />
          :
          <PageTitle titles={['应急指挥','应急资源','应急避难场所','新建']} />
        }
        
        <div className="emergency-shelter-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="避难场所名称"
              >
                {getFieldDecorator('name',{
                  initialValue: id && shelterDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入避难场所名称",
                  }]
                })(
                  <Input placeholder="请输入避难场所名称" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="场所类型"
              >
                {getFieldDecorator('category',{
                  initialValue: id && shelterDetail.category,
                  rules:[{
                    required:true,
                    message:"请输入场所类型",
                  }]
                })(
                  <Select 
                    placeholder="请输入场所类型" 
                    allowClear
                  >
                    {SELECT_SHELTER_CATEGORY &&
                      SELECT_SHELTER_CATEGORY.map(cur => (
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
                label="场所地址"
              >
                {getFieldDecorator('location',{
                  initialValue: id && shelterDetail.location,
                  rules:[{
                    required:true,
                    message:"请输入场所地址",
                  }]
                })(
                  <Input placeholder="请输入场所地址" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="场所面积（㎡）"
              >
                {getFieldDecorator('area',{
                  initialValue: id && shelterDetail.area,
                  rules:[{
                    required:true,
                    message:"请输入场所面积",
                  }]
                })(
                  <Input placeholder="请输入场所面积" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="场所容量"
              >
                {getFieldDecorator('capacity',{
                  initialValue: id && shelterDetail.capacity,
                  rules:[{
                   
                    message:"请输入场所容量",
                  }]
                })(
                  <Input placeholder="请输入场所容量" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="场所简介"
              >
                {getFieldDecorator('introduction',{
                  initialValue: id && shelterDetail.introduction,
                  rules:[{
                    required:true,
                    message:"请输入场所简介",
                  }]
                })(
                  <Input placeholder="请输入场所简介" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属单位（部门）"
              >
                {getFieldDecorator('affiliation',{
                  initialValue: id && shelterDetail.affiliation,
                  rules:[{
                    required:false,
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
                  initialValue: id && shelterDetail.principal,
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
                {getFieldDecorator('telephone',{
                  initialValue: id && shelterDetail.telephone,
                  rules:[{
                    required:true,
                    message:"请输入办公电话",
                  }]
                })(
                  <Input placeholder="请输入办公电话" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="手机号码"
              >
                {getFieldDecorator('cellphone',{
                  initialValue: id && shelterDetail.cellphone,
                  rules:[{
                    required:true,
                    message:"请输入手机号码",
                  }]
                })(
                  <Input placeholder="请输入手机号码" />
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
                      history.push('/emergency/resource/shelter')
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

export default Form.create()(ShelterNew);