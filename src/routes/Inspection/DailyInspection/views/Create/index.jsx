import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import { Form, Input, Select, Button, Upload, Tooltip, Icon } from 'antd';
import {
  SELECT_HOME_WORK_NUM,
  SELECT_INSPECTION_STATUS,
  SELECT_MAINTENANCE_COMPANY,
  SELECT_INSPECTION_ABNORMA_ITEM
} from '../../configs';
import './index.styl'

const { TextArea } = Input
let newArr = []
let indexSeletct = null
class DailyInspectionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      situationValue: '',
      abnormalItem: [
        {
          stateId: '',
          description: '',
          remark: ''
        }
      ],
      abnormalStateId: '',
      abnormalDescription: '',
      abnormalRemark: ''
    };
  }
  selectSituation = (value) => {
    this.setState({ situationValue: value })
  }
  // 异常项选择
  selectSomeone = (index) => {
    indexSeletct = index
  }
  selectAbnormal = (value) => {
    console.log(value + "value")
    let { abnormalItem } = this.state
    console.log(abnormalItem)
    console.log(indexSeletct)
    abnormalItem[indexSeletct].stateId = value
  }
  // 添加异常项
  addAbnormalItem = () => {
    const item = {
      stateId: '',
      description: '',
      remark: ''
    }
    newArr = this.state.abnormalItem
    newArr.push(item)
    this.setState({ situationValue: newArr })
  }
  // 删除异常项
  deleteAbnormalItem = (value) => {
    console.log(value)
    newArr.splice(value, 1)
    console.log(newArr)
    this.setState({ situationValue: newArr })
  }

  render() {
    const createFormItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    }
    const {
      form: { getFieldDecorator }
    } = this.props
    const { situationValue, abnormalItem, abnormalStateId, abnormalDescription, abnormalRemark } = this.state
    return (
      <div className="inspection-log">
        <PageTitleCreate titles={['巡检报告', '新建']} jump={'/inspection/calendar'} />
        <div className="inspection-log-left">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...createFormItemLayout}
              label="巡检人："
            >
              {getFieldDecorator('inspection_person', {
                rules: [{
                  required: true,
                  message: "巡检人为必填项",
                }]
              })(
                <Select placeholder="请填入巡检人" allowClear>
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
              {getFieldDecorator('stateId', {
                rules: [{
                  required: true,
                  message: "请选择巡检总况",
                }]
              })(
                <Select placeholder="请选择巡检总况" onChange={this.selectSituation} allowClear>
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
            {situationValue === "1" &&
              <Form.Item
                {...createFormItemLayout}
                label="异常说明："
              >
                {getFieldDecorator('summary')(
                  <TextArea rows={4} placeholder="请输入异常说明..." />
                )}
              </Form.Item>
            }
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
              label="设备异常项："
            >
              {getFieldDecorator('abnormal')(
                <div>
                  {abnormalItem &&
                    abnormalItem.map((item, index) => (
                      <div className="inspection-log-abnormal" key={index}>
                        <div className="inspection-log-abnormal-flex">
                          <Select
                            placeholder="请选择异常项"
                            className="inspection-log-abnormal-select"
                            value={item.stateId && item.stateId}
                            onSelect={() => { this.selectSomeone(index) }}
                            onChange={this.selectAbnormal}
                            allowClear
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
                        <Icon type="minus-circle" className="inspection-log-abnormal-delete"
                          onClick={() => { this.deleteAbnormalItem(index) }}
                        />
                        <Icon type="plus-circle" className="inspection-log-abnormal-plus"
                          onClick={this.addAbnormalItem}
                        />
                      </div>
                    ))
                  }
                </div>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="维保公司："
            >
              {getFieldDecorator('maintenance')(
                <Select placeholder="请选择维保公司" allowClear>
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
              {getFieldDecorator('maintenanceCompany')(
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

