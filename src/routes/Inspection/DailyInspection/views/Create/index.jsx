import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '@src/modules/DailyInspection';
import { Form, Input, Select, Button, Upload, Tooltip, message, Icon } from 'antd';
import {
  SELECT_INSPECTION_STATUS,
  SELECT_MAINTENANCE_COMPANY,
  SELECT_INSPECTION_ABNORMA_ITEM,
  INSPECTION_DUTY_PEOPLE
} from '../../configs';
import './index.styl';
import moment from 'moment';
let user_id = window.sessionStorage.getItem("user_id")
const { TextArea } = Input
let newArr = []

class DailyInspectionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      situationValue: '',
      abnormalItem: [
        {
          state: '',//是否在维保期内
          device: '',// 异常设备
          description: '',// 对异常设备的描述
          deleteDisplay: false,//删除异常设备按钮是否出现
          addDisplay: true,//添加异常项按钮是否出现
        }
      ],
    };
  }
  componentDidMount() {
    const value = {
      limit: '100',
      page: '0',
      user_id: user_id
    }
    const { actions: { getInspectionPeople } } = this.props
    getInspectionPeople(value)
  }
  // 巡检总况
  selectSituation = (value) => {
    this.setState({ situationValue: value })
  }
  // 选择故障设备
  selectAbnormal = (value, index) => {
    newArr = this.state.abnormalItem
    newArr[index].device = value
    this.setState({ abnormalItem: newArr })
  }
  // 输入设备描述
  inputDescription = (e, index) => {
    newArr = this.state.abnormalItem
    newArr[index].description = e.target.value
    this.setState({ abnormalItem: newArr })
  }
  // 添加异常项
  addAbnormalItem = () => {
    const item = {
      state: '',//是否在维保期内
      device: '',// 异常设备
      description: '',// 对异常设备的描述
      deleteDisplay: true,
      addDisplay: true,
    }
    newArr = this.state.abnormalItem
    newArr.push(item)
    for (let i = 0; i < newArr.length - 1; i++) {
      newArr[i].addDisplay = false
      newArr[i].deleteDisplay = true
    }
    this.setState({ abnormalItem: newArr })
  }
  // 删除异常项
  deleteAbnormalItem = (value) => {
    if (newArr.length === 1) {
      newArr[0].addDisplay = true
      newArr[0].deleteDisplay = false
      return
    }
    newArr.splice(value, 1)
    let len = newArr.length
    if (len === 1) {
      newArr[len - 1].addDisplay = true
      newArr[len - 1].deleteDisplay = false
    } else {
      newArr[len - 1].addDisplay = true
      newArr[len - 1].deleteDisplay = true
    }
    this.setState({ abnormalItem: newArr })
  }
  onDutyPeople = (value) => {
    const result = INSPECTION_DUTY_PEOPLE.filter(item => item.id == value)
    return result[0] ? result[0].name : ''
  }
  // 限制字数
  descriptionTextJudge = (e) => {
    // if (e.target.value && e.target.value.length > 240) {
    //   message.error('PUSH文案不超过240个汉字')
    //   const pushText = document.getElementById('pushText')
    //   pushText.focus()
    // }
  }
  // 新建巡检报告
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    if (!getFieldValue('inspection_person')) {
      message.error('请输入巡检人')
    }
    if (!getFieldValue('state')) {
      message.error('请选择巡检总况')
    }
    newArr.map((item) => (
      delete item.deleteDisplay,
      delete item.addDisplay,
      item.state = Math.floor(Math.random() + 0.5))
    )
    values.abnormal = newArr
    values.create_date = JSON.stringify(new Date().getTime())
    let standardDate = new Date(moment().format("YYYY-MM-DD")).getTime()
    values.calendar_date = JSON.stringify(standardDate) //时间戳
    delete values.picture_video
    console.log(values)
    axios.post(`/api/v1/info/inspection?user_id=${user_id}`, values)
      .then(function (response) {
        if (response.status === 200) {
          message.info('创建成功')
          history.push('/inspection/calendar')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  render() {
    const createFormItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    }
    const {
      form: { getFieldDecorator },
      inspectionPeople,
      dutyPeople,
      selectedDate
    } = this.props
    const { situationValue, abnormalItem } = this.state
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
                    inspectionPeople &&
                    inspectionPeople.map(cur => (
                      <Select.Option key={cur.id}
                        value={cur.name}
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
              {getFieldDecorator('state', {
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
              {getFieldDecorator('picture_video')(
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
                            value={item.device}
                            onChange={(value) => { this.selectAbnormal(value, index) }}
                            allowClear
                          >
                            {
                              SELECT_INSPECTION_ABNORMA_ITEM &&
                              SELECT_INSPECTION_ABNORMA_ITEM.map((cur, index) => (
                                <Select.Option key={index}
                                  value={cur.id}
                                >{cur.name}</Select.Option>
                              ))
                            }
                          </Select>
                          <TextArea
                            value={item.description}
                            onChange={(value) => { this.inputDescription(value, index) }}
                            rows={4}
                            onBlur={this.descriptionTextJudge}
                            placeholder="请输入异常项具体说明，不超过240个汉字"
                          />
                        </div>
                        <Icon type="minus-circle" className="inspection-log-abnormal-delete"
                          style={{ display: (item.deleteDisplay === true) ? '' : 'none' }}
                          onClick={() => { this.deleteAbnormalItem(index) }}
                        />
                        <Icon type="plus-circle" className="inspection-log-abnormal-plus"
                          style={{ display: (item.addDisplay === true) ? '' : 'none' }}
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
              {getFieldDecorator('maintenanceDescription')(
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
          <p className="inspection-log-date">{selectedDate}</p>
          <p className="inspection-log-name">值班人 ：{this.onDutyPeople(dutyPeople)}</p>
        </div>
      </div>

    );
  }
}

export default connect(
  state => ({
    inspectionPeople: state.dailyInspention.inspectionPeople.data.data,
    dutyPeople: state.dailyInspention.dutyPeople,
    selectedDate: state.dailyInspention.selectedDate
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Form.create()(DailyInspectionCreate))