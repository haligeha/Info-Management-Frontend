import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../components';
import { Button, Table  } from 'antd';
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
        <PageTitle titles={['应急指挥','应急预案']}>
          {
            <Button type="primary">+ 新建预案</Button>
          }
        </PageTitle>
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
            title: '序列ID',
            key: 'tagId',
            render: (text, record) => (record.tagId && record.tagId) || '--',
          }, {
            title: '预案名称',
            key: 'tagName',
            render: (text, record) => (record.tagName && record.tagName) || '--',
          }, {
            title: '预案类别',
            key: 'tagType',
            render: (text, record) => (record.type && record.type.name) || '--',
          }, {
            title: '预案级别',
            dataIndex: 'actualUserCount',
            render: (text, record) => `${record.type.id === '3'
              ? (record.actualAmount === '0' ? '--' : record.actualAmount) : (record.actualAmount || 0)}`,
          }, {
            title: '预案内容',
            dataIndex: 'creatorNameZh',
            render: (text, record) => `${record.creatorNameZh || ''}`,
          }, {
            title: '签发人',
            key: 'createTime',
            render: (text, record) => `${record.createTime}`,
          },{
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

