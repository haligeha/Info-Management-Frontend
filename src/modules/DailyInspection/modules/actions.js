import {
  FETCH_DAILY_INSPENTION_REPORT_CARD,
  FETCH_DAILY_INSPENTION_REPORT_CARD_SUCCESS,
  FETCH_DAILY_INSPENTION_REPORT_CARD_FAIL,
  GET_INSPECTION_PEOPLE,
  GET_INSPECTION_PEOPLE_SUCCESS,
  GET_INSPECTION_PEOPLE_FAIL,
  FETCH_DUTY_PEOPLE,
  FETCH_INSPENTION_DATE
} from './actionTypes'
import * as API from '../services'

// 获取当日巡检报告
export const fetchDailyInspentionReport = (params) => async (dispatch, getState) => {
  const { dailyInspention: { reportCardData: { isFetching } } } = getState()
  if (isFetching) return
  try {
    dispatch({
      type: FETCH_DAILY_INSPENTION_REPORT_CARD,
    })
    const data = await API.fetchDailyInspentionReportApi(params)
    console.log(data)
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
// 值班人
export const fetchDutyPeople = payload => ({
  type: FETCH_DUTY_PEOPLE,
  payload,
})
// 日期
export const fetchInspectionDate = payload => ({
  type: FETCH_INSPENTION_DATE,
  payload,
})

// 获取人员信息
export const getInspectionPeople = (params) => async (dispatch, getState) => {
  const { dailyInspention: { inspectionPeople: { isFetching } } } = getState()
  if (isFetching) return
  try {
    dispatch({
      type: GET_INSPECTION_PEOPLE,
    })
    const data = await API.getInspectionPeopleApi(params)
    dispatch({
      type: GET_INSPECTION_PEOPLE_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: GET_INSPECTION_PEOPLE_FAIL,
    })
  }
}