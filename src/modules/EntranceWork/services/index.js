import axios from 'axios';

export async function getList(){
  const { data } = await axios.get('/api/general/section/list');
  return data;
}




