import {
  FETCH_DAILY_INSPENTION_REPORT_CARD,
  FETCH_DAILY_INSPENTION_REPORT_CARD_SUCCESS,
  FETCH_DAILY_INSPENTION_REPORT_CARD_FAIL
} from './actionTypes'
import * as API from '../services'

// 获取当日巡检报告
export const fetchDailyInspentionReport = (params) => async (dispatch, getState) => {
  console.log(params + 'redux中action中接收参数')
  const { dailyInspention: { reportCardData: { isFetching } } } = getState()
  if (isFetching) return
  try {
    dispatch({
      type: FETCH_DAILY_INSPENTION_REPORT_CARD,
    })
    const data = await API.fetchDailyInspentionReportApi(params)
    console.log(data + "redux中action数据")
    dispatch({
      type: FETCH_DAILY_INSPENTION_REPORT_CARD_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: FETCH_DAILY_INSPENTION_REPORT_CARD_FAIL,
    })
  }
}