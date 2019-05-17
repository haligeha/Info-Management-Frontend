import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../components';
import {Button,Form,Input,Select} from 'antd';
import './index.styl'
import axios from 'axios';
class EmergencyResourceNew extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[]
    };
    this.sendNewForm =this.sendNewForm.bind(this);
  }
  
  sendNewForm=()=>{    
    const emergencyResourceNew = this.props.form.getFieldsValue();      
    let dataAdd={}      
    dataAdd=emergencyResourceNew;      
    axios.post(`/api/v1/info/supplies`,dataAdd,{
      headers: {           
        'Content-Type':'application/json; charset=UTF-8'     
      }      
    })      
      .then(res=>{        
        if(res && res.status === 200){          
          console.log(res);           
        }               
      })      
      .catch(function (error) {        
        console.log(error);      
      });  
  }

  render() {
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { form: { getFieldDecorator } } = this.props
    return (
      <div>
        <PageTitle titles={['应急指挥','应急资源','新建']} />
        <div className="emergency-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="物资名称"
              >
                {getFieldDecorator('name',{
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
                  rules:[{
                    required:true,
                    message:"请输入物资类别",
                  }]
                })(
                  <Input placeholder="请输入物资类别" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="数量（件）"
              >
                {getFieldDecorator('quantity',{
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
                  initialValue:'',
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
                  initialValue:'',
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
                  initialValue:'',
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
                    onClick={this.sendNewForm}
                  >创建
                  </Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                      const {
                        history,
                      } = this.props
                      history.push('/emergency/resource/work')
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

export default Form.create()(EmergencyResourceNew);