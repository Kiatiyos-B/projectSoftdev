import { Box, Button } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import { usePresentationContext } from './presentationContext'

const RemoveModal = () => {
  const { removeId, closeRemoveModal, handleRemoveRoom } = usePresentationContext()
  return (
    <Box className='absolute top-0 left-0 right-0 min-h-full z-50 py-4 flex items-center justify-center bg-[#00000040]'>
      <Box className='bg-white mt-12 rounded-lg p-4 w-full max-w-[600px] self-center flex flex-col text-center gap-4'>
        <Button className='self-end' color='error' onClick={closeRemoveModal}><AiOutlineClose /></Button>
        <h4 className='font-bold'>Do you want to remove this presentation?</h4>
        <p>Presantation ID: {removeId}</p>
        <Button color='warning' onClick={handleRemoveRoom}>Remove</Button>
      </Box>
    </Box>
  )
}

export default RemoveModal
