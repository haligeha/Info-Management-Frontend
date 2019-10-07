import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button,message } from 'antd';
import axios from 'axios';


class DeviceNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceDetail:{}
    };
  }
  componentDidMount(){
    const {match : { params : { id } }} = this.props
    if(id){
      axios.get(`/api/v1/info/entranceWorkById?entranceId=${id}`)
        .then((res) => {
          this.setState({deviceDetail:res.data})
        })
        .catch( (err) => {
          console.log(err);
        });
    }
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
    const values = form.getFieldsValue()
    if(!getFieldValue('deviceName')){
      message.error('请输入设备名称')
    }
    if(!getFieldValue('DeivceId')){
      message.error('请输入设备编号')
    }
    if(!getFieldValue('PipeGallery')){
      message.error('请选择管廊区域')
    }
    if(!getFieldValue('Latitude')){
      message.error('请输入设备经度')
    }
    if(!getFieldValue('Longitude')){
      message.error('请输入设备纬度')
    }
    if(!getFieldValue('Description')){
      message.error('请输入描述说明')
    }
    values.date = new Date()
    console.log(values)
    if(id){
      axios.put('/api/v1/info/entranceWork', values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/entrance/work')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      values.id=id
      axios.post('/api/v1/info/entranceWork', values)
        .then(function (response) {
          if(response.status === 200){
            message.info('创建成功')
            history.push('/entrance/work')
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
    console.log(id)
    const { deviceDetail } = this.state
    return (
      <div>
        {id ?
          <PageTitle titles={['监督预测','设备信息','编辑']} />
          :
          <PageTitle titles={['监督预测','设备信息','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="设备名称"
              >
                {getFieldDecorator('deviceName',{
                  initialValue: id && deviceDetail.deviceName,
                  rules:[{
                    required:true,
                    message:"请输入设备名称",
                  }]
                })(
                  <Input placeholder="请输入设备名称" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备编号"
              >
                {getFieldDecorator('DeivceId',{
                  initialValue: id && deviceDetail.DeivceId,
                  rules:[{
                    required:true,
                    message:"请输入设备编号",
                  }]
                })(
                  <Input placeholder="请输入设备编号" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="管廊区域"
              >
                {getFieldDecorator('pipeGallery',{
                  initialValue: id && deviceDetail.pipeGallery,
                  rules:[{
                    required:true,
                    message:"请选择管廊区域",
                  }]
                })(
                  <Select placeholder="请选择管廊区域"
                    allowClear
                  >
                  
                  </Select>
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备经度"
              >
                {getFieldDecorator('Latitude',{
                  initialValue: id && deviceDetail.Latitude,
                  rules:[{
                    required:true,
                    message:"请输入设备经度",
                  }]
                })(
                  <Input placeholder="请输入设备经度" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备纬度"
              >
                {getFieldDecorator('Longitude',{
                  initialValue: id && deviceDetail.Longitude,
                  rules:[{
                    required:true,
                    message:"请输入设备纬度",
                  }]
                })(
                  <Input placeholder="请输入设备纬度" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="描述说明"
              >
                {getFieldDecorator('Description',{
                  initialValue: id && deviceDetail.Description,
                  rules:[{
                    required:true,
                    message:"请输入描述说明",
                  }]
                })(
                  <Input placeholder="请输入描述说明" />
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
                      history.push('/monitor/device')
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

export default Form.create()(DeviceNew);