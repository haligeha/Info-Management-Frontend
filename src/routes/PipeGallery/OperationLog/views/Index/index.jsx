import React, { Component, } from 'react';
import { PageTitle, } from '@src/components';
import {Button} from 'antd';
import { Link } from 'react-router-dom'

class OperationLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }


  render() {
    return (
      <div>
        <PageTitle titles={['运营管理', '操作日志']}>
          {
            <Link to={"/pipe/log/new"}>
              <Button type="primary">+ 详情</Button>
            </Link>
          }
        </PageTitle>
      </div>

    );
  }
}

export default OperationLog;