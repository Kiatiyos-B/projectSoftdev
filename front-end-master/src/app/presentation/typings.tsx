export type Professor = {
  id: number,
  name: string,
  room_status?: boolean
}

export type Presenter = {
  id: number,
  name: string
}

export type RoomInfo = {
  id: string
  location: string
  date: string
  time: string
  education_year: string
  chairman: Professor
  examiners: Professor[]
  presenters: Professor[]
}

export type ErrorInputs = {
  location: string
  date: string
  time: string
  education_year: string
  chairman: string
  examiners: string
  presenters: string
}

export type PresentRoomBody = {
  id?: number,
  education_year: number,
  location: string,
  date: string,
  time: string,
  chairman: number,
  examiners: number[],
  presenters: number[]
}
