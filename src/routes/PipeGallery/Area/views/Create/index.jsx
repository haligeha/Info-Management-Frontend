import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import ManagementPeople from './people'
import { Form, Input, Select, Button, message, } from 'antd';
import BMap from 'BMap'
import axios from 'axios'

const { Option } = Select;
const { TextArea } = Input;

var user_id = window.sessionStorage.getItem("user_id")
class AreaNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaDetail: {},
      pipeBelong: [],
    };

  }
  componentDidMount() {
    this.getpipeBelong();
    const { match: { params: { id } } } = this.props
    if (id) {
      axios.get(`/api/v1/info/galleryArea?Id=${id}&user_id=${user_id}`)
        .then((res) => {
          this.setState({ areaDetail: res.data })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 加载地图模块
    var map = new BMap.Map("mapAreaCreate");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);
  }

  //获取管廊区域信息
  getpipeBelong = () => {
    axios.get(`/api/v1/info/pipeGalleryAll?user_id=${user_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          const pipeArr = res.data.AllPipes
          const pipe = []
          const children = []
          pipeArr.forEach(function (item) {
            pipe.push(item.name)
          })
          for (var i = 0; i < pipe.length; i++)
            children.push(<Option key={i} value={pipe[i]}>{pipe[i]}</Option>)
          this.setState({ pipeBelong: children })
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  //创建区域信息
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match: { params: { id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    if (!getFieldValue('name')) {
      message.error('请输入区域名称')
    }
    if (!getFieldValue('length')) {
      message.error('请输入区域长度')
    }
    if (!getFieldValue('pipe_belong')) {
      message.error('请选择所属管廊')
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
      axios.put('/api/v1/info/galleryArea?user_id=' + user_id, values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('编辑成功')
            history.push('/pipe/area')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.post('/api/v1/info/galleryArea?user_id=' + user_id, values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('创建成功')
            history.push('/pipe/area')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  render() {
    const createFormItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const {
      form: { getFieldDecorator },
      match: { params: { id } }
    } = this.props

    const { areaDetail, pipeBelong } = this.state
    return (
      <div>
        {id ?
          <PageTitleCreate titles={['管廊区域', '编辑']} jump={'/pipe/area'} />
          :
          <PageTitleCreate titles={['管廊区域', '新建']} jump={'/pipe/area'} />
        }
        <div className="entrance-work-create-page">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...createFormItemLayout}
              label="区域名称"
            >
              {getFieldDecorator('name', {
                initialValue: id && areaDetail.name,
                rules: [{
                  required: true,
                  message: "请输入区域名称",
                }]
              })(
                <Input placeholder="请输入区域名称" />
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="区域经度"
            >
              {getFieldDecorator('length', {
                initialValue: id && areaDetail.length,
                rules: [{
                  required: true,
                  message: "请输入区域长度",
                }]
              })(<Input placeholder="请输入区域长度" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="所属管廊"
            >
              {getFieldDecorator('pipe_belong', {
                initialValue: id && areaDetail.pipe_belong,
                rules: [{
                  required: true,
                  message: "请选择所属管廊",
                }]
              })(<Select
                //  mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择所属管廊"
              >
                {pipeBelong}
              </Select>)}
              {/* //(<Input placeholder="请输入管廊区域"/>)}  */}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="选择负责人："
            >
              {getFieldDecorator('pipe_people')(<ManagementPeople />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="绘制区域："
            >
              {getFieldDecorator('pipe_map')(
                <div>
                  <div style={{ width: '100%', height: '300px' }} id="mapAreaCreate"></div>
                </div>)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="起始点（经纬度）"
            >
              {getFieldDecorator('startpoint', {
                initialValue: id && areaDetail.startpoint,
                rules: [{
                  required: true,
                  message: "请输入起点",
                }]
              })(<Input placeholder="请输入起点" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="终止点（经纬度）"
            >
              {getFieldDecorator('endpoint', {
                initialValue: id && areaDetail.endpoint,
                rules: [{
                  required: true,
                  message: "请输入终点",
                }]
              })(<Input placeholder="请输入终点" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="说明描述"
            >
              {getFieldDecorator('description', {
                initialValue: id && areaDetail.description,
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
                    history.push('/pipe/area')
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

export default Form.create()(AreaNew);