import { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box, Button, SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs';

import { DateInput, SearchInput, TextInput, TimeInput, SelectInput } from '../components/SetInputs'
import NameItemList from './NameItem'

import { usePresentationContext } from './presentationContext'
import { RoomInfo, ErrorInputs, Professor, PresentRoomBody } from './typings';
import {
  findProfById,
  filterProfByName,
  isChairmanAvailable,
  isExaminerAvailable,
  isDateInRange,
  validateProjectId,
  validateFormInputs,
  fetchProfWithStatus,
  fetchProjectById
} from './utils'

const EditModal = () => {
  const { closeModal, editData, handleCreateRoom, handleEditRoom } = usePresentationContext()
  const [serverNote, setServerNote] = useState("")
  const [inputs, setInputs] = useState<RoomInfo>({
    id: '',
    location: '',
    date: '',
    time: '',
    education_year: dayjs().year().toString(),
    chairman: { id: 0, name: "" },
    examiners: [],
    presenters: []
  })
  const [error, setError] = useState<ErrorInputs>({
    location: "",
    date: "",
    time: "",
    education_year: "",
    chairman: "",
    examiners: "",
    presenters: ""
  })
  const [professors, setProfessors] = useState<Professor[]>([])
  const [filterProfessor, setFilterProfessor] = useState<Professor[]>([])
  const [examiner, setExaminer] = useState<Professor>({ id: 0, name: "" })
  const [presenter, setPresenter] = useState(0)

  const years = dayjs().year() - 1
  const yearValues = Array.from({ length: 5 }, (_, index) => (years + index).toString())

  useEffect(() => {
    if (editData) setInputs(editData)
    const fetchData = async () => {
      const data = await fetchProfWithStatus(dayjs().year().toString())
      setProfessors(data)
    }

    fetchData()
  }, [])

  const onClose = () => {
    setInputs({
      id: '',
      location: '',
      date: '',
      time: '',
      education_year: dayjs().year().toString(),
      chairman: { id: 0, name: "" },
      examiners: [],
      presenters: []
    })
    setError({
      location: "",
      date: "",
      time: "",
      education_year: "",
      chairman: "",
      examiners: "",
      presenters: ""
    })
    setExaminer({ id: 0, name: "" })
    setPresenter(0)
    setServerNote("")
    closeModal()
  }

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(prev => ({ ...prev, location: "" }))
    setInputs(prev => ({ ...prev, location: e.target.value }))
  }

  const onChangeYear = async (e: SelectChangeEvent<string>) => {
    setError(prev => ({ ...prev, education_year: "" }))
    setInputs(prev => ({ ...prev, education_year: e.target.value }))
    const data = await fetchProfWithStatus(e.target.value)
    setProfessors(data)
  }

  const onChangeDate = ((date: any) => {
    setInputs(prev => ({ ...prev, date: dayjs(date).format("DD-MM-YYYY") }))
    const error = isDateInRange(date)
    setError(prev => ({ ...prev, date: error }))
  })

  const onChangeTime = ((time: any) => {
    setInputs(prev => ({ ...prev, time: dayjs(time).format("hh:mm") }))
    setError(prev => ({ ...prev, time: "" }))
  })

  const onChangeChairman = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const { filteredProf, hasPerfectMatch } = filterProfByName(input, professors)
    const error = hasPerfectMatch ?
      isChairmanAvailable(filteredProf[0], inputs.examiners) :
      (filteredProf.length === 0 ? "Name don't match" : "")
    setFilterProfessor(hasPerfectMatch ? [] : filteredProf)
    setError(prev => ({ ...prev, chairman: error }))
    setInputs(prev => ({
      ...prev,
      chairman: hasPerfectMatch && !error ? filteredProf[0] : { id: 0, name: input }
    }))
  }

  const onSelectChairman = ((id: string) => {
    const prof = findProfById(Number(id), filterProfessor)
    if (!prof) return
    const error = isChairmanAvailable(prof, inputs.examiners)
    setInputs(prev => ({ ...prev, chairman: error ? { id: 0, name: prof.name } : prof }))
    setError(prev => ({ ...prev, chairman: error }))
    setFilterProfessor([])
  })

  const onChangeExaminer = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const { filteredProf, hasPerfectMatch } = filterProfByName(inputValue, professors)
    const error = filteredProf.length === 0 ? "Name don't match" : ""
    setFilterProfessor(hasPerfectMatch ? [] : filteredProf)
    setError(prev => ({ ...prev, examiners: error }))
    setExaminer(hasPerfectMatch ? filteredProf[0] : { id: 0, name: inputValue })
  })

  const onSelectExaminer = ((id: string) => {
    const prof = findProfById(Number(id), filterProfessor)
    if (!prof) return
    const error = !prof.room_status ? `${prof.name} already in other room` : ""
    setError(prev => ({ ...prev, examiners: error }))
    setExaminer(error ? { id: 0, name: prof.name } : prof)
    setFilterProfessor([])
  })

  const handleAddExaminer = () => {
    const error = isExaminerAvailable(examiner, inputs.chairman, inputs.examiners)
    setError(prev => ({ ...prev, examiners: error }))
    if (error) return
    const currExaminers = inputs.examiners
    currExaminers.push(examiner)
    setInputs((prev) => ({ ...prev, examiners: currExaminers }))
    setExaminer({ id: 0, name: "" })
  }

  const handleRemoveExaminer = (id: number) => {
    const currExaminers = inputs.examiners.filter(ex => ex.id !== id)
    setInputs(prev => ({ ...prev, examiners: currExaminers }))
    setError(prev => ({ ...prev, examiners: "" }))
  }

  const onChangePresenter = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/ /g, '')
    if (!/^[1-9]\d{0,9}$/.test(input) && input.length != 0) return
    setPresenter(Number(input))
    setError(prev => ({ ...prev, presenters: "" }))
  })

  const handleAddPresenter = async (id: number) => {
    try {
      const error = validateProjectId(id, inputs.presenters)
      if (error) {
        setError((prev) => ({ ...prev, presenters: error }))
        return
      }

      const project = await fetchProjectById(id)

      if (project.presentation) {
        setError((prev) => ({ ...prev, presenters: "This project already has a presentation room" }))
        return
      }

      const currentPresenters = inputs.presenters
      currentPresenters.push({ id: project.id, name: project.name })
      setInputs((prev) => ({ ...prev, presenters: currentPresenters }))
      setError((prev) => ({ ...prev, presenters: "" }))
      setPresenter(0)

    } catch (error) {
      console.log(error)
      setError((prev) => ({ ...prev, presenters: "Project not found, Please check your ID" }))
    }
  }

  const handleRemovePresenter = (id: number) => {
    const currPresenters = inputs.presenters.filter(ex => ex.id !== id)
    setInputs(prev => ({ ...prev, presenters: currPresenters }))
  }

  const onClear = (id: string) => {
    if (id == "presenter") {
      setPresenter(0)
    } else if (id == "examiner") {
      setExaminer({ id: 0, name: "" })
    } else if (id == "chairman") {
      setInputs(prev => ({ ...prev, chairman: { id: 0, name: "" } }))
    } else {
      setInputs(prev => ({ ...prev, [id]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setServerNote("")
    e.preventDefault()

    const errors = validateFormInputs(inputs, error)
    if (errors) {
      setError(errors)
      return
    }

    let roomData: PresentRoomBody = {
      education_year: Number(inputs.education_year),
      location: inputs.location,
      date: inputs.date,
      time: inputs.time,
      chairman: inputs.chairman.id,
      examiners: inputs.examiners.map(item => { return item.id }),
      presenters: inputs.presenters.map(item => { return item.id })
    }

    try {
      if (inputs.id != "") {
        roomData.id = Number(inputs.id)
        await handleEditRoom(roomData)
      } else {
        await handleCreateRoom(roomData)
      }
      onClose()
    } catch (error: any) {
      console.log(error)
      setServerNote(error.response.data.message)
    }
  }

  return (
    <Box className='absolute top-0 left-0 right-0 min-h-full z-50 py-4 flex items-center justify-center bg-[#00000040]'>
      <Box className='bg-white mt-12 rounded-lg p-4 w-full max-w-[600px] self-center flex flex-col'>
        <Button className='self-end' onClick={onClose} color='error'><AiOutlineClose /></Button>
        <h3 className='font-bold text-xl text-center'>Create Presentation Plan</h3>
        <form className='mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
          <SelectInput label='Education Year' values={yearValues} currValue={inputs.education_year} onChange={onChangeYear} error={error.education_year} id='year' />
          <TextInput type='text' maxLength={51} label="Location*" id="location" onChange={onChangeLocation} value={inputs.location} error={error.location} onClear={onClear} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateInput label='Date*' id='date' value={inputs.date} error={error.date} onChange={onChangeDate} />
            <TimeInput label='Time*' id='time' value={inputs.time} error={error.time} onChange={onChangeTime} />
          </LocalizationProvider>
          <SearchInput label="Chairman*" id='chairman' value={inputs.chairman.name} error={error.chairman} onChange={onChangeChairman} onSelect={onSelectChairman} searchValue={filterProfessor} onClear={onClear} />
          <Box>
            <p className='font-semibold'>Examiners*</p>
            <div className='border-[0.5px] rounded-lg p-2'>
              <Box className='flex justify-between items-center gap-2 mb-2'>
                <SearchInput label="Examiner's name" id='examiner' value={examiner.name} error={error.examiners} onChange={onChangeExaminer} onSelect={onSelectExaminer} searchValue={filterProfessor} onClear={onClear} />
                <Button color='warning' onClick={() => handleAddExaminer()}>Add</Button>
              </Box>
              <NameItemList names={inputs.examiners} onRemove={handleRemoveExaminer} />
            </div>
          </Box>

          <Box>
            <p className='font-semibold'>Presenters*</p>
            <div className='border-[0.5px] rounded-lg p-2'>
              <div className='flex justify-between items-center gap-2 mb-2'>
                <TextInput label="Project ID" id="presenter" onChange={onChangePresenter} value={presenter ? presenter : ""} error={error.presenters} type='text' maxLength={10} onClear={onClear} />
                <Button color='warning' onClick={() => handleAddPresenter(presenter)}>Add</Button>
              </div>
              <NameItemList names={inputs.presenters} onRemove={handleRemovePresenter} />
            </div>
          </Box>
          {serverNote && (<Box className="text-red-500">Note: {serverNote}</Box>)}
          <Button type='submit' variant='outlined' color='warning'>{inputs.id ? 'Update' : 'Create'}</Button>
        </form>
      </Box >
    </Box >
  )
}

export default EditModal
