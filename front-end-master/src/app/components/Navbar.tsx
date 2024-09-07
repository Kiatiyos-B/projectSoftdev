'use client'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { AiFillFolderOpen } from 'react-icons/ai'
import { BsPencilSquare, BsFillPatchCheckFill } from 'react-icons/bs'
import { RiPresentationFill } from 'react-icons/ri'
import { GoMail } from 'react-icons/go'

const NavItem = ({ text, href, icon }: { text: string, href: string, icon: React.ReactNode }) => {
  const pathname = usePathname()

  const projectPath = () => {
    return pathname.includes('project') && href == '/'
  }

  const linkStyle = `font-semibold hover:text-orange-500 hover:bg-orange-100 mt-1 px-4 py-3 rounded flex items-center gap-3 ${pathname == href || projectPath() ? 'bg-orange-100 text-orange-500' : 'text-slate-600'}`
  return (
    <li>
      <Link href={href} className={linkStyle}>
        {icon}
        {text}
      </Link>
    </li>
  )
}

const NavStudent = () => {
  return (
    <Fragment>
      <NavItem text='Projects' href='/' icon={<AiFillFolderOpen size={24} />} />
      <NavItem text='Group Requests' href='/join-request' icon={<GoMail size={24} />} />
    </Fragment>
  )
}

const NavAdvisor = () => {
  return (
    <Fragment>
      <NavItem text='Projects' href='/' icon={<AiFillFolderOpen size={24} />} />
      <NavItem text='Join Requests' href='/join-request' icon={<GoMail size={24} />} />
    </Fragment>
  )
}

const NavAdmin = () => {
  return (
    <Fragment>
      <NavItem text="Projects" href='/' icon={<AiFillFolderOpen size={24} />} />
      <NavItem text='Progress Plan' href='/progress-plan' icon={<BsPencilSquare size={24} />} />
      <NavItem text='Approve Tasks' href='/approve-tasks' icon={<BsFillPatchCheckFill size={24} />} />
      <NavItem text='Presentation' href='/presentation' icon={<RiPresentationFill size={24} />} />
    </Fragment>
  )
}

export default function Navbar({ role }: { role: string }) {
  return (
    <nav className="h-screen border-r-[0.5px] border-neutral-400 w-[275px] z-40 fixed p-4 items-center">
      <div className="flex justify-between mb-2 pb-4">
        <Image src="/logo.svg" alt='logo' width={47} height={47} />
        <div className="flex items-center gap-[6px]">
          <div className='text-right'>
            <p className='text-xs'>Thanasak Limsila</p>
            <p className='text-xs text-slate-600'>65015068@kmitl.ac.th</p>
          </div>
          <div><Image src="/profile.svg" alt='profile' width={30} height={30} /></div>
        </div>
      </div>
      <div className="">
        <span className='text-xs font-medium text-slate-600'>Navigation</span>
        <div>
          <ul>
            {role == 'Coordinator' ? <NavAdmin /> : role == 'Advisor' ? <NavAdvisor /> : <NavStudent />}
          </ul>
        </div>
      </div>
    </nav>
  )
}
