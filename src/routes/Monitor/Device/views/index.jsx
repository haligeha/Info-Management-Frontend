import React, { Component, } from 'react';
import { Input,Row,Col,Button, Form, Table } from 'antd';
import { PageTitle,Module  } from '../../../../components';
const Search = Input.Search;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;
class EmergencyPlan extends Component {
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
        <PageTitle titles={['监测预警','设备信息']} />
        <Module>
          <Row>
            <Col span={7}>
              <Search
                placeholder="请输入站点ID"
                onSearch={value => console.log(value)}
                enterButton
              />
            </Col>
          </Row>
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
            title: '设备ID',
            key: 'tagId',
            render: (text, record) => (record.tagId && record.tagId) || '--',
          }, {
            title: '设备名',
            key: 'tagName',
            render: (text, record) => (record.tagName && record.tagName) || '--',
          }, {
            title: '父类设备',
            key: 'tagType',
            render: (text, record) => (record.type && record.type.name) || '--',
          }, {
            title: '厂商',
            dataIndex: 'actualUserCount',
            render: (text, record) => `${record.type.id === '3'
              ? (record.actualAmount === '0' ? '--' : record.actualAmount) : (record.actualAmount || 0)}`,
          }, {
            title: '设别类型',
            dataIndex: 'creatorNameZh',
            render: (text, record) => `${record.creatorNameZh || ''}`,
          }, {
            title: '型号',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          }, {
            title: '状态',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          }, {
            title: '位置',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          }, {
            title: '站点ID',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          }, {
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Button type="simple">详情</Button>
              </div>
            ),
          }]}
        />
      </div>

    );
  }
}

export default EmergencyPlan;

