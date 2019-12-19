import {
  combineReducers,
} from 'redux'
import { reducers as hello } from './EntranceWork'
import { reducers as dailyInspention } from './DailyInspection'
export default combineReducers({
  hello, dailyInspention
})
