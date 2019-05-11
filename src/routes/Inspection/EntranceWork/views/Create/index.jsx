import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Form,Input,Select,Button } from 'antd';
import { SELECT_HOME_WORK_NUM } from '../../configs'
import './index.styl'

class EntranceWorkNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { form: { getFieldDecorator } } = this.props
    return (
      <div>
        <PageTitle titles={['巡检维护','入廊作业','新建']} />
        <div className="entrance-work-create-page">
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="工期（天）"
              >
                {getFieldDecorator('time',{
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
                {getFieldDecorator('number',{
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
                {getFieldDecorator('ares',{
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
                          value={cur.id}
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

export default Form.create()(EntranceWorkNew);

