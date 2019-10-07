import React, { Component } from 'react';
import { Form, Icon, Input,Select,Button } from 'antd';

class Line extends Component {
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        onSubmit={this.handleSubmit1}
      >
        <Form.Item
        //  {...createFormItemLayout}
          label="管廊名称"
        >
          {getFieldDecorator('name',{
            
            rules:[{
              required:true,
              message:"请输入管廊名称",
            }]
          })(
            <Input placeholder="请输入管廊名称" />
          )}  
        </Form.Item>
        <Form.Item
          // {...createFormItemLayout}
          label="管廊大小"
        >
          {getFieldDecorator('size',{
          //  initialValue: id && entranceDetail.duration,
            rules:[{
              required:true,
              message:"请输入管廊大小",
            }]
          })(
            <Input placeholder="请输入管廊大小" />
          )}  
        </Form.Item>
        <Form.Item
          // {...createFormItemLayout}
          label="管廊类型"
        >
          {getFieldDecorator('type',{
            //  initialValue: id && entranceDetail.activity_range,
            rules:[{
              required:true,
              message:"请选择管廊类型",
            }]
          })(
            <Select placeholder="请选择管廊类型"
              allowClear
            >
              <Select.Option key="1"
                value="solid"
              >实线</Select.Option>
              <Select.Option key="2"
                value="imaginary"
              >虚线</Select.Option>
            </Select>
          )}  
        </Form.Item>
        <Form.Item>
        </Form.Item>
      </Form>
    );
  }
}
 
const LineForm = Form.create()(Line);
 
export default LineForm;
