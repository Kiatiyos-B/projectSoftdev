import apiClient from './axiosInstance'

const getAllProjects = async () => {
  try {
    const res = await apiClient.get('/get_projects_with_profess_name')
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getAllProjects
