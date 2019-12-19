// import { fetch, jsonToParams } from '../../../../lib/index'
import axios from 'axios';

export async function fetchDailyInspentionReportApi(params, id) {
  console.log(params + 'redux中接收到的services参数')

  axios.get(`/api/v1/info/inspectionReportByPage?date=${params}&limit=4&page=0&user_id=${id}`)
    .then((res) => {
      if (res && res.status === 200) {
        console.log(res.data.data + "redux中services数据")
        return res.data.data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}