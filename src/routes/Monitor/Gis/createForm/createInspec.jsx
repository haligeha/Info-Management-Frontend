import React, { Component } from 'react';
import { Form, Input } from 'antd';

class Inspec extends Component {
 
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        onSubmit={this.handleSubmit2}
      >
        <Form.Item
          // {...createFormItemLayout}
          label="所属区域"
        >
          {getFieldDecorator('area',{
            //   initialValue: id && planWayDetail.area_belong,
            rules:[{
              required:true,
              message:"请输入所属区域",
            }]
          })(
            <Input placeholder="请输入所属区域"/>
          )}  
        </Form.Item>
        <Form.Item
          // {...createFormItemLayout}
          label="所属管廊"
        >
          {getFieldDecorator('pipe_gallery',{
            //     initialValue: id && planWayDetail.pipe_belong,
            rules:[{
              required:true,
              message:"请选择所属管廊",
            }]
          })(
            <Input placeholder="请输入所属管廊"/>
          )}  
        </Form.Item>
        {/* <Form.Item
          label="起点"
        >
          {getFieldDecorator('startpoint',{
            rules:[{
              required:true,
              message:"请输入起点",
            }]
          })(<Input placeholder="请输入起点"/>)} 
        </Form.Item>
        <Form.Item
          label="终点"
        >
          {getFieldDecorator('endpoint',{
            rules:[{
              required:true,
              message:"请输入终点",
            }]
          })(<Input placeholder="请输入终点"/>)} 
        </Form.Item> */}
        <Form.Item
          // {...createFormItemLayout}
          label="说明描述"
        >
          {getFieldDecorator('description',{
          //        initialValue: id && planWayDetail.description,
            rules:[{
              required:true,
              message:"请输入说明描述",
            }]
          })(<Input placeholder="请输入说明描述"/>)} 
        </Form.Item>
      </Form>
    );
  }
}
 
const InspectionForm = Form.create()(Inspec);
 
export default InspectionForm;