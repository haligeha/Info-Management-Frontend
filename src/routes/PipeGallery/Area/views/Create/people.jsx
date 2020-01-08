import React, { Component, } from 'react'
import { Icon, Button } from 'antd'
import { fromJS } from 'immutable'
import Immutable from 'immutable'
import './index.styl'

const List = Immutable.List
let rightArr = []
let number = 1
const propsData = List([{
  name: '艾弗森',
  id: 1,
  status: 0
}, {
  name: '哈哈',
  id: 2,
  status: 0
}, {
  name: '附件',
  id: 3,
  status: 0
}, {
  name: '测试阿豪',
  id: 4,
  status: 0
}, {
  name: '赞赞',
  id: 5,
  status: 0
}, {
  name: '落落',
  id: 6,
  status: 0
}])
class ManagementPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftData: [],
      rightData: []
    };
  }
  // 选中负责人
  selectedPeople = (item) => {
    propsData.map((params) => {
      if (params.id === item.id && params.status === 0) {
        params.status = 1
        rightArr.push(params)
      } else if (params.id === item.id && params.status === 1) {
        params.status = 0
        rightArr.forEach((value, index, rightArr) => {
          if (value.id === params.id) {
            rightArr.splice(index, 1)
          }
        })
      }
    })
    this.renderLeftBox(propsData)
    this.setState({ rightData: rightArr })
    console.log(rightArr)
  }
  renderLeftBox = (data) => {
    return data.map((item, index) => (
      <div
        className="box-content-border"
        style={{ background: (item.status === 0) ? '#fff' : '#1890ff' }}
        key={index}
        onClick={() => { this.selectedPeople(item) }}
      ><span className="box-content-padding">{item.name}</span>
      </div>
    ))
  }
  renderRightBox = (data) => {
    return data.map((item, index) => (
      <div
        key={index}
        style={{ color: '#1890ff' }}
      ><span className="box-content-padding">{item.name}</span></div>
    ))
  }
  // 全选
  allSelected = () => {
    if (number === 1) {
      propsData.map((params) => {
        if (params.status === 0) {
          rightArr.push(params)
          params.status = 1
        }
      })
      number = 2
    } else {
      propsData.map((params) => {
        params.status = 0
      })
      number = 1
      rightArr = []
    }
    this.setState({ rightData: rightArr })
  }
  render() {
    const { rightData } = this.state
    return (
      <div className="management-people">
        <div className="people-box">
          <div className="box-title">
            <p>可选区域负责人 <Button type="link" onClick={this.allSelected}>全选</Button></p>
          </div>
          <div className="box-content">
            {this.renderLeftBox(propsData)}
          </div>
        </div>
        <div className="people-arrow">
          <Icon className="arrow-icon" type="double-right" />
          <Icon className="arrow-icon" type="double-left" />
        </div>
        <div className="people-box">
          <div className="box-title">
            <p>已选区域负责人</p>
          </div>
          <div className="box-content">
            {this.renderRightBox(rightData)}
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementPeople;