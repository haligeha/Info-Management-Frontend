import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import { Form, Input, Select, Button, Upload, Tooltip, Icon, Row, Col } from 'antd';
//import Billboard from './billboard'

import {
  SELECT_HOME_WORK_NUM,
  SELECT_INSPECTION_STATUS,
  SELECT_MAINTENANCE_COMPANY,
  SELECT_INSPECTION_ABNORMA_ITEM
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
                <Select placeholder="请填入巡检人"
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
              label="异常说明："
            >
              {getFieldDecorator('activity_range7')(
                <TextArea rows={4} placeholder="请输入异常说明..." />
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="上传"
            >
              {getFieldDecorator('activity_range3')(
                <div className="inspection-log-upload">
                  <Upload>
                    <Tooltip placement="right" title={'支持图片和视频的上传'}>
                      <Button><Icon type="upload" />上传</Button>
                    </Tooltip>
                  </Upload>
                </div>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="异常项："
            >
              {getFieldDecorator('activity_range2')(
                <div className="inspection-log-abnormal">
                  <div className="inspection-log-abnormal-flex">
                    <Select placeholder="请选择异常项"
                      allowClear
                      className="inspection-log-abnormal-select"
                    >
                      {
                        SELECT_INSPECTION_ABNORMA_ITEM &&
                        SELECT_INSPECTION_ABNORMA_ITEM.map(cur => (
                          <Select.Option key={cur.id}
                            value={cur.id}
                          >{cur.name}</Select.Option>
                        ))
                      }
                    </Select>
                    <TextArea rows={4} placeholder="请输入异常项具体说明..." />
                  </div>
                  <Icon type="plus-circle" className="inspection-log-abnormal-plus" />
                </div>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="维保公司："
            >
              {getFieldDecorator('activity_range9')(
                <Select placeholder="请选择维保公司"
                  allowClear
                >
                  {
                    SELECT_MAINTENANCE_COMPANY &&
                    SELECT_MAINTENANCE_COMPANY.map(cur => (
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
              label="维保公司说明："
            >
              {getFieldDecorator('activity_range1')(
                <TextArea rows={4} placeholder="请输入维保公司维保详情..." />
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
                    history.push('/inspection/calendar')
                  }}
                >取消
                </Button>
              </div>
            </section>
          </Form>
        </div>
        <div className="inspection-log-right">
          <img src={[require('@src/img/listing.jpg')]} alt="值班人员" width="200" height="180" />
          <p className="inspection-log-date">2019/12/21</p>
          <p className="inspection-log-name">值班人 ：刘苗苗</p>
        </div>
      </div>

    );
  }
}

export default Form.create()(DailyInspectionCreate);

