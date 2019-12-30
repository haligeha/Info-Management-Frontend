import { fetch, jsonToParams } from '@src/lib'

export async function fetchDailyInspentionReportApi(params) {
  console.log("haha")
  console.log(params)
  const data = await fetch(`/api/v1/info/inspectionReportByPage?${params && jsonToParams(params)}`)
  return data
}

export async function getInspectionPeopleApi(params) {
  const data = await fetch(`/api/v1/user/userByPage?${params && jsonToParams(params)}`)
  return data
}

