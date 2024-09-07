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

const submitScore = async (body: ScoreBody) => {
  try {
    const res = await apiClient.post("/create_evaluate_score", body)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default submitScore
