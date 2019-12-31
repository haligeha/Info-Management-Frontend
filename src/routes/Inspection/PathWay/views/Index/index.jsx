import React from 'react';
import { PageTitle, Module, } from '@src/components';
import { Button, Row, Col, Table, Input, Popconfirm, message, Form, DatePicker, Icon } from 'antd';
import axios from 'axios';
import BMap from 'BMap'
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 6;
const Search = Input.Search;

class PathWay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,
      data: [],
      area: '',
      nowCurrent: FIRST_PAGE,
      mapVisible: false, // 模态框初始不显示
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount() {
    this.getGroupList(FIRST_PAGE);

  }

  //获取列表信息
  getGroupList = (page) => {
    const { size, area_belong } = this.state;
    axios.get(`/api/v1/info/inspectionPathByPage?limit=${size}&page=${page}&area_belong=${area_belong}&user_id=6`)
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
    axios.delete(`/api/v1/info/inspection?id=${record.id}`)
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
      area_belong: nameValue
    });
    console.log(this.state)
    this.getGroupList(0)
  }
  // 控制模态框显示
  showMapModal = () => {
    this.setState({
      mapVisible: true,
    });
    // var { BMap } = window;
    var map = new BMap.Map("routeMap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  };

  closeMapModal = e => {
    console.log(e);
    this.setState({
      mapVisible: false,
    });
  };

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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const columns = [{
      title: '序号',
      key: 'index',
      render: (text, record, index) => { return (index + 1) }
    }, {
      title: '线路编号',
      key: 'number',
      render: (text, record) => { return (record.number && record.number) || '--' }
    }, {
      title: '线路名称',
      key: 'number1',
      render: (text, record) => { return (record.name && record.name) || '--' }
    }, {
      title: '所属区域',
      key: 'area_belong',
      render: (text, record) => {
        return (record.area_belong && record.area_belong) || '--'
      }
    }, {
      title: '所属管廊',
      key: 'pipe_belong',
      render: (text, record) => {
        return (record.pipe_belong && record.pipe_belong) || '--'
      }
    }, {
      title: '线路起始点',
      key: 'startpoint',
      render: (text, record) => {
        return (record.startpoint && record.startpoint) || '--'
      }
    }, {
      title: '线路终止点',
      key: 'endpoint',
      render: (text, record) => {
        return (record.endpoint && record.endpoint) || '--'
      }
    }, {
      title: '创建时间',
      key: 'create_date',
      render: (text, record) => {
        return (moment(parseInt(record.create_date)).format('YYYY-MM-DD HH:mm:ss')) || '--'
      }
    }, {
      title: '启用/停用',
      key: 'startpoint1',
      render: (text, record) => {
        return (record.status && record.status) || '--'
      }
    }, {
      title: '说明描述',
      key: 'description',
      render: (text, record) => {
        return (record.description && record.description) || '--'
      }
    }, {
      title: '操作',
      render: (text, record) => (
        <div className="operate-btns"
          style={{ display: 'block' }}
        >
          <Link
            to={`/inspection/pathway/edit/${record.id}`}
            style={{ marginRight: '5px' }}
          >编辑</Link>
          <Button type="link" onClick={this.showMapModal}>查看</Button>
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
    }]
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const colSpan = {
      span: 6,
    }
    const {
      form,
    } = this.props
    const {
      getFieldDecorator,
    } = form
    return (
      <div className="path-way">
        <div style={{ opacity: (this.state.mapVisible === true) ? "0.3" : "1" }}>
          <PageTitle titles={['巡检维护', '巡检路线']}>
            {
              <Link to={"/inspection/pathway/new"}>
                <Button type="primary">+ 新建巡检路线</Button>
              </Link>
            }
          </PageTitle>
          <Module>
            <Form onSubmit={this.selectActivity}>
              <Row>
                <Col {...colSpan}>
                  <Form.Item {...formItemLayout} label="所在区域：">
                    {getFieldDecorator('activityId')(
                      <Input
                        placeholder="请输入所属区域"
                        onBlur={this.judgeID}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item {...formItemLayout} label="是否启用：">
                    {getFieldDecorator('activityName')(
                      <Input
                        placeholder="请输入启用状态"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item {...formItemLayout} label="创建日期：">
                    {getFieldDecorator('operatorName')(
                      <DatePicker showTime placeholder="请选择创建日期" />,
                      // <Input placeholder="请选择创建日期" />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 28 }} onClick={this.onReset}>清空</Button>
                  </div>
                </Col>
              </Row>
            </Form>
            {/* <Row>
            <Col span={2}>所属区域：</Col>
            <Col span={4}>
              <Search
                placeholder="请输入所属区域"
                enterButton
                onSearch={value => this.selectActivity(value)}
              />
            </Col>
          </Row> */}
          </Module>
          <Table
            className="group-list-module"
            bordered
            footer={() => <div>
              <Button type="danger"><Icon type="delete" /> 删除</Button>
              <Button type="danger"><Icon type="printer" /> 打印</Button>
              <Button type="danger"><Icon type="download" /> 导出</Button>
            </div>}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={{
              current,
              total,
              pageSize: size,
              onChange: this.handlePageChagne,
            }}
            columns={columns}
          />
        </div>
        <div className="path-map" style={{ display: (this.state.mapVisible === true) ? "" : "none" }} >
          <p>路线查看</p><Icon className="path-map-icon" type="close-circle" onClick={this.closeMapModal} />
          <div style={{ width: '550px', height: '350px' }} id="routeMap"></div>
        </div>
      </div>

    );
  }
}

export default Form.create()(PathWay);