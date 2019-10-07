import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button,message, Upload, Icon } from 'antd';
import { SELECT_EMERGENCY_PLAN_LEVEL } from '../../config';
import axios from 'axios';
import './index.styl'

var value=window.sessionStorage.getItem("user_id")
class EmergencyNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planDetail:{},
      fileList:[],   
      uploadFiles:'',
      url:'',
      attachFileList:[],
      uploadAttachFiles:'',
      attachUrl:'',
    };
  }

  componentDidMount(){
    const {match : { params : { id } }} = this.props
   
    console.log(value)
    if(id){
      axios.get(`/api/v1/info/emergencyById?emergencyId=${id}&user_id=${value}`)
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
    console.log(this.props)
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    var path=this.state.url
    var attachPath=this.state.attachUrl
    var str1 = path.replace('.', '/');
    var str2=attachPath.replace('.', '/');
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
    if(id){
      values.emergency_id=id
      values.content=str1
      values.file=str2
      axios.put('/api/v1/info/emergency?user_id='+value, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/emergency/plan')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(this.state.fileList)
    }else{
      values.content=str1
      axios.post('/api/v1/info/emergency?user_id='+value, values)
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

  //文件下载
  downLoadFile=()=>{
    const {
      form,
    } = this.props
    var path=this.state.url
    var str1 = path.replace('.', '/');
    console.log(str1)
    //const { getFieldValue } = form;
    const values = form.getFieldsValue()
    console.log(values.content)
    window.open('/api/v1/info/download/'+values.content+'?user_id='+value);
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

  //文件展示
  // showFile=(i)=>{
  //   axios.get('/api/v1/info/showFile/'+i+'/0')
  //   .then((res) => {
  //     console.log(res.data.filenames);
  //     return (
  //       <Icon type="file">{res.data.filenames}</Icon>
  //     )
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  
  //附件下载
  downLoadAttachFile=()=>{
      const {
        form,
      } = this.props
      var path=this.state.attachUrl
      var str1 = path.replace('.', '/');
      console.log(str1)
      //const { getFieldValue } = form;
      const values = form.getFieldsValue()
      console.log(values.file)
      window.open('/api/v1/info/download/'+values.file+'?user_id='+value);
    }
 
  //删除预案
  removeFile=()=>{
    const {
      form,
    } = this.props
    //const { getFieldValue } = form;
    const values = form.getFieldsValue()
    console.log(values.content)
    axios.delete(`/api/v1/info/delete/`+values.content+'?user_id='+value)
      .then(() => {
        message.success(`删除成功！`);
      })
      .catch( (err) => {
        message.error(`请上传文件！`);
      });
  }
 
  //删除附件
  removeFile=()=>{
    const {
      form,
    } = this.props
    const values = form.getFieldsValue()
    console.log(values.file)
    axios.delete(`/api/v1/info/delete/`+values.file+'?user_id='+value)
      .then(() => {
        message.success(`删除成功！`);
      })
      .catch( (err) => {
        message.error(`请上传文件！`);
      });
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
    const { planDetail} = this.state
    const fileName=this.props.form.getFieldValue('name')? this.props.form.getFieldValue('name'):planDetail.name 
    const uploadProps={
      action:`/api/v1/info/uploadFile?type=0&name=${fileName}&user_id=${value}`,
      onChange:(info)=>{
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // } 
        if (info.file.status === 'uploading') {
          console.log(info.file, info.fileList);
          this.setState({
            file:info.file,
            fileList:info.fileList,
            url:fileName+"/0/"+info.file.name,
          })
        } 
        else if (info.file.status === 'done') {
          console.log("done")
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败！`);
        }
        else{
          console.log(info.file.status)
        }
        return  uploadProps;
      },
    //   onRemove:()=>{
    //     this.setState({
    //       fileList:[],
    //       uploadPath : ''
    //     })
    //     axios.delete(`/api/v1/info/delete/${fileName}/0/${this.file.name}/doc`)
    //     .then(() => {
    //       this.getGroupList(this.state.nowCurrent)
    //     })
    //     .catch( (err) => {
    //       console.log(err);
    //     });
    // }   
    };
    const uploadAttachProps={
      action:`/api/v1/info/uploadFile?type=1&name=${fileName}&user_id=${value}`,
      onChange:(info)=>{
        if (info.file.status === 'uploading') {
          console.log(info.file, info.fileList);
          this.setState({
            file:info.file,
            attachFileList:info.fileList,
            attachUrl:fileName+"/1/"+info.file.name,
          })
        } 
        else if (info.file.status === 'done') {
          console.log("done")
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败！`);
        }
        else{
          console.log(info.file.status)
        }
        return  uploadAttachProps;
      },
    }
    
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
                  <div>         
                    <Upload
                      className="upload"
                      accept=".pdf,.doc"
                      {...uploadProps}
                      defaultFileList={this.state.uploadFiles} 
                      previewFile={this.preview}
                      onRemove = {this.removeFile}   //移除文件事件
                    // fileList={this.state.fileList}
                    >
                      <Button>
                        <Icon type="upload"/>上传文件
                      </Button>      
                    </Upload>
                    <Button onClick={this.downLoadFile}>
                      <Icon type="download"/>下载文件
                    </Button>
                    <Button onClick={this.removeFile}>
                      <Icon type="delete"/>文件删除
                    </Button>
                  </div>
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
                  <div>         
                    <Upload
                      className="upload"
                      accept=".pdf,.doc"
                      {...uploadAttachProps}
                      defaultFileList={this.state.uploadAttachFiles} 
                      previewFile={this.attachPreview}
                      onRemove = {this.removeAttachFile}   //移除文件事件
                    // fileList={this.state.fileList}
                    >
                      <Button>
                        <Icon type="upload"/>上传文件
                      </Button>      
                    </Upload>
                    <Button onClick={this.downLoadAttachFile}>
                      <Icon type="download"/>下载文件
                    </Button>
                    <Button onClick={this.removeAttachFile}>
                      <Icon type="delete"/>文件删除
                    </Button>
                    </div>
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
