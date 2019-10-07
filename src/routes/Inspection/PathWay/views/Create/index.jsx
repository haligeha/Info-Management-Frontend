import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../components';
import {Button,Form,Input,Select,message} from 'antd';
import axios from 'axios';

const Option = Select.Option;
var user_id=window.sessionStorage.getItem("user_id")
class PathWayNew extends Component{
  constructor(props) {
    super(props);   
    this.state = {
      planWayDetail:{},
      pipeBelong:[],
      areaBelong:[],
    };
    
  }

  componentDidMount(){
    this.getpipeBelong();
    this.getAreaBelong();
    const {match : { params : { id } }} = this.props   
    console.log(id)
    if(id){
      axios.get(`/api/v1/info/inspectionPath?id=${id}&user_id=${user_id}`)
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
    if(!getFieldValue('area_belong')){
      message.error('请选择所属区域')
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
      axios.put('/api/v1/info/inspectionPath?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            console.log("bianji")
            message.info('编辑成功')
            history.push('/inspection/pathway')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      console.log(values)
      axios.post('/api/v1/info/inspectionPath?user_id='+user_id, values)
        .then(function (response) {
          if(response.status === 200){
            message.info('创建成功')
            history.push('/inspection/pathway')
                
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  }

  //获取管廊信息
  getpipeBelong=()=>{
    console.log(user_id)
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

  //获取区域信息
  getAreaBelong=()=>{
    axios.get(`/api/v1/info/galleryAreaAll?user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          const pipeArr=res.data.AllArea
          const pipe=[]
          const children=[]
          pipeArr.forEach(function(item){
            pipe.push(item.name)
          })
          for(var i=0;i<pipe.length;i++)
            children.push(<Option value={pipe[i]}>{pipe[i]}</Option>)
          this.setState({areaBelong:children})
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
    const { 
      form: { getFieldDecorator }, 
      match : { params : { id } }
    } = this.props
    
    const { planWayDetail,pipeBelong,areaBelong} = this.state
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
                  initialValue: id && planWayDetail.area_belong,
                  rules:[{
                    required:true,
                    message:"请选择所属区域",
                  }]
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择所属区域"
                  >
                    {areaBelong}
                  </Select>,
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属管廊"
              >
                {getFieldDecorator('pipe_gallery',{
                  initialValue: id && planWayDetail.pipe_belong,
                  rules:[{
                    required:true,
                    message:"请选择所属管廊",
                  }]
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择所属管廊"
                  >
                    {pipeBelong}
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
                })(<Input placeholder="请输入起点"/>)} 
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
                })(<Input placeholder="请输入终点"/>)} 
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
                      history.push('/inspection/pathway')
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