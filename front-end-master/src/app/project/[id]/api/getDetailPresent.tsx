import apiClient from '../../../api/axiosInstance'

const getDetailPresent = async (id: string) => {
  try {
    const res = await apiClient.get(`/get_project_present_phase/${id}`)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getDetailPresent
