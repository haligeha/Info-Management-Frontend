import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import { Form, Input, Button, message, } from 'antd';
import axios from 'axios';
import BMap from 'BMap'
//const Option = Select.Option;
const { TextArea } = Input;
//const dateFormat = 'YYYY-MM-DD';
var user_id = window.sessionStorage.getItem("user_id")
class ManagementNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pipeDetail: {},
    };

  }
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    console.log(id)
    if (id) {
      axios.get(`/api/v1/info/pipeGallery?Id=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({ pipeDetail: res.data })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 加载地图模块
    var mapStart = new BMap.Map("mapManagementStart");    // 创建Map实例
    mapStart.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    mapStart.addControl(new BMap.MapTypeControl());
    mapStart.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    mapStart.enableScrollWheelZoom(true);
    // 加载地图模块
    var mapEnd = new BMap.Map("mapManagementEnd");    // 创建Map实例
    mapEnd.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    mapEnd.addControl(new BMap.MapTypeControl());
    mapEnd.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    mapEnd.enableScrollWheelZoom(true);

  }

  //创建管廊信息
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match: { params: { id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    // if(!getFieldValue('number')){
    //   message.error('请输入管廊编号')
    // }
    if (!getFieldValue('name')) {
      message.error('请输入管廊名称')
    }
    if (!getFieldValue('length')) {
      message.error('请输入管廊长度')
    }
    if (!getFieldValue('unit')) {
      message.error('请选择所属单位')
    }
    if (!getFieldValue('startpoint')) {
      message.error('请输入起点')
    }
    if (!getFieldValue('endpoint')) {
      message.error('请输入终点')
    }
    if (!getFieldValue('description')) {
      message.error('请输入说明描述')
    }
    if (id) {
      values.id = id
      axios.put('/api/v1/info/pipeGallery?user_id=' + user_id, values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('编辑成功')
            history.push('/pipe/management')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(values)
      axios.post('/api/v1/info/pipeGallery?user_id=' + user_id, values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('创建成功')
            history.push('/pipe/management')

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }
  render() {
    const createFormItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    }
    const {
      form: { getFieldDecorator },
      match: { params: { id } }
    } = this.props

    const { pipeDetail } = this.state
    return (
      <div>
        {id ?
          <PageTitleCreate titles={['管廊管理', '编辑']} jump={'/pipe/management'} />
          :
          <PageTitleCreate titles={['管廊管理', '新建']} jump={'/pipe/management'} />
        }
        <div className="entrance-work-create-page">
          <Form
            onSubmit={this.handleSubmit}
          >

            <Form.Item
              {...createFormItemLayout}
              label="管廊名称"
            >
              {getFieldDecorator('name', {
                initialValue: id && pipeDetail.name,
                rules: [{
                  required: true,
                  message: "请输入管廊名称",
                }]
              })(
                <Input placeholder="请输入管廊名称" />
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="管廊长度"
            >
              {getFieldDecorator('length', {
                initialValue: id && pipeDetail.length,
                rules: [{
                  required: true,
                  message: "请输入管廊长度",
                }]
              })(<Input placeholder="请输入管廊长度" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="所属单位"
            >
              {getFieldDecorator('unit', {
                initialValue: id && pipeDetail.unit,
                rules: [{
                  required: true,
                  message: "请输入所属单位",
                }]
              })(<Input placeholder="请输入所属单位" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="管廊起点"
            >
              {getFieldDecorator('startpoint', {
                initialValue: id && pipeDetail.startpoint,
                rules: [{
                  required: true,
                  message: "请输入起点",
                }]
              })(
                <div className="path-way-border">
                  <Input placeholder="请输入起点" />
                  <Button className="area-button">打点</Button>
                  <div style={{ width: '100%', height: '300px' }} id="mapManagementStart"></div>
                </div>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="管廊终点"
            >
              {getFieldDecorator('endpoint', {
                initialValue: id && pipeDetail.endpoint,
                rules: [{
                  required: true,
                  message: "请输入终点",
                }]
              })(
                <div className="path-way-border">
                  <Input placeholder="请输入终点" />
                  <Button className="area-button">打点</Button>
                  <div style={{ width: '100%', height: '300px' }} id="mapManagementEnd"></div>
                </div>
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="说明描述"
            >
              {getFieldDecorator('description', {
                initialValue: id && pipeDetail.description,
                rules: [{
                  required: true,
                  message: "请输入说明描述",
                }]
              })(<TextArea rows={4} placeholder="请输入说明描述" />)}
            </Form.Item>
            <section className="operator-container">
              <div style={{ textAlign: "center" }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="default"
                >{id ? '编辑' : '新建'}
                </Button>
                <Button
                  style={{ marginLeft: "28px" }}
                  size="default"
                  onClick={() => {
                    const {
                      history,
                    } = this.props
                    history.push('/pipe/management')
                  }}
                >取消
                </Button>
              </div>
            </section>
          </Form>
        </div>
      </div>

    );
  }
}

export default Form.create()(ManagementNew);