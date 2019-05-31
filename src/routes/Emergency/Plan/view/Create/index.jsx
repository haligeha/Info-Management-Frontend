import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button,message, Upload, notification,Icon } from 'antd';
import { SELECT_EMERGENCY_PLAN_LEVEL } from '../../config';
import axios from 'axios';
import './index.styl'

class EmergencyNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planDetail:{},
      loading:false,
    };
  }

  componentDidMount(){
    const {match : { params : { id } }} = this.props
    if(id){
      axios.get(`/api/v1/info/emergencyById?emergencyId=${id}`)
        .then((res) => {
          this.setState({planDetail:res.data})
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
      match : { params : {id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    if(!getFieldValue('level')){
      message.error('请选择预案级别')
    }
    if(!getFieldValue('name')){
      message.error('请输入预案名称')
    }
    if(!getFieldValue('category')){
      message.error('请输入预案类别')
    }
    if(!getFieldValue('associated_event_type')){
      message.error('请输入预案关联事件类型')
    }
    if(!getFieldValue('associated_event_type')){
      message.error('请输入编制单位/部门')
    }
    if(!getFieldValue('release_number')){
      message.error('请输入发布文号')
    }
    if(!getFieldValue('issued')){
      message.error('请输入发布单位')
    }
    if(!getFieldValue('signer')){
      message.error('请输入签发人')
    }
    values.release_date = new Date()
    console.log(values.release_date)
    if(id){
      values.emergency_id=id
      axios.put('/api/v1/info/emergency', values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/emergency/plan')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      axios.post('/api/v1/info/emergency', values)
        .then(function (response) {
          if(response.status === 200){
            message.info('创建成功')
            history.push('/emergency/plan')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  }
  
  // beforeUpload=(file)=>{
  //   const{size}=file
  //   const fileSize = size/(1024*1024)
  //   if(fileSize>30){
  //     message.error("文件大小不能超过30M")
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }

  // deleteFile = ()=>{
  //   this.setState({uploadFilesName:'还未选择文件'})
  // }
  
  // handleChange = info => {
  //   const file = info.file
  //   console.log(this.state)
  //   if(file.status == 'uploading' && this.state.loading == false){
  //     this.setState({ loading:true })
  //   }
  //   if(file.status == 'done'){
  //     if(file.response && file.response.status== 10000){
  //       notification.succss({
  //         message:`${file.name}上传成功`,
  //       })
  //       this.setState({userTagId:file.response.data.upLoadFileId,uploadFilesName:file.name})
  //     }else{
  //       notification.error({
  //         message:`${file.name}上传失败`
  //       })
  //     }
  //     this.setState({loading:false})
  //   }else if(info.file.status == 'error'){
  //     this.setState({loading:false})
  //     notification.error({
  //       message:`${file.name}上传失败`
  //     })
  //   }
  // }

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
    const { planDetail} = this.state
    // const uploadProps={
    //   action:`/api/v1/info/uploadFile?type=0&id=${id}`,
    //   data: function(){
    //     $.ajax({
    //       url:'/api/v1/info/uploadFile?type=0&id=${id}',
    //       type: 'GET',
    //       dataType: 'json',
    //       data: values,
    //       async:false,
    //       success: function(map){
    //         token = map.data.token;
    //         key = map.data.filename;
    //       }
    //     });
    //     axios.post(`/api/v1/info/emergencyById?emergencyId=${id}`)
    //     .then((res) => {
    //       this.setState({planDetail:res.data})
    //     })
    //     .catch( (err) => {
    //       console.log(err);
    //     });
    //     return{
    //         key: key,
    //         token: token
    //     }
    // },
    //   onChange:this.handleChange
    // };
    
    return (
      <div>
        {id ?
          <PageTitle titles={['应急指挥','应急预案','编辑']} />
          :
          <PageTitle titles={['应急指挥','应急预案','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
                <Form.Item
                {...createFormItemLayout}
                label="预案级别"
              >
                {getFieldDecorator('level',{
                  initialValue: id && planDetail.level,
                  rules:[{
                    required:true,
                    message:"请选择预案级别",
                  }]
                })(
                  <Select placeholder="请选择预案级别"
                    allowClear
                  >
                    {SELECT_EMERGENCY_PLAN_LEVEL &&
                      SELECT_EMERGENCY_PLAN_LEVEL.map(cur => (
                        <Select.Option key={cur.id}
                          value={cur.id}
                        >{cur.name}</Select.Option>
                      ))

                    }
                  </Select>
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预案名称"
              >
                {getFieldDecorator('name',{
                  initialValue: id && planDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入预案名称",
                  }]
                })(
                  <Input placeholder="请输入预案名称" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预案类别"
              >
                {getFieldDecorator('category',{
                   initialValue: id && planDetail.category,
                  rules:[{
                    required:true,
                    message:"请输入预案类别",
                  }]
                })(
                  <Input placeholder="请输入预案类别" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预案关联事件类型"
              >
                {getFieldDecorator('associated_event_type',{
                  initialValue: id && planDetail.associated_event_type,
                  rules:[{
                    required:true,
                    message:"请输入预案关联事件类型",
                  }]
                })(
                  <Input placeholder="请输入预案关联事件类型" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预案内容"
              >
                {getFieldDecorator('content',{
                  initialValue: id && planDetail.content,
                  rules:[{
                 //   required:true,
                    message:"请输入预案内容",
                  }]
                })(
                  // <Upload
                  // className="upload"
                  // accept="text/csv,text/plain"
                  // {...uploadProps}
                  // defaultFileList={this.state.uploadFiles}
                  // beforeUpload={this.beforeUpload}
                  // showUploadList={false}
                  // >
                  //   <Button>
                  //     <Icon type="upload"/>上传文件
                  //   </Button>
                  // </Upload>
                  <Input placeholder="请输入发布单位" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="编制单位/部门"
              >
                {getFieldDecorator('department',{
                  initialValue: id && planDetail.department,
                  rules:[{
                    required:true,
                    message:"请输入编制单位/部门",
                  }]
                })(
                  <Input placeholder="请输入编制单位/部门" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="发布文号"
              >
                {getFieldDecorator('release_number',{
                  initialValue: id && planDetail.release_number,
                  rules:[{
                    required:true,
                    message:"请输入发布文号",
                  }]
                })(
                  <Input placeholder="请输入发布文号" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="发布单位"
              >
                {getFieldDecorator('issued',{
                  initialValue: id && planDetail.issued,
                  rules:[{
                    required:true,
                    message:"请输入发布单位",
                  }]
                })(
                  <Input placeholder="请输入发布单位" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="请输入签发人"
              >
                {getFieldDecorator('signer',{
                  initialValue:id && planDetail.signer,
                  rules:[{
                    required:true,
                    message:"请输入签发人",
                  }]
                })(
                  <Input placeholder="请输入签发人" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="相关附件"
              >
                {getFieldDecorator('file',{
                  initialValue: id && planDetail.file,
                  rules:[{
                  //  required:true,
                    message:"请输入相关附件",
                  }]
                })(
                  <Input placeholder="请输入相关附件" />
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
                      history.push('/emergency/plan')
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

export default Form.create()(EmergencyNew);
