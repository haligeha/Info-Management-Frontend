import React, { Component, } from 'react';
import { PageTitle, Module, } from '@src/components';
import { Button, Row, Col, Table, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 6;
const Search = Input.Search;
var user_id = window.sessionStorage.getItem("user_id")
class InspectorInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,
      data: [],
      name: '',
      nowCurrent: FIRST_PAGE,
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount() {
    this.getGroupList(FIRST_PAGE);
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size, name } = this.state;
    axios.get(`/api/v1/user/userByPage?limit=${size}&page=${page}&name=${name}&user_id=${user_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({
            data: res.data,
            nowCurrent: res.data.page
          });
          console.log(this.state.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //分页
  handlePageChagne = (page) => {
    this.getGroupList(page - 1)
  }

  //删除
  deleteGroup = (record) => {
    axios.delete(`/api/v1/info/userById?Id=${record.id}&user_id=${user_id}`)
      .then(() => {
        this.getGroupList(this.state.nowCurrent)
      })
      .catch((err) => {
        message.info('无相应权限')
        console.log(err);
      });
  }
  //搜索
  selectActivity = (value) => {
    const nameValue = value
    this.setState({
      name: nameValue
    });
    console.log(this.state)
    this.getGroupList(0)
  }

  render() {
    const {
      data: {
        data,
        allCount,
        limit,
        page,
      },
    } = this.state;
    const total = allCount
    const current = page + 1
    const size = limit
    return (
      <div>
        <PageTitle titles={['巡检维护', '员工信息']}>
          {
            <Link to={"/inspection/employee/new"}>
              <Button type="primary">+ 新建员工信息</Button>
            </Link>
          }
        </PageTitle>
        <Module>
          <Row>
            <Col span={2}>员工姓名：</Col>
            <Col span={4}>
              <Search
                placeholder="请输入员工姓名"
                enterButton
                onSearch={value => this.selectActivity(value)}
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
            showTotal: () => `共${allCount} 条数据`
          }}
          dataSource={data}
          columns={[{
            title: '序号',
            key: 'index',
            render: (text, record, index) => { return (index + 1) }
          }, {
            title: '员工工号',
            key: 'id',
            render: (text, record) => {
              return (record.id && record.id) || '--'
            }
          }, {
            title: '员工姓名',
            width: 200,
            key: 'name',
            render: (text, record) => {
              return (record.name && record.name) || '--'
            }
          }, {
            title: '所属部门',
            width: 200,
            key: 'department',
            render: (text, record) => {
              return (record.department && record.department) || '--'
            }
          }, {
            title: '职位',
            width: 200,
            key: 'position',
            render: (text, record) => {
              return (record.position && record.position) || '--'
            }
          }, {
            title: '电子邮箱',
            key: 'email',
            render: (text, record) => {
              return (record.email && record.email) || '--'
            }
          }, {
            title: '电话',
            key: 'phone',
            render: (text, record) => {
              return (record.phone && record.phone) || '--'
            }
          }, {
            title: '微信',
            key: 'we_chat',
            render: (text, record) => {
              return (record.we_chat && record.we_chat) || '--'
            }
          }, {
            title: '操作',
            render: (text, record) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Link
                  to={`/inspection/employee/edit/${record.id}`}
                  style={{ marginRight: '5px' }}
                >编辑</Link>
                <Popconfirm
                  title="确定要删除吗？"
                  onConfirm={() => { this.deleteGroup(record) }}
                >
                  <Button
                    type="simple"
                    style={{ border: 'none', padding: 0, color: "#357aff", background: 'transparent' }}
                  >删除</Button>
                </Popconfirm>
              </div>
            ),
          }]}
        />
      </div>

    );
  }
}

export default InspectorInformation;