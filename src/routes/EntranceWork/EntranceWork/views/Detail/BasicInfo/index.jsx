import React, { Component } from 'react';
import { Row,Col } from 'antd';
import moment from 'moment';
export default class extends Component {
  static propTypes ={

  }
  constructor(props){
    super(props)
    this.state = { index : 0}
    this.infos = [{
      title: '活动范围',
      dataIndex: 'activity_range',
      render: record => record.activity_range,
    },{
      title: '排序',
      key: 'tagId',
      render: record => record.tagId,
    }, {
      title: '工期',
      key: 'duration',
      render: record => record.duration,
    }, {
      title: '创建时间',
      key: 'date',
      render:record => moment(parseInt(record.date)).format('YYYY-MM-DD HH:mm:ss'),
    }, {
      title: '施工人员数量',
      dataIndex: 'work_number',
      render: record => record.work_number,
    },  {
      title: '评价',
      key: 'evaluation',
      render: record => record.evaluation,
    }]
  }
  render(){
    const { data } = this.props
    console.log(data)
    const arr = []
    arr.push(data)
    const detailInfo = (cur,datas) => {
      let result = [];
      if(cur.render){
        result.push(cur.render(datas))
      }else{
        result = Object.prototype.toString.call(datas[cur.dataIndex]) === '[object Object]'
          ? datas[cur.dataIndex].name
          : datas[cur.dataIndex]
      }
      return result
    }
    return (
      <div className="label-container">
        <Row gutter={60}>
          {
            this.infos.map(cur => (
              <Col span={12}
                key={cur.id}
              >
                <div>
                  {cur.title &&
                    <span className="title">{cur.title}</span>
                  }
                  {cur.title &&
                    <span>:&nbsp;</span>
                  }
                  <span className="content">{detailInfo(cur,arr)}</span>
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}