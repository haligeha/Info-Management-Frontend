import React, { Component, } from 'react';
import { Button, Form, Row, Col, Input, Icon, } from 'antd';
import { PageTitle,Module } from '../../../components';
import './index.styl';
const FormItem = Form.Item;
class SceneView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {
    const FORM_ITEM_SPAN = 11;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const {
      form,  
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <PageTitle titles={['监测预警','首屏展示']} />
        <Module>
          <Row type="flex"
            justify="start"
          >
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="场景名称"
                {...formItemLayout}
              >
                {getFieldDecorator('name')(
                  <Input placeholder="请输入场景名称" />,
                )}
              
              </FormItem>
            </Col>
            <Col>
            （ 场景名称显示8个字以内 ）
            </Col>
          </Row>
          <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="选择布局"
                {...formItemLayout}
              >
                <Col span="4"><Icon type="laptop"
                  style={{ fontSize: 24,}}
                              /></Col>
                <Col span="4"><Icon type="appstore-o"
                  style={{ fontSize: 24}}
                              /></Col>
                <Col span="4"><Icon type="layout"
                  style={{ fontSize: 24, color: '#08c'}}
                              /></Col>
                <Col span="4"><Icon type="exception"
                  style={{ fontSize: 24}}
                              /></Col>  
              </FormItem>
            </Col>
            
          </Row>
          <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="关联画面"
                {...formItemLayout}
              >
                <Col span="3"><Button type="primary"
                  size="small"
                              >GIS</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"
                              >预案</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"
                              >告警</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"
                              >视频</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"
                              >统计</Button></Col>
                <Col span="9">拖拽或选中区域点击</Col>
              </FormItem>
            </Col>
            
          </Row>
          <Row type="flex"
            justify="center"
          >
            <Col span="19">
              
            </Col>
              
              
            
            
          </Row>
        </Module>
      </div>

    );
  }
}

export default Form.create()(SceneView);

