import apiClient from '../../../api/axiosInstance'

type StudScoreType = {
  id: number
  std_id: string
  name: string
  score: number | null
}

type StudScoreBody = {
  professor_id: number
  project_id: number
  score: StudScoreType[]
}

const submitStdScore = async (body: StudScoreBody) => {
  try {
    const res = await apiClient.put("/edit_student_score", body)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

export default submitStdScore
