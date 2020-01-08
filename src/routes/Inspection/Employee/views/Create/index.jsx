import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import { Form, Input, Button, message, Upload, Tooltip, Icon } from 'antd';
import axios from 'axios';

class EmployeeNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeDetail: {},
    };

  }
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    console.log(id)
    if (id) {
      axios.get(`/api/v1/user/userById?id=${id}`)
        .then((res) => {
          this.setState({ employeeDetail: res.data })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //创建员工信息
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
      message.error('请输入员工姓名')
    }
    if (!getFieldValue('email')) {
      message.error('请输入电子邮箱')
    }
    console.log("查看提交数据")
    console.log(values)
    if (id) {
      values.id = id
      axios.put('/api/v1/user/user', values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('编辑成功')
            history.push('/inspection/employee')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.post('/api/v1/user/user', values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('创建成功')
            history.push('/inspection/employee')
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
    const { employeeDetail } = this.state
    return (
      <div>
        {id ?
          <PageTitleCreate titles={['员工信息', '编辑']} jump={'/inspection/employee'} />
          :
          <PageTitleCreate titles={['员工信息', '新建']} jump={'/inspection/employee'} />
        }
        <div className="entrance-work-create-page">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...createFormItemLayout}
              label="员工姓名"
            >
              {getFieldDecorator('name', {
                initialValue: id && employeeDetail.name,
                rules: [{
                  required: true,
                  message: "请输入员工姓名",
                }]
              })(
                <Input placeholder="请输入员工姓名" />
              )}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="电子邮箱"
            >
              {getFieldDecorator('email', {
                initialValue: id && employeeDetail.email,
                rules: [{
                  required: true,
                  message: "请输入电子邮箱",
                }]
              })(<Input placeholder="请输入电子邮箱" type="email" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="所属部门"
            >
              {getFieldDecorator('department', {
                initialValue: id && employeeDetail.email,
                rules: [{
                  required: true,
                  message: "请输入所属部门",
                }]
              })(<Input placeholder="请输入所属部门" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="职位"
            >
              {getFieldDecorator('position', {
                initialValue: id && employeeDetail.email,
                rules: [{
                  required: true,
                  message: "请输入职位",
                }]
              })(<Input placeholder="请输入职位" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="电话"
            >
              {getFieldDecorator('phone', {
                initialValue: id && employeeDetail.phone
              })(<Input placeholder="请输入电话" type="phone" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="微信号"
            >
              {getFieldDecorator('we_chat', {
                initialValue: id && employeeDetail.we_chat
              })(<Input placeholder="请输入微信号" type="we_chat" />)}
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="上传头像"
            >
              {getFieldDecorator('auatar', {
                initialValue: id && employeeDetail.avatar,
              })(<Input placeholder="请输入微信号" type="auatar" />)}
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
                    history.push('/inspection/employee')
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

export default Form.create()(EmployeeNew);