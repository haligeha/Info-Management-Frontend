import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../../components';
import {Button} from 'antd';

class MaterialDetail extends Component{
  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    return (
      <div>
        <PageTitle titles={['应急指挥','应急资源','应急救援物资','详情']} />
      </div>
    );
  }
}

export default MaterialDetail;