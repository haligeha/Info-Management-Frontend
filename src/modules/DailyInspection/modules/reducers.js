import {
  combineReducers,
} from 'redux'
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

const fetchDailyInspentionReport = (state = {
  isFetching: false,
  fetched: false, // 成功获取过一次之后更新为true
  data: [],
}, action) => {
  switch (action.type) {
    case FETCH_DAILY_INSPENTION_REPORT_CARD:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_DAILY_INSPENTION_REPORT_CARD_SUCCESS:
      return {
        data: action.payload,
        isFetching: false,
        fetched: true,
      }
    case FETCH_DAILY_INSPENTION_REPORT_CARD_FAIL:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
const getInspectionPeople = (state = {
  isFetching: false,
  fetched: false,
  data: [],
}, action) => {
  switch (action.type) {
    case GET_INSPECTION_PEOPLE:
      return {
        ...state,
        isFetching: true,
      }
    case GET_INSPECTION_PEOPLE_SUCCESS:
      return {
        data: action.payload,
        isFetching: false,
        fetched: true,
      }
    case GET_INSPECTION_PEOPLE_FAIL:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
const fetchDutyPeople = (state = 1, action) => {
  switch (action.type) {
    case FETCH_DUTY_PEOPLE:
      return action.payload
    default:
      return state
  }
}
const fetchInspectionDate = (state = '', action) => {
  switch (action.type) {
    case FETCH_INSPENTION_DATE:
      return action.payload
    default:
      return state
  }
}


export default combineReducers({
  reportCardData: fetchDailyInspentionReport,
  inspectionPeople: getInspectionPeople,
  dutyPeople: fetchDutyPeople,
  selectedDate: fetchInspectionDate
})
