import {
  combineReducers,
} from 'redux'
import {
  FETCH_DAILY_INSPENTION_REPORT_CARD,
  FETCH_DAILY_INSPENTION_REPORT_CARD_SUCCESS,
  FETCH_DAILY_INSPENTION_REPORT_CARD_FAIL
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
export default combineReducers({
  reportCardData: fetchDailyInspentionReport,
})
