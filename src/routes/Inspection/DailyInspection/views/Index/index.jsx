import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Calendar,LocaleProvider,Badge,Icon} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
const listData = [
  {calendar_date:'2019-05-28',inspection_person: 'Jackson'},
];
class DailyInspection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
    };
  }
  
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  getdate(value) {
    var now = new Date(value),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
}

  getListData = (value)=>{
    let date
    if(this.getdate(value)===listData[0].calendar_date) {
      date=listData[0].calendar_date
    }
    else{
      date=''
    }
    return date;
  }
  
  dateCellRender=(value)=> {
    const listDatamap = this.getListData(value);
    if(listDatamap !==''){
      return(
      <Badge dot>
        <Icon type="notification" />
      </Badge>

      )
    }
  }

 

  render(){
    const {selectedValue}=this.state
      return(
        <div>
          <PageTitle titles={['巡检维护','日常巡检/年度巡检']}>
            {
              <Link to={"/inspection/calendar/new"}>
                <Button type="primary">+ 新建日常巡检</Button>
              </Link>
            }
          </PageTitle>
          <div style={{ width: 700, border: '1px solid #d9d9d9', borderRadius: 4,float:"left" }}>
            <LocaleProvider locale={zh_CN}>
            <Calendar 
             // fullscreen={false}
              onSelect={this.onSelect}
              dateCellRender={this.dateCellRender}
            />
            </LocaleProvider>
           
          </div>

          <div style={{ width:500,height:320, border: '1px solid #d9d9d9', borderRadius: 4,float:"right" }}>
          {/* {selectedValue.format('YYYY-MM-DD')} */}
          巡检时间：{this.getListData(selectedValue)}
          巡检人员：
          </div>
        </div>
      )
  }

}
export default DailyInspection;