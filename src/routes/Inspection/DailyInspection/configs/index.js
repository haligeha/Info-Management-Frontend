// 巡检人
export const SELECT_HOME_WORK_NUM_ONE = '0';
export const SELECT_HOME_WORK_NUM_TWO = '1';
export const SELECT_HOME_WORK_NUM_THREE = '2';

export const SELECT_HOME_WORK_NUM_MAP = {
  [SELECT_HOME_WORK_NUM_ONE]: '张三',
  [SELECT_HOME_WORK_NUM_TWO]: '李四',
  [SELECT_HOME_WORK_NUM_THREE]: '王二',
};

export const SELECT_HOME_WORK_NUM = Object.keys(SELECT_HOME_WORK_NUM_MAP).map(cur => ({
  id: cur,
  name: SELECT_HOME_WORK_NUM_MAP[cur],
}));

// 巡检总况
export const SELECT_INSPECTION_STATUS_NORMAL = '0';
export const SELECT_INSPECTION_STATUS_ABNORMAL = '1';

export const SELECT_INSPECTION_STATUS_MAP = {
  [SELECT_INSPECTION_STATUS_NORMAL]: '正常',
  [SELECT_INSPECTION_STATUS_ABNORMAL]: '异常',
};

export const SELECT_INSPECTION_STATUS = Object.keys(SELECT_INSPECTION_STATUS_MAP).map(cur => ({
  id: cur,
  name: SELECT_INSPECTION_STATUS_MAP[cur],
}));
