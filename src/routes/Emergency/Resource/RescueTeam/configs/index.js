export const SELECT_TEAM_CATEGORY_ONE = '0';
export const SELECT_TEAM_CATEGORY_TWO = '1';
export const SELECT_TEAM_CATEGORY_THREE = '2';

export const SELECT_TEAM_CATEGORY_MAP ={
  [SELECT_TEAM_CATEGORY_ONE]: '基础设备',
  [SELECT_TEAM_CATEGORY_TWO]: '干粉灭火器',
  [SELECT_TEAM_CATEGORY_THREE]: '泡沫灭火器'
}

export const SELECT_TEAM_CATEGORY = Object.keys(SELECT_TEAM_CATEGORY_MAP).map(cur => ({
  id:cur,
  name:SELECT_TEAM_CATEGORY_MAP[cur]
}));