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
  // Copia de la lista original  y Ordena la lista por el campo 'id'
  let sortedList = [...dataList];
  sortedList.sort((a, b) => a.id - b.id);
  // Si no se especifica la página, devuelve la lista completa ordenada
  if (!page) {
    return { list: sortedList, count: sortedList.length };
  }
  // Calcula el rango de elementos para la página especificada
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  // Devuelve la lista ordenada y paginada
  return { list: sortedList.slice(startIndex, endIndex), count: sortedList.length };
};

export const addData = async (data: Data) => {
  if (dataList.some((p) => p.id === data.id)) {
    throw new Error('Data already exists')
  }
  dataList.push(data)
  console.log((await getDataList()).list)
  return data
}

export const deleteData = async (dataId: number) => {
  const index = (await getDataList()).list.findIndex((data) => data.id === dataId)
  if (index === -1) {
    throw new Error('Data not found')
  }
  console.log((await getDataList()).list)
  return dataList.splice(index, 1)[0]
}