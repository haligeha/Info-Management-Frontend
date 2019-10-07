import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button,message } from 'antd';
import { SELECT_HOME_WORK_NUM } from '../../configs';
import axios from 'axios';
import './index.styl'
const user_id = window.sessionStorage.getItem("user_id");
class EntranceWorkNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entranceDetail:{}
    };
  }
  componentDidMount(){
    const {match : { params : { id } }} = this.props
    if(id){
      axios.get(`/api/v1/info/entranceWorkById?entranceId=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({entranceDetail:res.data})
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
    console.log(getFieldValue('duration'))
    const values = form.getFieldsValue()
    if(!getFieldValue('duration')){
      message.error('请输入工期')
    }
    if(!getFieldValue('work_number')){
      message.error('请输入施工数量')
    }
    if(!getFieldValue('activity_range')){
      message.error('请选择活动范围')
    }
    values.date = new Date()
    console.log(values)
    if(id){
      
      values.id = id
      axios.put(`/api/v1/info/entranceWork?user_id=${user_id}`, values)
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
      axios.post(`/api/v1/info/entranceWork?user_id=${user_id}`, values)
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
    const { entranceDetail } = this.state
    return (
      <div>
        {id ?
          <PageTitle titles={['巡检维护','入廊作业','编辑']} />
          :
          <PageTitle titles={['巡检维护','入廊作业','新建']} />
        }
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="工期（天）"
              >
                {getFieldDecorator('duration',{
                  initialValue: id && entranceDetail.duration,
                  rules:[{
                    required:true,
                    message:"请输入工期",
                  }]
                })(
                  <Input placeholder="请输入工期" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="施工人员数量"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && entranceDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入施工人员数量",
                  }]
                })(
                  <Input placeholder="请输入施工人员数量" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="活动范围"
              >
                {getFieldDecorator('activity_range',{
                  initialValue: id && entranceDetail.activity_range,
                  rules:[{
                    required:true,
                    message:"请选择活动区域",
                  }]
                })(
                  <Select placeholder="请选择活动区域"
                    allowClear
                  >
                    {SELECT_HOME_WORK_NUM &&
                      SELECT_HOME_WORK_NUM.map(cur => (
                        <Select.Option key={cur.id}
                          value={cur.name}
                        >{cur.name}</Select.Option>
                      ))

                    }
                  </Select>
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
                      history.push('/entrance/work')
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

export default Form.create()(EntranceWorkNew);

