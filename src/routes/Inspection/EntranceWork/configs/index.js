export const SELECT_HOME_WORK_NUM_ONE = '0';
export const SELECT_HOME_WORK_NUM_TWO = '1';
export const SELECT_HOME_WORK_NUM_THREE = '2';

export const SELECT_HOME_WORK_NUM_MAP = {
  [SELECT_HOME_WORK_NUM_ONE]: '管廊1号',
  [SELECT_HOME_WORK_NUM_TWO]: '管廊2号',
  [SELECT_HOME_WORK_NUM_THREE]: '管廊3号',
};

export const SELECT_HOME_WORK_NUM = Object.keys(SELECT_HOME_WORK_NUM_MAP).map(cur => ({
  id: cur,
  name: SELECT_HOME_WORK_NUM_MAP[cur],
}));