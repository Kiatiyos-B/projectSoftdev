import apiClient from "../api/axiosInstance";
import { PresentRoomBody } from "./typings";

export const getAllPresentRooms = () => {
  return apiClient.get('/get_presents_in_year')
}

export const createPresentRoom = (body: PresentRoomBody) => {
  return apiClient.post('/create_present', body)
}

export const updatePresentRoom = (body: PresentRoomBody) => {
  return apiClient.put('/edit_present_by_id', body)
}

export const deletePresentRoom = (id: string) => {
  return apiClient.delete(`/delete_present_by_id/${id}`)
}

export const getProfWithStatus = (year: string) => {
  return apiClient.get(`get_professors_with_room_status/${year}`)
}

export const getProjectById = (id: number) => {
  return apiClient.get(`/get_project_by_id/${id}`)
}
