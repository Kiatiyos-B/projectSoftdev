import apiClient from "../../api/axiosInstance"

const getAvarage = async (id: number) => {
  try {
    const res = await apiClient.get(`get_average_score_by_project_id/${id}`)
    return res
  } catch (error) {
    return error
  }
}

export default getAvarage
