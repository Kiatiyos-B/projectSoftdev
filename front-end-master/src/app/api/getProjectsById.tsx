import apiClient from './axiosInstance'

const getProjectsById = async (id: number) => {
  try {
    const res = await apiClient.get(`/get_project_by_std_id/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getProjectsById
