'use client'

import { useEffect } from 'react'
import { Button } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'

import EditModal from './EditModal'
import RemoveModal from './RemoveModal'
import RoomList from './RoomList'

import { usePresentationContext } from './presentationContext'

export default function Page() {

  const {
    presentRooms,
    editModal,
    removeId,
    openCreateModal,
    fetchPresentRooms,
  } = usePresentationContext()

  useEffect(() => {
    fetchPresentRooms()
  }, [])

  return (

    <div>
      {editModal && (<EditModal />)}
      {removeId && (<RemoveModal />)}

      <div className='flex items-center justify-between'>
        <h2 className="text-slate-600">Presentation Schedule</h2>
        <div className="flex justify-end">
          <Button onClick={openCreateModal} variant='contained' className='bg-orange-500 hover:bg-orange-500'>
            Create new
            <AiOutlinePlus className="ml-2" />
          </Button>
        </div>
      </div>

      <RoomList rooms={presentRooms} />
    </div>
  )
}
