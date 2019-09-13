import React, { Component } from 'react';
import { Form, Icon, Input,Button,Select } from 'antd';

class Inspec extends Component {
 
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        onSubmit={this.handleSubmit2}
      >
        <Form.Item
        //  {...createFormItemLayout}
          label="巡检路线名称"
        >
          {getFieldDecorator('name',{
            //  initialValue: id && entranceDetail.duration,
            rules:[{
              required:true,
              message:"请输入巡检路线名称",
            }]
          })(
            <Input placeholder="请输入巡检路线名称" />
          )}  
        </Form.Item>
        <Form.Item
          // {...createFormItemLayout}
          label="巡检路线"
        >
          {getFieldDecorator('size',{
          //  initialValue: id && entranceDetail.duration,
            rules:[{
              required:true,
              message:"请输入巡检路线大小",
            }]
          })(
            <Input placeholder="请输入巡检路线大小" />
          )}  
        </Form.Item>
        <Form.Item
          // {...createFormItemLayout}
          label="巡检路线类型"
        >
          {getFieldDecorator('type',{
            //  initialValue: id && entranceDetail.activity_range,
            rules:[{
              required:true,
              message:"请选择巡检路线类型",
            }]
          })(
            <Select placeholder="请选择巡检路线类型"
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
          <Button type="primary" onClick={()=>this.props.onClick({visible:false})}>
            确认
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
 
const InspectionForm = Form.create()(Inspec);
 
export default InspectionForm;