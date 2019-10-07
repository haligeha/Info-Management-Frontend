import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Button,message,} from 'antd';
import axios from 'axios';
//const Option = Select.Option;
//const dateFormat = 'YYYY-MM-DD';
var user_id=window.sessionStorage.getItem("user_id")
class ManagementNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pipeDetail:{},
    };

  }
  componentDidMount(){
    const {match : { params : { id } }} = this.props   
    console.log(id)
    if(id){
      axios.get(`/api/v1/info/pipeGallery?Id=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({pipeDetail:res.data})
        })
        .catch( (err) => {
          console.log(err);
        });
    }
    
  }
 
  //创建管廊信息
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match : { params : { id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    // if(!getFieldValue('number')){
    //   message.error('请输入管廊编号')
    // }
    if(!getFieldValue('name')){
      message.error('请输入管廊名称')
    }
    if(!getFieldValue('length')){
      message.error('请输入管廊长度')
    }
    if(!getFieldValue('unit')){
      message.error('请选择所属单位')
    }
    if(!getFieldValue('startpoint')){
      message.error('请输入起点')
    }
    if(!getFieldValue('endpoint')){
      message.error('请输入终点')
    }
    if(!getFieldValue('description')){
      message.error('请输入说明描述')
    }
    if(id){
      values.id=id
      axios.put('/api/v1/info/pipeGallery?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/pipe/management')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      console.log(values)
      axios.post('/api/v1/info/pipeGallery?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('创建成功')
            history.push('/pipe/management')
                
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
   
    const { pipeDetail} = this.state
    return (
      <div>
        {id ?
          <PageTitle titles={['管廊维护','管廊信息','编辑']} />
          :
          <PageTitle titles={['管廊维护','管廊信息','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
               
              <Form.Item
                {...createFormItemLayout}
                label="管廊名称"
              >
                {getFieldDecorator('name',{
                  initialValue: id && pipeDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入管廊名称",
                  }]
                })(
                  <Input placeholder="请输入管廊名称" />
                )}  
              </Form.Item>
              
              <Form.Item
                {...createFormItemLayout}
                label="管廊长度"
              >
                {getFieldDecorator('length',{
                  initialValue: id && pipeDetail.length,
                  rules:[{
                    required:true,
                    message:"请输入管廊长度",
                  }]
                })(<Input placeholder="请输入管廊长度"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属单位"
              >
                {getFieldDecorator('unit',{
                  initialValue: id && pipeDetail.unit,
                  rules:[{
                    required:true,
                    message:"请输入所属单位",
                  }]
                })(<Input placeholder="请输入所属单位"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="起点"
              >
                {getFieldDecorator('startpoint',{
                  initialValue: id && pipeDetail.startpoint,
                  rules:[{
                    required:true,
                    message:"请输入起点",
                  }]
                })(<Input placeholder="请输入起点"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="终点"
              >
                {getFieldDecorator('endpoint',{
                  initialValue: id && pipeDetail.endpoint,
                  rules:[{
                    required:true,
                    message:"请输入终点",
                  }]
                })(<Input placeholder="请输入终点"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="说明描述"
              >
                {getFieldDecorator('description',{
                  initialValue: id && pipeDetail.description,
                  rules:[{
                    required:true,
                    message:"请输入说明描述",
                  }]
                })(<Input placeholder="请输入说明描述"/>)} 
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
                      history.push('/pipe/management')
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

export default Form.create()(ManagementNew);