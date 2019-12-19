// import { fetch, jsonToParams } from '../../../../lib/index'
import axios from 'axios';

export async function fetchDailyInspentionReportApi(params) {
  console.log(params)
  axios.get(`/api/v1/info/inspectionReportByPage?date=${params}&limit=4&page=0&user_id=1`)
    .then((res) => {
      if (res && res.status === 200) {
        console.log(res.data.data)
        console.log("获取到的巡检报告数据")
        console.log(res.data)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}