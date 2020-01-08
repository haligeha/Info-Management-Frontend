import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import { Form, Input, Button, message, } from 'antd';
import axios from 'axios';
import AMap from 'AMap'

const { TextArea } = Input;
let user_id = window.sessionStorage.getItem("user_id")
let marker

class ManagementNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pipeDetail: {},
      startPoint: [],
      endPoint: [],
    };

  }
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    console.log(id)
    if (id) {
      axios.get(`/api/v1/info/pipeGallery?Id=${id}&user_id=${user_id}`)
        .then((res) => {
          console.log(res.data)
          this.setState({ pipeDetail: res.data })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.initMapStartPoint()
    this.initMapEndPoint()
  }
  componentWillUnmount() {
    marker = 0
  }
  initMapStartPoint = () => {
    this.map = new AMap.Map('mapManagementStart', {
      zoom: 11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode: '3D'//使用3D视图
    });
    //监听双击事件
    this.map.on('dblclick', (e) => {
      console.log(`您点击了地图的[${e.lnglat.getLng()},${e.lnglat.getLat()}]`)
      const lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]
      this.setState({ startPoint: lnglatXY })
      //控制单次打点
      if (!marker) {
        this.addMarker(lnglatXY)
      } else {
        marker.setPosition(lnglatXY)
      }
    })
  }
  //高德地图打点
  addMarker = (lnglat) => {
    marker = new AMap.Marker({
      map: this.map,
      position: lnglat,
    });
    marker.setMap(this.map);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  initMapEndPoint = () => {
    this.mapEnd = new AMap.Map('mapManagementEnd', {
      zoom: 11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode: '3D'//使用3D视图
    });
    //监听双击事件
    this.mapEnd.on('dblclick', (e) => {
      console.log(`您点击了地图的[${e.lnglat.getLng()},${e.lnglat.getLat()}]`)
      const lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]
      this.setState({ endPoint: lnglatXY })
      //控制单次打点
      if (!marker) {
        this.addEndMarker(lnglatXY)
      } else {
        marker.setPosition(lnglatXY)
      }
    })
  }
  //高德地图打点
  addEndMarker = (lnglat) => {
    marker = new AMap.Marker({
      mapEnd: this.mapEnd,
      position: lnglat,
    });
    marker.setMap(this.mapEnd);
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
    values.drawpoint = [this.state.startPoint, this.state.endPoint]
    console.log(values)
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