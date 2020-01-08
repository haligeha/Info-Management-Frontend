import React, { Component, } from 'react';
import { PageTitle, } from '@src/components';
import { Timeline } from 'antd';
import { fetch } from '@src/lib'
import './index.styl'
let user_id = window.sessionStorage.getItem("user_id")
class OperationLog extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    //const data = fetch(`/api/v1/info/syslog?user_id=${user_id}&limit=10&page=0`)
    //console.log(data)

  }

  render() {
    return (
      <div>
        <PageTitle titles={['运营管理', '操作日志']} />
        <div className="operation-log">
          <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item color="red">Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          </Timeline>
        </div>

      </div>
    );
  }
}

export default OperationLog;