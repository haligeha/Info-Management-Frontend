import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../../components';
import {Button} from 'antd';

class EquipmentDetail extends Component{
  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    return (
      <div>
        <PageTitle titles={['应急指挥','应急资源','应急救援装备','详情']} />
      </div>
    );
  }
}

export default EquipmentDetail;