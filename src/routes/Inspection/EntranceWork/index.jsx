import React,{Component} from 'react';
import {PageTitle,Module} from '../../../components';
import './index.styl';
import {Table,Button} from 'antd';
const {Column}=Table;
const data=[{
  key:'1',
  time:'20',
  startTime:'2018-11-10',
  workerNum:3,
  activityRange:'管廊1号',
  comments:'已完成'
},{
  key:'2',
  time:'20',
  startTime:'2018-11-10',
  workerNum:3,
  activityRange:'管廊1号',
  comments:'已完成'
}];
class EntranceWork extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){

    return (
      <div>
        <PageTitle titles={['巡检维护','入廊作业']} />
        <Module>
          <Button type="primary">添加</Button>
          
          <Button type="danger">删除</Button>
        </Module>
        <div>
          <Table dataSource={data}>
            <Column title="序号" dataIndex="key" />
            <Column title="施工时间" dataIndex="time" />
            <Column title="创建时间" dataIndex="startTime" />
            <Column title="施工人员数量" dataIndex="workerNum" />
            <Column title="活动范围" dataIndex="activityRange" />
            <Column title="评价" dataIndex="comments" />

          </Table>
        </div>
      </div>
    );
  }

}

export default EntranceWork;