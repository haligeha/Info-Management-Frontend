import {
  HELLOWORLD_SET_NAME,
  HELLOWORLD_LOAD_DATA
} from './actionTypes';

export const setName = payload => ({
  type: HELLOWORLD_SET_NAME,
  payload,
})

export const loadData = payload => ({
  type: HELLOWORLD_LOAD_DATA,
  payload,
})