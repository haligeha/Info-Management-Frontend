import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button,message,} from 'antd';
import axios from 'axios';
const Option = Select.Option;
//const dateFormat = 'YYYY-MM-DD';
var user_id=window.sessionStorage.getItem("user_id")
class AreaNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaDetail:{},
      pipeBelong:[],
    };

  }
  componentDidMount(){
    this.getpipeBelong();
    const {match : { params : { id } }} = this.props   
    console.log(id)
    if(id){
      axios.get(`/api/v1/info/galleryArea?Id=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({areaDetail:res.data})
        })
        .catch( (err) => {
          console.log(err);
        });
    }
    
  }
 
  //获取管廊区域信息
  getpipeBelong=()=>{
    axios.get(`/api/v1/info/pipeGalleryAll?user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          const pipeArr=res.data.AllPipes
          const pipe=[]
          const children=[]
          pipeArr.forEach(function(item){
            pipe.push(item.name)
          })
          for(var i=0;i<pipe.length;i++)
            children.push(<Option value={pipe[i]}>{pipe[i]}</Option>)
          this.setState({pipeBelong:children})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }


  //创建区域信息
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match : { params : { id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    if(!getFieldValue('name')){
      message.error('请输入区域名称')
    }
    if(!getFieldValue('length')){
      message.error('请输入区域长度')
    }
    if(!getFieldValue('pipe_belong')){
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
      axios.put('/api/v1/info/galleryArea?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/pipe/area')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      console.log(values)
      axios.post('/api/v1/info/galleryArea?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('创建成功')
            history.push('/pipe/area')
                
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
   
    const { areaDetail,pipeBelong} = this.state
    return (
      <div>
        {id ?
          <PageTitle titles={['管廊维护','管廊区域信息','编辑']} />
          :
          <PageTitle titles={['管廊维护','管廊区域信息','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
              
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="区域名称"
              >
                {getFieldDecorator('name',{
                  initialValue: id && areaDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入区域名称",
                  }]
                })(
                  <Input placeholder="请输入区域名称" />
                )}  
              </Form.Item>
              {/* <Form.Item
                {...createFormItemLayout}
                label="区域编号"
              >
                {getFieldDecorator('number',{
                  initialValue: id && pipeDetail.number,
                  rules:[{
                    required:true,
                    message:"请输入区域编号",
                  }]
                })(
                  <Input placeholder="请输入区域编号" />
                )}  
              </Form.Item> */}
              <Form.Item
                {...createFormItemLayout}
                label="区域长度"
              >
                {getFieldDecorator('length',{
                  initialValue: id && areaDetail.length,
                  rules:[{
                    required:true,
                    message:"请输入区域长度",
                  }]
                })(<Input placeholder="请输入区域长度"/>)} 
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属管廊"
              >
                {getFieldDecorator('pipe_belong',{
                  initialValue: id && areaDetail.pipe_belong,
                  rules:[{
                    required:true,
                    message:"请选择所属管廊",
                  }]
                })(<Select
                  //  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择所属管廊"
                >
                  {pipeBelong}
                </Select>,)} 
                {/* //(<Input placeholder="请输入管廊区域"/>)}  */}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="起点"
              >
                {getFieldDecorator('startpoint',{
                  initialValue: id && areaDetail.startpoint,
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
                  initialValue: id && areaDetail.endpoint,
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
                  initialValue: id && areaDetail.description,
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
                      history.push('/pipe/area')
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

export default Form.create()(AreaNew);