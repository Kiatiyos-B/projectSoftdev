import apiClient from '../../../api/axiosInstance'

type ScoreBody = {
  project_id: number
  professor_id: number
  project_title: number
  research: number
  design: number
  slide: number
  develop: number
  presentation: number
  nonverbal: number
  content: number
  style: number
  perfection: number
  demonstration: number
  grade: string
  comment: string
}

const editSubmitScore = async (body: ScoreBody) => {
  try {
    const res = await apiClient.put("/edit_evaluate_score", body)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default editSubmitScore
