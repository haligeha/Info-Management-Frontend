import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import { Form, Input, Select, Button, Row, Col, Icon } from 'antd';
import {
  SELECT_HOME_WORK_NUM,
  SELECT_INSPECTION_STATUS
} from '../../configs';
import './index.styl'
const { TextArea } = Input;
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
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    }
    const {
      form: { getFieldDecorator }
    } = this.props
    return (
      <div className="inspection-log">
        <PageTitleCreate titles={['巡检日志', '新建']} jump={'/inspection/calendar'} />
        <div className="inspection-log-left">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...createFormItemLayout}
              label="巡检人："
            >
              {getFieldDecorator('duration', {
                // initialValue: id && entranceDetail.duration,
                rules: [{
                  required: true,
                  message: "巡检人为必填项",
                }]
              })(
                <Select placeholder="请选择活动区域"
                  allowClear
                >
                  {
                    SELECT_HOME_WORK_NUM &&
                    SELECT_HOME_WORK_NUM.map(cur => (
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
              label="巡检总况"
            >
              {getFieldDecorator('work_number', {
                //initialValue: id && entranceDetail.work_number,
                rules: [{
                  required: true,
                  message: "请选择巡检总况",
                }]
              })(
                <Select placeholder="请选择巡检总况"
                  allowClear
                >
                  {
                    SELECT_INSPECTION_STATUS &&
                    SELECT_INSPECTION_STATUS.map(cur => (
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
              label="上传"
            >
              {getFieldDecorator('activity_range3')(
                <Select placeholder="请选择活动区域"
                  allowClear
                >

                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="异常项"
            >
              {getFieldDecorator('activity_range2')(
                <Select placeholder="请选择活动区域"
                  allowClear
                >

                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="  "
            >
              {getFieldDecorator('activity_range1')(
                <TextArea rows={4} />
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
        </div>
        <div className="inspection-log-right">

        </div>
      </div>

    );
  }
}

export default Form.create()(DailyInspectionCreate);

