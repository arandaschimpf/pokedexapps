export type Data = {
  id: number
  name: string
}
const dataList: Data[] = [
  { id: 1, name: 'Argentina' },
  { id: 2, name: 'Chile' },
  { id: 3, name: 'Bolivia' },
  { id: 4, name: 'Peru' },
  { id: 5, name: 'Colombia' },
]

export const findDataById = async (id: number) => {
  return dataList.find(p => p.id === id)
}

export const findDataByName = async (name: string) => {
  return dataList.find(p => p.name === name)
}

export const getDataList = async (page?: number): Promise<{ list: Data[], count: number}> => {
  if (!page) { return { list: dataList, count: dataList.length } }
  return { list: dataList.slice((page - 1) * 5, page * 5), count: dataList.length }
}

export const addData = async (data: Data) => {
  if (dataList.some((p) => p.id === data.id)) {
    throw new Error('Pokemon already exists')
  }
  dataList.push(data)
  return data
}

export const deleteData = async (dataId: number) => {
  const index = dataList.findIndex((data) => data.id === dataId)
  if (index === -1) {
    throw new Error('Data not found')
  }
  return dataList.splice(index, 1)[0]
}