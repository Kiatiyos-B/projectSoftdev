import apiClient from './axiosInstance'

const getProjectsByProfId = async (id: number) => {
  try {
    const res = await apiClient.get(`/get_project_by_profess_id/${id}`)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getProjectsByProfId
