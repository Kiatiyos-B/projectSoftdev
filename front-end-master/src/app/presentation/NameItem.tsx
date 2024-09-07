import { AiOutlineClose } from 'react-icons/ai'
import { Button } from '@mui/material'

type NameItem = {
  index: number
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void
  item: { id: number, name: string }
}

type NameListProps = {
  names: any[]
  onRemove: (id: number) => void
}

const NameItem = ({ index, item, onRemove }: NameItem) => {
  return (
    <div className="mx-2 flex items-center justify-between">
      {index}. {item.name}
      <Button onClick={onRemove} color='error' id={item.id.toString()}><AiOutlineClose /></Button>
    </div>
  )
}

const NameItemList = ({ names, onRemove }: NameListProps) => {
  return (
    <div className="flex flex-col gap-1">
      {names.map((item, index) => (
        <NameItem key={index} index={index + 1} item={item} onRemove={() => onRemove(item.id)} />
      ))}
    </div>
  )
}

export default NameItemList
