import {
  combineReducers,
} from 'redux'

import {
  HELLOWORLD_SET_NAME
} from './actionTypes'

const setName = (state = 'xxx', action) => {
  switch (action.type) {
  case HELLOWORLD_SET_NAME:
    return action.payload
  default:
    return state
  }
}

export default combineReducers({
  name: setName
})