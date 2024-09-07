'use client'
import { usePathname } from 'next/navigation'
import { IoMdNotifications } from 'react-icons/io'

const convertTitle = (path: string) => {
  let parts = path.split('-')
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  return parts.join(' ')
}

const Arrow = () => {
  return (
    <span className='px-4'>&gt;</span>
  )
}

export default function Head() {
  const pathname = usePathname()
  const listOfPath = pathname.split('/')
  let displayPath = listOfPath[1] == '' ? 'Projects' : convertTitle(listOfPath[1])
  return (
    <div className='pb-4 border-b-[0.5px] border-neutral-400'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <span className='text-xl font-bold'>{displayPath}</span>
        </div>
        <div className="flex items-center">
          <div className='text-slate-600'><IoMdNotifications size={28} /></div>
        </div>
      </div>
    </div>
  )
}
