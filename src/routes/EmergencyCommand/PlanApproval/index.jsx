import React,{Component} from 'react';
import {PageTitle,Module} from '../../../components';


class PlanApproval extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){

    return (
      <div>
        <PageTitle titles={['应急指挥','预案审批']} />
        <Module>
          <p>预案审批</p>
        </Module>
      </div>
    );
  }

}

export default PlanApproval;