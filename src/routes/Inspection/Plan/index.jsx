import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../components';
import { Button,Row,Col,DatePicker,Table  } from 'antd';
const { RangePicker } = DatePicker;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

class InspectionPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,     
    };
  }


  render() {
    const {
      data,
      current,
      total,
      size,
    } = this.state;
    return (
      <div>
        <PageTitle titles={['巡检维护','巡检计划']}>
          {
            <Button type="primary">+ 新建巡检计划</Button>
          }
        </PageTitle>
        <Module>
          <DatePicker
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
              }
              return (
                <div className="ant-calendar-date"
                  style={style}
                >
                  {current.date()}
                </div>
              );
            }}
          />
        </Module>
        <Table
          className="group-list-module"
          bordered
          pagination={{
            current,
            total,
            pageSize: size,
            onChange: this.handlePageChagne,
            showTotal: () => `共 ${total} 条数据`,
          }}
          dataSource={data}
          columns={[{
            title: '排列序号',
            key: 'tagId',
            render: (text, record) => (record.tagId && record.tagId) || '--',
          }, {
            title: '工期',
            key: 'tagName',
            render: (text, record) => (record.tagName && record.tagName) || '--',
          }, {
            title: '创建时间',
            key: 'tagType',
            render: (text, record) => (record.type && record.type.name) || '--',
          }, {
            title: '施工人员数量',
            dataIndex: 'actualUserCount',
            render: (text, record) => `${record.type.id === '3'
              ? (record.actualAmount === '0' ? '--' : record.actualAmount) : (record.actualAmount || 0)}`,
          }, {
            title: '活动范围',
            dataIndex: 'creatorNameZh',
            render: (text, record) => `${record.creatorNameZh || ''}`,
          }, {
            title: '评价',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          }, {
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Button type="simple">编辑</Button>
                <Button type="simple">详情</Button>
                <Button type="simple">删除</Button>
                <Button type="simple">评价</Button>
              </div>
            ),
          }]}
        />
      </div>

    );
  }
}

export default InspectionPlan;

