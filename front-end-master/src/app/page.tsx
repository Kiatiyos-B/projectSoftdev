'use client'

import { Box, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from 'react'
import getAllProjects from "./api/getAllProjects"
import getProjectsById from "./api/getProjectsById"
import { useRouter } from 'next/navigation'

import userData from "../../userTestData"

const Phase = ({ text }: { text: string }) => {
  const colorStyle = text == "Planning" ? 'bg-teal-200 text-teal-600' : text == "Update Progress" ? 'bg-blue-200 text-blue-600' : text == "Final Documents" ? 'bg-purple-200 text-purple-600' : text == "Presentation" ? 'bg-rose-200 text-rose-600' : 'bg-amber-200 text-amber-600'

  return (
    <div className={`px-4 py-1 font-semibold rounded-3xl text-sm ${colorStyle}`}>{text}</div>
  )
}

type PItemProps = {
  id: string
  name: string
  description: string
  author: string
  update_at: string
  phase: string
}

const PItem = ({ name, description, author, phase, update_at, id }: PItemProps) => {

  const router = useRouter()
  const toDetailPage = (id: string, phase: string) => {
    if (phase != "Presentation" && phase != "Done") {
      alert('this page is not available')
      return
    }
    router.push(`project/${id}`)
  }

  return (
    <Box className="border rounded-xl p-6 flex items-center justify-between cursor-pointer hover:border-orange-500 relative">
      <button className="absolute inset-0" onClick={() => toDetailPage(id, phase)} />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">{name}</h2>
        <p className="text-slate-600">{description}</p>
        <p className="text-slate-600">{author}</p>
      </div>
      <div className="flex items-end flex-col gap-4">
        <Phase text={phase} />
        <p className="text-slate-600">last updated: {update_at}</p>
      </div>
    </Box>
  )
}

export default function Home() {

  const [projects, setProjects] = useState<[]>([])

  useEffect(() => {

    if (userData.role === "Coordinator") {
      getAllProjects().then((res: any) => {
        if (res.status != 200) return
        setProjects(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else if (userData.role === "Advisor") {
      getAllProjects().then((res: any) => {
        if (res.status != 200) return
        setProjects(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      getProjectsById(userData.id).then((res: any) => {
        if (res.status != 200) return
        setProjects(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <div>
          <div className="flex gap-2 relative">
            All
            <div className="flex items-center justify-center px-2 bg-orange-500 rounded-3xl font-medium text-white">4</div>
            <div className="absolute w-full h-[2px] bg-orange-500 bottom-[-16px]"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="max-w-[180px]">
            <TextField
              label="Project ID"
              size="small"
              fullWidth
            />
          </div>
          <div className="max-w-[180px]">
            <TextField
              label="Project name"
              size="small"
              fullWidth
            />
          </div>
          <div className="max-w-[180px] hidden">
            <TextField
              label="Advisor"
              size="small"
              fullWidth
            />
          </div>
          <div className="max-w-[180px]">
            <FormControl sx={{ minWidth: 130 }} size="small">
              <InputLabel>Phase</InputLabel>
              <Select label="Phase" value="All">
                <MenuItem value="Planning">Planning</MenuItem>
                <MenuItem value="Update Progress">Update Progress</MenuItem>
                <MenuItem value="Final Documents">Final Documents</MenuItem>
                <MenuItem value="Presentation">Presentation</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="All">All</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="py-4 flex flex-col gap-2">
        {
          projects.length !== 0 ? (
            projects.map((p: PItemProps) => (
              <PItem
                key={p.id} // Assuming p.id is a unique identifier
                name={p.name}
                description={p.description}
                author={p.author}
                update_at={p.update_at}
                phase={p.phase}
                id={p.id}
              />
              ))
          ) : (
            <p>No projects to display.</p>
          )
        }
      </div>
    </div>
  )
}
