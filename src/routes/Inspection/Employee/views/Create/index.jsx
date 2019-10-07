import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Button,message,} from 'antd';
import axios from 'axios';
//const Option = Select.Option;
//const dateFormat = 'YYYY-MM-DD';

class EmployeeNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeDetail:{},
    };

  }
  componentDidMount(){
    const {match : { params : { id } }} = this.props   
    console.log(id)
    if(id){
      axios.get(`/api/v1/user/userById?id=${id}`)
        .then((res) => {
          this.setState({employeeDetail:res.data})
        })
        .catch( (err) => {
          console.log(err);
        });
    }
    
  }
 
  //创建员工信息
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
      message.error('请输入员工姓名')
    }
    if(!getFieldValue('email')){
      message.error('请输入电子邮箱')
    }

    if(id){
      values.id=id
      axios.put('/api/v1/user/user', values)
        .then(function (response) {
          if(response.status === 200){
            message.info('编辑成功')
            history.push('/inspection/employee')
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
            history.push('/inspection/employee')
                
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
   
    const { employeeDetail} = this.state
    return (
      <div>
        {id ?
          <PageTitle titles={['巡检维护','员工信息','编辑']} />
          :
          <PageTitle titles={['巡检维护','员工信息','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="员工姓名"
              >
                {getFieldDecorator('name',{
                  initialValue: id && employeeDetail.name,
                  rules:[{
                    required:true,
                    message:"请输入员工姓名",
                  }]
                })(
                  <Input placeholder="请输入员工姓名" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="电子邮箱"
              >
                {getFieldDecorator('email',{
                  initialValue: id && employeeDetail.email,
                  rules:[{
                    required:true,
                    message:"请输入电子邮箱",
                  }]
                })(<Input placeholder="请输入电子邮箱" type="email"/>)} 
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
                      history.push('/inspection/employee')
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

export default Form.create()(EmployeeNew);