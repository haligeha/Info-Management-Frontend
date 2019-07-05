import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Row,Col,Input,Drawer,Radio,Form} from 'antd';
import axios from 'axios';
import './index.styl'
import { Link } from 'react-router-dom'
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {   
      visible: false,
      treatment:'',
      abnormal:''
  
    };
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  spec = () => {

  }
  onAbnormal = ()=> {

  }
  onDealing = ()=>{

  }
  render() {
    const createFormItemLayout = {
        labelCol: {span:8},
        wrapperCol : {span:8},
      }
    const { 
      form: { getFieldDecorator }, 
    } = this.props
    const {abnormal,treatment}=this.state
  
    return (
      <div>
        <PageTitle titles={['巡检维护','开始巡检']}>
          {
            <Link to={"/inspection/plan/new"}>
            <Button type="primary">总结报告</Button>
            </Link>
          }
        </PageTitle>
        <RadioGroup
          style={{ marginRight: 8 }}
          defaultValue='left'
          onChange={this.onChange}
        >
            <Radio.Button value="a" style={{marginRight:30}} onClick={this.showDrawer}>1号防火区</Radio.Button>
            <Radio.Button value="b"style={{marginRight:30}} onClick={this.showDrawer}>2号防火区</Radio.Button>
            <Radio.Button value="c"style={{marginRight:30}} onClick={this.showDrawer}>3号防火区</Radio.Button>
            <Radio.Button value="d"style={{marginRight:30}} onClick={this.showDrawer}>4号防火区</Radio.Button>
        </RadioGroup>
        <Drawer
          title="巡检结果"
          placement="right"
          closable={false}
          width={500}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <div>
            {/* <div className="video">  */}
                <Radio
                onClick={this.spec}
                >摄像头</Radio>
            {/* </div> */}
            <div className="formsub">
                <div>
                    管廊1号3z型号<br/>
                    巡检人
                </div>
                <Form 
                className="formsubmit"
                onSubmit={this.handleSubmit}>
                <Form.Item
                    {...createFormItemLayout}
                    label="正常项"
                >
                    {getFieldDecorator('abnormal',{
                    initialValue:'',
                    rules:[{
                        required:true,
                    }]
                    })(
                        <Radio.Group onChange={this.onAbnormal} value={this.state.abnormal}>
                        <Radio value={1}>正常</Radio>
                        <Radio value={2}>异常</Radio>
                        </Radio.Group>
                    )}  
                </Form.Item>
                <Form.Item
                    {...createFormItemLayout}
                    label="异常描述"
                >
                    {getFieldDecorator('description',{
                    initialValue: '',
                    rules:[{
                        required:true,
                        message:"请输入异常描述",
                    }]
                    })(
                        <TextArea rows={4} />
                    )}  
                </Form.Item>    
                <Form.Item
                    {...createFormItemLayout}
                    label="处理否"
                >
                    {getFieldDecorator('treatment',{
                    initialValue:'',
                    rules:[{
                        required:true,
                    }]
                    })(
                        <Radio.Group onChange={this.onDealing} value={this.state.treatment}>
                        <Radio value={1}>未处理</Radio>
                        <Radio value={2}>已处理</Radio>
                        <Radio value={3}>处理中</Radio>
                        </Radio.Group>
                    )}  
                </Form.Item>
                <Form.Item
                    {...createFormItemLayout}
                    label="处理说明"
                >
                    {getFieldDecorator('content',{
                    initialValue: '',
                    rules:[{
                        required:true,
                        message:"请输入处理说明",
                    }]
                    })(
                        <TextArea rows={6} />
                    )}  
                </Form.Item>  
                </Form>
            </div>
         </div>
        </Drawer>
      </div>

    );
  }
}

export default Form.create()(Report);