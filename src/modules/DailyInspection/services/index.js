import { fetch, jsonToParams } from '@src/lib'

export async function fetchDailyInspentionReportApi(params) {
  console.log(params + 'redux中接收到的services参数')
  const data = await fetch(`/api/v1/info/inspectionReportByPage?${params && jsonToParams(params)}`)
  console.log(data + "redux中services数据")
  return data
}