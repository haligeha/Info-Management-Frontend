import React,{Component} from 'react';
import {PageTitle,Module} from '../../../components';


class EmergencyPlan extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){

    return (
      <div>
        <PageTitle titles={['应急指挥','应急预案']} />
        <Module>
          <p>应急预案</p>
        </Module>
      </div>
    );
  }

}

export default EmergencyPlan;