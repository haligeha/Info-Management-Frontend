import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button } from 'antd';
import axios from 'axios';
import './index.styl'

class EmergencyNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param:props.location.state,
      data:[],
    };
  //  console.log("state-----:",this.props.location.state.id)
  //  this.getInfoById = this.getInfoById .bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
   // this.getInfoById();
  }

  // getInfoById=()=>{
  //   const { param } = this.state;
  //   if(param.id === undefined || param.id ===null){

  //   }
  //   else{
  //     axios.get(`/api/v1/info/emergencyById?emergencyId=${param.id}`)
  //     .then((res) => {
  //       if(res && res.status === 200){
  //         console.log(res);
  //         this.setState({
  //           searchContent: res.data,
  //         });
  //         const { searchContent } = this.state;
  //         const {getFieldDecorator} = this.props.form;
  //         getFieldDecorator=searchContent
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   }
  // }

  handleSubmit=()=>{
    let emergencyPlanNew = this.props.form.getFieldsValue();
   // this.props.form.validateFields((err,values)=>{
    //    if(!err){
            let dataAdd={}
            dataAdd=emergencyPlanNew;
       //     let dataAddObj=JSON.stringify(dataAdd);
       //     console.log(dataAddObj)
            axios.post(`http://10.112.217.199:8100/api/v1/info/emergency`,dataAdd,{
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
  //      }
  //  })
  }

  render() {

    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const {param} = this.state
   
    const { form: { getFieldDecorator } } = this.props
    return (
      <div>
        <PageTitle titles={['应急指挥','应急预案','新建']} />
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="预案名称"
              >
                {getFieldDecorator('name',{
                  initialValue:'',
                  rules:[{
                 //   required:true,
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
                  initialValue:'',
                  rules:[{
                  //  required:true,
                    message:"请输入预案类别",
                  }]
                })(
                  <Input placeholder="请输入预案类别" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预案级别"
              >
                {getFieldDecorator('level',{
                  initialValue:'',
                  rules:[{
                 //   required:true,
                    message:"请输入预案级别",
                  }]
                })(
                  <Input placeholder="请输入预案级别" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预案关联事件类型"
              >
                {getFieldDecorator('associated_event_type',{
                  initialValue:'',
                  rules:[{
            //        required:true,
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
                  initialValue:'',
                  rules:[{
                 //   required:true,
                    message:"请输入预案内容",
                  }]
                })(
                  <Input placeholder="请输入预案内容" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="编制单位/部门"
              >
                {getFieldDecorator('department',{
                  initialValue:'',
                  rules:[{
            //        required:true,
                    message:"请输入编制单位/部门",
                  }]
                })(
                  <Input placeholder="请输入编制单位/部门" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="发布日期"
              >
                {getFieldDecorator('release_date',{
                  initialValue:'',
                  rules:[{
            //        required:true,
                    message:"请输入发布日期",
                  }]
                })(
                  <Input placeholder="请输入发布日期" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="发布文号"
              >
                {getFieldDecorator('release_number',{
                  initialValue:'',
                  rules:[{
                //    required:true,
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
                  initialValue:'',
                  rules:[{
                    //required:true,
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
                  initialValue:'',
                  rules:[{
                  //  required:true,
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
                  initialValue:'',
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
                    onClick={this.handleSubmit}
                  >创建
                  </Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                      const {
                        history,
                      } = this.props
                      history.push('/inspection/entrance/work')
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
