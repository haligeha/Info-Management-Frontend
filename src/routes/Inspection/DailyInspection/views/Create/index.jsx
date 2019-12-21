import React, { Component, } from 'react';
import { PageTitleCreate, Module } from '@src/components';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import './index.styl'
class DailyInspectionCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {

  }
  render() {
    const createFormItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    }
    const {
      form: { getFieldDecorator }
    } = this.props
    return (
      <div className="new-page">
        <PageTitleCreate titles={['巡检日志', '新建']} jump={'/inspection/calendar'} />
        <div>
          <Module>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="巡检人 ："
              >
                {getFieldDecorator('duration', {
                  // initialValue: id && entranceDetail.duration,
                  rules: [{
                    required: true,
                    message: "巡检人为必填项",
                  }]
                })(
                  <Input placeholder="请输入当前巡检人姓名" />
                )}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="施工人员数量"
              >
                {getFieldDecorator('work_number', {
                  //initialValue: id && entranceDetail.work_number,
                  rules: [{
                    required: true,
                    message: "请输入施工人员数量",
                  }]
                })(
                  <Input placeholder="请输入施工人员数量" />
                )}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="活动范围"
              >
                {getFieldDecorator('activity_range', {
                  //initialValue: id && entranceDetail.activity_range,
                  rules: [{
                    required: true,
                    message: "请选择活动区域",
                  }]
                })(
                  <Select placeholder="请选择活动区域"
                    allowClear
                  >

                  </Select>
                )}
              </Form.Item>
              <section className="operator-container">
                <div style={{ textAlign: "center" }}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                  >新建
                  </Button>
                  <Button
                    style={{ marginLeft: "28px" }}
                    size="default"
                    onClick={() => {
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

export default Form.create()(DailyInspectionCreate);

