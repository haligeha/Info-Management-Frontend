import React,{Component} from 'react';
import {PageTitle} from '../../../../../components' ;


class ApprovedNew extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }    
  }
   
  render(){
    return (
      <div>
        <PageTitle titles={['应急指挥','预案审批','新建审批']}/>      
      </div>
    );
    
      
  
  }
}

export default ApprovedNew;
