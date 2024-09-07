import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'

import { RoomInfo } from './typings'

type RoomProps = {
  room: RoomInfo
  openEditModal: (room: RoomInfo) => void
  openRemoveModal: (id: string) => void
}

const RoomItem = ({ room, openEditModal, openRemoveModal }: RoomProps) => {
  const [showProject, setShowProject] = useState(false)
  const examiners_list = room.examiners.map(ex => { return ex.name }).join(", ")
  const formatDate = room.date.split('-').join("/")

  return (
    <Box className="border-[0.5px] p-6 rounded-lg flex items-start justify-between">
      <div className='flex flex-col gap-2'>
        <h3 className='text-2xl font-semibold'>{room.location}</h3>
        <p className='text-blue-500 font-medium'>Date: {formatDate}, Time: {room.time}</p>
        <p>
          <span className='font-semibold'>Education Year: </span>
          {room.education_year}
        </p>
        <p>
          <span className='font-semibold'>Examiners: </span>
          {examiners_list}
        </p>
        <p><span className='font-semibold'>Chairman: </span>
          {room.chairman.name}
        </p>
        <div>
          <div>
            <span className='font-semibold'>Presenters: </span>
            <Button className="underline underline-offset-2" color='warning' onClick={() => { setShowProject(!showProject) }}>click to see all</Button>
          </div>
          <div className={`mt-2 ${showProject ? '' : 'hidden'}`}>
            {room.presenters.map((p, index) => (<p key={index}>{index + 1}. {p.name}</p>))}
          </div>
        </div>
      </div>
      <div className='flex'>
        <Button onClick={() => openEditModal(room)}>Edit<AiOutlineEdit className="ml-2" /></Button>
        <Button color="error" onClick={() => openRemoveModal(room.id)}>Remove<BsTrash3 className="ml-2" /></Button>
      </div>
    </Box>
  )
}

export default React.memo(RoomItem)
