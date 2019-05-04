import React,{Component} from 'react';
import {PageTitle,Module} from '../../../components';


class EmergencyResource extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){

    return (
      <div>
        <PageTitle titles={['应急指挥','应急资源']} />
        <Module>
          <p>应急资源</p>
        </Module>
      </div>
    );
  }

}

export default EmergencyResource;