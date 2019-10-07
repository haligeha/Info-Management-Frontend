import React, { Component, } from 'react';
import { PageTitle } from '../../../../../components';
import { Button,Calendar,LocaleProvider,Badge,Icon,} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import './index.styl'

let dateList=[];
let reportList=[]
var user_id=window.sessionStorage.getItem("user_id")
class DailyInspection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
      data:[],
      report:[],
      reportShow:'',
    };
    this.getAllReport=this.getAllReport.bind(this);
  }
  
  componentDidMount(){
    this.getAllReport();
  }

  //获取全部巡检信息
  getAllReport=()=>{
    axios.get(`/api/v1/info/allReport?user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          this.setState({
            data: res.data,
          });
          this.getData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //在有事件发生的日期上添加标识
    dateCellRender=(value)=> {
      for (let m=0;m<dateList.length;m++){  
        if(this.getdate(value)===dateList[m]){   
          return(         
            <Badge dot>
              <Icon type="notification" />
            </Badge>
          )
        }
        // else{     
       
      // }
      }
    
    }
  
  //获取日期数组
  getData =()=>{
    const {data}=this.state
    const DateList=[]
    let calen='';
    for (var i=0;i<data.length;i++){
      calen=this.timestampToTime(data[i].calendar_date)
      DateList.push(calen);
      dateList=this.unique(DateList)
    }

  }
  //数组去重
  unique=(arr)=> {
    return Array.from(new Set(arr))
  }

  //获取每一个日期
  // getData = (value)=>{
  //   const {data}=this.state 
  //   for(var i=0;i<data.length;i++){
  //     let date
  //     if(this.getdate(value)===this.getdate(data[i].calendar_date)) {
  //       date=this.getdate(data[i].calendar_date)
  //     }
  //     else{
  //       date=''
  //     }
  //     console.log(date)
  //   return date;
  //   }
  // }
  
  //点击日期时，将该天状态存入state
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    }, ()=> {
      this.getListData()
    });
   
  };

  //点击日期后 右侧显示具体信息
  getListData = ()=>{
    const{selectedValue}=this.state;
    const select= this.getdate(selectedValue)+" 0:0:0"
    console.log(select)
    const selected=Math.round(new Date(select).getTime()/1000).toString()  
    axios.get(`/api/v1/info/inspectionReportByPage?date=${selected}&limit=4&page=0&user_id=${user_id}`)
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data.data)
          reportList=[]
          for (var i=0;i<res.data.data.length;i++){
            let reportone=res.data.data[i]
            reportList.push(reportone)
          }
          this.setState({report:reportList})
      
        }       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getdate=(value)=> {
    var now = new Date(value),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
  }

  //数据库中日期格式转换
  timestampToTime=(timestamp)=>{
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    return Y+M+D;
  }

  insertReport=()=>{
    const{report}=this.state
    for(var i=0;i<report.length;i++){
      console.log(i)  
      return (<div>123</div>)    
    }

  }

  // getListData = (value)=>{
  //   let date
  //   if(this.getdate(value)===listData[0].calendar_date) {
  //     date=listData[0].calendar_date
  //   }
  //   else{
  //     date=''
  //   }
  //   return date;
  // }
  // getListData = (value) =>{
  //   const{selectedValue}=this.state;

  // }

  // dateCellRender=(value)=> {
  // //  const listDatamap = this.getListData(value);
  //   const listDatamap = this.getData(value);
  //   if(listDatamap !==''){
  //     return(
  //     <Badge dot>
  //       <Icon type="notification" />
  //     </Badge>

  //     )
  //   }
  // }

 

  render(){
    const {report}=this.state
    const elements=[];
    report.forEach((item)=>{
      elements.push(
        <div className="report">
          巡检时间：{this.timestampToTime(item.calendar_date)}&nbsp;
          巡检人员：{item.inspection_person}<br/>
          负责人：{item.duty_person}&nbsp;
          创建时间：{item.create_date}<br/>
          巡检状态：{item.state}&nbsp;
          异常项：{item.abnormal}<br/>
          维修公司：{item.maintenance}&nbsp;
          图像：{item.image}<br/>
          视频：{item.video}&nbsp;
          总结：{item.summary}<br/>
        </div>
      )
    });
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

        <div style={{ width:500,height:320, border: '1px solid #d9d9d9', borderRadius: 4,float:"right","overflow-y":"scroll" }}>
          {/* {selectedValue.format('YYYY-MM-DD')} */}
          {/* 巡检时间：{this.getListData(selectedValue)}
          巡检人员： */}
          
          {elements}
          
        </div>
      </div>
    )
  }

}
export default DailyInspection;