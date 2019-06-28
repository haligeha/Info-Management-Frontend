import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../components';
import {Button,Form,Input,Select,message} from 'antd';

import axios from 'axios';
class PathWayNew extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            planWayDetail:{},
        };
    
      }
      componentDidMount(){
        const {match : { params : { id } }} = this.props   
        console.log(id)
        if(id){
          axios.get(`/api/v1/user/userById?id=${id}`)
            .then((res) => {
              this.setState({planWayDetail:res.data})
            })
            .catch( (err) => {
              console.log(err);
            });
        }
        
      }
     
      //创建巡检路线信息
      handleSubmit = (e) => {
        e.preventDefault()
        const {
          form,
          history,
          match : { params : { id } },
        } = this.props
        const { getFieldValue } = form;
        const values = form.getFieldsValue()
        if(!getFieldValue('area')){
          message.error('请选择所属区域')
        }
        if(!getFieldValue('pipe_gallery')){
          message.error('请选择所属管廊')
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
            axios.put('/api/v1/user/user', values)
            .then(function (response) {
                if(response.status === 200){
                    message.info('编辑成功')
                    history.push('/inspection/planWay')
              }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            console.log(values)
            axios.post('/api/v1/user/user', values)
            .then(function (response) {
                if(response.status === 200){
                    message.info('创建成功')
                    history.push('/inspection/planWay')
                    
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
       
        const { planWayDetail} = this.state
        return (
          <div>
            {id ?
              <PageTitle titles={['巡检维护','巡检路线','编辑']} />
              :
              <PageTitle titles={['巡检维护','巡检路线','新建']} />
            }
            <div className="entrance-work-create-page">
              <Module>
                <Form
                  onSubmit={this.handleSubmit}
                >
                   <Form.Item
                    {...createFormItemLayout}
                    label="所属区域"
                  >
                    {getFieldDecorator('area',{
                      initialValue: id && planWayDetail.area,
                      rules:[{
                        required:true,
                        message:"请选择所属区域",
                      }]
                    })(
                        <Select
                          style={{ width: '100%' }}
                          placeholder="请选择所属区域"
                      >
                          {/* {people} */}
                      </Select>,
                    )}  
                  </Form.Item>
                   <Form.Item
                    {...createFormItemLayout}
                    label="所属管廊"
                  >
                    {getFieldDecorator('pipe_gallery',{
                      initialValue: id && planWayDetail.pipe_gallery,
                      rules:[{
                        required:true,
                        message:"请选择所属管廊",
                      }]
                    })(
                        <Select
                          style={{ width: '100%' }}
                          placeholder="请选择所属管廊"
                      >
                          {/* {people} */}
                      </Select>,
                    )}  
                  </Form.Item>
                  <Form.Item
                {...createFormItemLayout}
                label="起点"
              >
                {getFieldDecorator('startpoint',{
                  initialValue: id && planWayDetail.startpoint,
                  rules:[{
                    required:true,
                    message:"请输入起点",
                  }]
                })
                (<Input placeholder="请输入起点"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="终点"
              >
                {getFieldDecorator('endpoint',{
                  initialValue: id && planWayDetail.endpoint,
                  rules:[{
                    required:true,
                    message:"请输入终点",
                  }]
                })
                (<Input placeholder="请输入终点"/>)} 
              </Form.Item>
                  <Form.Item
                    {...createFormItemLayout}
                    label="说明描述"
                  >
                    {getFieldDecorator('description',{
                      initialValue: id && planWayDetail.description,
                      rules:[{
                        required:true,
                        message:"请输入说明描述",
                      }]
                    })
                    (<Input placeholder="请输入说明描述"/>)} 
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
                          history.push('/inspection/pathWay')
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
    

export default Form.create()(PathWayNew);