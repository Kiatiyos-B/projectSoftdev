"use client"

import Progress_bar from "../../components/Progressbar"
import Box_detail from "../../components/box_detail"
import Present_schedule from "../../components/box_present_schedule"
import Attachments from "../../components/Attachments"
import { useEffect, useState } from 'react'
import dayjs from "dayjs"
import userData, { defaultPath } from "../../../../userTestData"

import getDetailPresent from './api/getDetailPresent'
import getProjectPermission from './api/getProjectPermission'
import getEvaluateScore from './api/getEvaluateScore'

type PageProps = { params: { id: string } }

type PresentationType = {
  location: string
  date: string
  time: string
  chairman: string
  examiners: string[]
}

type DetailType = {
  project_id: string
  project_name: string
  description: string
  phase: string
  author: string
  create_at: string
  update_at: string
  presentation: PresentationType | undefined
  documents: [{ name: string, create_at: string, path: string }]
}

export default function Page({ params }: PageProps) {

  const [detail, setDetail] = useState<DetailType | undefined>(undefined)
  const [scoreStatus, setScoreStatus] = useState(false)
  const [role, setRole] = useState()

  useEffect(() => {

    if (userData.role != 'Student') {
      getProjectPermission(Number(params.id), userData.id).then((res: any) => {
        if (res.status != 200) {
          alert('Permission denied')
          return
        }

        setRole(res.data.role)

        getEvaluateScore(Number(params.id), userData.id).then((res: any) => {
          if (res.status != 200) return
          setScoreStatus(true)
        })

        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }

    getDetailPresent(params.id).then((res: any) => {
      if (res.status != 200) return
      console.log(res.data)
      setDetail(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col p-8">
      <Progress_bar />
      <Box_detail
        name={detail?.project_name}
        descriptions={detail?.description}
        author={detail?.author}
        create={dayjs(detail?.create_at).format("DD/MM/YYYY")}
        update={dayjs(detail?.update_at).format("DD/MM/YYYY")}
        textColor="black"
      />

      <Present_schedule
        date={detail?.presentation ? dayjs(detail.presentation.date).format("DD/MM/YYYY") : '-'}
        time={detail?.presentation ? detail.presentation.time.slice(0, -3) : '-'}
        exam={detail?.presentation ? detail.presentation.examiners.join(", ") : '-'}
        chair={detail?.presentation ? detail.presentation.chairman : '-'}
        location={detail?.presentation ? detail.presentation.location : '-'}
        project_id={params.id}
        scoreDisplay={scoreStatus}
        role={role}
      />

      <p className='my-6 text-[#7c858e]'>Attachments</p>
      <div className="grid grid-rows-1 grid-cols-3 gap-4">
      {
    detail?.documents && detail.documents.length !== undefined  ? (
      detail.documents.map((item, index) => (
        <Attachments
          key={index}
          filename={item.name}
          date={dayjs(item.create_at).format("DD/MM/YYYY")}
          path={item.path}
        />
      ))
    ) : (
      <p>ยังไม่ได้ส่ง</p>
    )
  }
      </div>

    </div>
  )
}
