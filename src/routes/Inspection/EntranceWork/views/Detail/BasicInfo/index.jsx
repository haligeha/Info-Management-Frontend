import React, { Component } from 'react';
import { Row,Col } from 'antd';

export default class extends Component {
  static propTypes ={

  }
  constructor(props){
    super(props)
    this.state = { index : 0}
    this.info = [{
      title:'活动范围',
      dataIndex:'metric',
      render: record => record.metric,
    },{
      title:'活动范围',
      dataIndex:'metric',
      render: record => record.metric,
    },{
      title:'活动范围',
      dataIndex:'metric',
      render: record => record.metric,
    }]
  }
  render(){
    const { data } = this.props
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
      <div>
        <Row gutter={60}>
          {/* {
            this.infos.map(cur => (
              <Col span={12}>
                <div className="label-container">
                  {cur.title &&
                    <span className="title">{cur.title}</span>
                  }
                  {cur.title &&
                    <span>:&nbsp;</span>
                  }
                  <span className="content">{detailInfo(cur,data)}</span>
                </div>
              </Col>
            ))
          } */}
        </Row>
      </div>
    )
  }
}