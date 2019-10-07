import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../../components';
import {Button,Form,Input,Select,message} from 'antd';
import { SELECT_MATERIAL_CATEGORY } from '../../configs';
import './index.styl'
import axios from 'axios';
const user_id = window.sessionStorage.getItem("user_id");
class MaterialNew extends Component{
  constructor(props){
    super(props);
    this.state={
      materialDetail:{}
    };
    
  }
  //回显当前条目信息
  componentDidMount() {
    const {match : {params : {id}}} = this.props
    if(id){
      axios.get(`/api/v1/info/supplies?supplyId=${id}&user_id=${user_id}`)
        .then((res)=>{
          this.setState({materialDetail:res.data})
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
      message.error('请输入物资名称')
    }
    if(!getFieldValue('category')){
      message.error('请选择物资类别')
    }
    if(!getFieldValue('quantity')){
      message.error('请输入物资数量')
    }
    if(!getFieldValue('model')){
      message.error('请输入物资型号')
    }
    if(!getFieldValue('name')){
      message.error('请输入物资名称')
    }
    if(!getFieldValue('location')){
      message.error('请输入存放地点')
    }
    // values.date = new Date()
    if(id){
      console.log(values)
      values.supply_id = id
      axios.put('/api/v1/info/supplies',values)
        .then(function(response){
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/emergency/resource/material')
          }
        })
        .catch(function(error){
          console.log(error)
        })
    }else{
      axios.post('/api/v1/info/supplies',values)
        .then(function(response){
          if(response.status === 200){
            message.info('创建成功')
            history.push('/emergency/resource/material')
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
    const {materialDetail} = this.state
    return (
      <div>
        {id ? 
          <PageTitle titles={['应急指挥','应急资源','应急救援物资','编辑']} />
          :
          <PageTitle titles={['应急指挥','应急资源','应急救援物资','新建']} />
        }
        
        <div className="emergency-material-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="物资名称"
              >
                {getFieldDecorator('name',{
                  initialValue: id && materialDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入物资名称",
                  }]
                })(
                  <Input placeholder="请输入物资名称" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="物资类别"
              >
                {getFieldDecorator('category',{
                  initialValue: id && materialDetail.category,
                  rules:[{
                    required:true,
                    message:"请输入物资类别",
                  }]
                })(
                  <Select 
                    placeholder="请输入物资类别" 
                    allowClear
                  >
                    {SELECT_MATERIAL_CATEGORY &&
                      SELECT_MATERIAL_CATEGORY.map(cur => (
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
                label="数量（件）"
              >
                {getFieldDecorator('quantity',{
                  initialValue: id && materialDetail.quantity,
                  rules:[{
                    required:true,
                    message:"请输入物资数量",
                  }]
                })(
                  <Input placeholder="请输入物资数量" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="型号"
              >
                {getFieldDecorator('model',{
                  initialValue: id && materialDetail.model,
                  rules:[{
                    required:true,
                    message:"请输入物资型号",
                  }]
                })(
                  <Input placeholder="请输入物资型号" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="购入日期"
              >
                {getFieldDecorator('purchase_date',{
                  initialValue: id && materialDetail.purchase_date,
                  rules:[{
                   
                    message:"请输入购入日期",
                  }]
                })(
                  <Input placeholder="请输入购入日期" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="生产厂家"
              >
                {getFieldDecorator('manufacturer',{
                  initialValue: id && materialDetail.manufacturer,
                  rules:[{
                    required:true,
                    message:"请输入生产厂家",
                  }]
                })(
                  <Input placeholder="请输入生产厂家" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="出厂日期"
              >
                {getFieldDecorator('manufacturer_date',{
                  initialValue: id && materialDetail.manufacturer_date,
                  rules:[{
                    required:false,
                    message:"请输入出厂日期",
                  }]
                })(
                  <Input placeholder="请输入出厂日期" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="有效期至"
              >
                {getFieldDecorator('valid_until',{
                  initialValue: id && materialDetail.valid_until,
                  rules:[{
                    required:false,
                    message:"请输入有效期",
                  }]
                })(
                  <Input placeholder="请输入有效期" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="用途说明"
              >
                {getFieldDecorator('use_description',{
                  initialValue: id && materialDetail.use_description,
                  rules:[{
                    required:true,
                    message:"请输入用途说明",
                  }]
                })(
                  <Input placeholder="请输入用途说明" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="性能说明"
              >
                {getFieldDecorator('performance_description',{
                  initialValue: id && materialDetail.performance_description,
                  rules:[{
                    required:true,
                    message:"请输入性能说明",
                  }]
                })(
                  <Input placeholder="请输入性能说明" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属单位"
              >
                {getFieldDecorator('affiliation',{
                  initialValue: id && materialDetail.affiliation,
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
                label="存放地点"
              >
                {getFieldDecorator('location',{
                  initialValue: id && materialDetail.location,
                  rules:[{
                    required:true,
                    message:"请输入存放地点",
                  }]
                })(
                  <Input placeholder="请输入存放地点" />
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
                      history.push('/emergency/resource/material')
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

export default Form.create()(MaterialNew);