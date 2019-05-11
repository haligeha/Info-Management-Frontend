import React,{Component} from 'react';
import {PageTitle,Module} from '../../../../../components';
import {Button} from 'antd';

class EmergencyResourceNew extends Component{
  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    return (
      <div>
        <PageTitle titles={['应急指挥','应急资源','新建']} />
      </div>
    );
  }
}

export default EmergencyResourceNew;