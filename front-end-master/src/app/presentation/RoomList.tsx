import RoomItem from './RoomItem'
import { RoomInfo } from './typings'
import { usePresentationContext } from './presentationContext'

const RoomList = ({ rooms }: { rooms: RoomInfo[] }) => {
  const { openRemoveModal, openEditModal } = usePresentationContext()
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {rooms.length != 0 && (
        rooms.map((room: RoomInfo) => (
          <RoomItem room={room} key={room.id} openRemoveModal={openRemoveModal} openEditModal={openEditModal} />
        ))
      )}
    </div>
  )
}

export default RoomList
