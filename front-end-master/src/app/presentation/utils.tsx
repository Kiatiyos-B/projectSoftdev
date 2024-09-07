import { getProfWithStatus, getProjectById } from "./api"
import { ErrorInputs, Presenter, Professor, RoomInfo } from "./typings"

export const fetchProfWithStatus = async (year: string) => {
  try {
    const res = await getProfWithStatus(year)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const fetchProjectById = async (id: number) => {
  try {
    const res = await getProjectById(id)
    return res.data[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const filterProfByName = (input: string, profsList: Professor[]) => {
  const cleanInput = input.toLowerCase().trim()
  const filtered = profsList.filter(prof => prof.name.toLowerCase().includes(cleanInput))
  const hasPerfectMatch = filtered.length == 1 && filtered[0].name.toLowerCase() === cleanInput
  return { filteredProf: filtered, hasPerfectMatch: hasPerfectMatch }
}

export const isChairmanAvailable = (prof: Professor, examiners: Professor[]) => {
  const foundExaminer = examiners.find(examiner => prof.id === examiner.id)
  if (foundExaminer) return `${prof.name} is already in Examiners role`
  return prof.room_status ? "" : `${prof.name} already in other room`
}

export const isExaminerAvailable = (prof: Professor, chairman: Professor, examiners: Professor[]) => {
  const { id, name, room_status } = prof
  const message =
    !id ?
      "Please correctly fill out examiner's name"
      : id && id == chairman.id ?
        `${name} is already in Chairman role`
        : !room_status ?
          `${name} already in other room`
          : examiners.find(ex => ex.id === id) ?
            "This person is already added"
            : examiners.length == 4 ?
              "Can not add more examiners"
              : ""
  return message
}

export const findProfById = (id: number, profsList: Professor[]) => {
  return profsList.find((prof: Professor) => prof.id == Number(id))
}

export const isDateInRange = (date: Date) => {
  const today = new Date()
  const fiveYearAhead = new Date()
  fiveYearAhead.setFullYear(today.getFullYear() + 5)
  return date <= today ? "Please select a future date" : date > fiveYearAhead ? "Date can not be greater than 5 years" : ""
}

export const validateProjectId = (id: number, presenters: Presenter[]) => {
  const message =
    presenters.length === 10 ?
      "Can not add more presenter"
      : !id ?
        "Please fill out before added"
        : presenters.find(p => p.id === id) ?
          "This Project is already added"
          : ""
  return message
}

const ERROR_MESSAGE = {
  REQUIRED: "This field is required",
  MIN_LENGTH: "At least 3 characters required",
  ADD_AT_LEASET_ONE: "Please add at least 1"
}

const isLocationEmpty = (input: string) => {
  const alphanumRex = /[a-zA-Z0-9ก-๙]/g
  const matchs = input.trim().match(alphanumRex)
  return matchs === null || matchs.length < 3 ? ERROR_MESSAGE.MIN_LENGTH : ""
}

export const validateFormInputs = (inputs: RoomInfo, currError: ErrorInputs) => {
  const { location, date, time, education_year, chairman, examiners, presenters } = inputs
  const detectedError = {
    location: isLocationEmpty(location),
    date: !date || currError.date ? currError.date || ERROR_MESSAGE.REQUIRED : "",
    time: !time || currError.time ? currError.time || ERROR_MESSAGE.REQUIRED : "",
    education_year: !education_year ? ERROR_MESSAGE.REQUIRED : "",
    chairman: !chairman.id ? currError.chairman || ERROR_MESSAGE.REQUIRED : "",
    examiners: !examiners.length ? currError.examiners || ERROR_MESSAGE.ADD_AT_LEASET_ONE : "",
    presenters: !presenters.length ? currError.presenters || ERROR_MESSAGE.ADD_AT_LEASET_ONE : ""
  }
  return Object.values(detectedError).some(error => error !== "") ? detectedError : null
}
