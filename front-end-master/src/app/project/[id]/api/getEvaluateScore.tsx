import apiClient from '../../../api/axiosInstance'

const getEvaluateScore = async (pj_id: number, prof_id: number) => {
  try {
    const res = await apiClient.post("/get_evaluate_score", { project_id: pj_id, professor_id: prof_id })
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getEvaluateScore
