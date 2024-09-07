'use client'

import React from 'react'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import getAvarage from './api/getAvarage'

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className='font-medium text-slate-500'>{children}</h2>
  )
}

const ScoreTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className='text-orange-500'>{children}</h3>
  )
}

const Block = ({ text, score }: { text: string, score: number }) => {
  return (
    <Box className="p-3 rounded-md border max-w-[500px] flex items-center justify-between"><span>{text}</span><span className='text-orange-500'>{score}</span></Box>
  )
}

type AverageProps = {
  project_title: number
  research: number
  design: number
  develop: number
  slide: number
  presentation: number
  nonverbal: number
  content: number
  style: number
  perfection: number
  demonstration: number
  grade: string
}

type StudScoreProps = {
  id: number
  name: string
  score: number
}

type ReportProps = {
  prof_in_room: number
  submited_form: number
  not_yet_submit: string[]
  student_score: StudScoreProps[]
  average: AverageProps
  comment: string[]
}

type PageProps = {
  params: { id: string }
}

const Page = ({ params }: PageProps) => {

  const empty = {
    project_title: 0,
    research: 0,
    design: 0,
    develop: 0,
    slide: 0,
    presentation: 0,
    nonverbal: 0,
    content: 0,
    style: 0,
    perfection: 0,
    demonstration: 0,
    grade: ""
  }

  const [report, setReport] = useState<ReportProps>({
    prof_in_room: 0,
    submited_form: 0,
    not_yet_submit: [],
    student_score: [],
    average: empty,
    comment: []
  })

  useEffect(() => {
    getAvarage(Number(params.id)).then((res: any) => {
      if (res.status != 200) return
      setReport(res.data[0])
      console.log(res.data[0])
    })
  }, [])

  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <Box className="flex gap-4">
          <Title>Form submitted</Title>
          <Box className="bg-orange-500 px-3 rounded-lg text-white font-semibold">{report?.submited_form}/{report?.prof_in_room}</Box>
        </Box>
      </Box>

      <Box>
        <Title>Note yet submit:</Title>
        <Box className="pl-4 mt-2">
          {
            report.not_yet_submit.length != 0 ? report?.not_yet_submit.map((item, index) =>
              <p key={index} className='font-medium mb-2'>{index + 1}. {item}</p>
            ) : (
              <p>-</p>
            )
          }
        </Box>
      </Box>

      <Box>
        <Title>Students Socre</Title>
        <Box className="pl-4 mt-2">{report?.student_score.map((item, index) => (
          <Box key={index} className='font-medium mb-2 flex gap-4'>
            <span>{index + 1}. {item.name}</span>
            <span className='text-orange-500'>{item.score ?? 0}/10</span></Box>
        ))}</Box>
      </Box>

      <Box>
        <Title>Evaluation Score</Title>
        <Box className="pl-4 mt-4 flex flex-col gap-2">
          <ScoreTitle>ประเมินชิ้นงาน</ScoreTitle>
          <Block text='หัวข้อโครงการ' score={report?.average.project_title ?? 0} />
          <Block text='การค้นข้อมูล' score={report?.average.research ?? 0} />
          <Block text='การออกแบบ' score={report?.average.design ?? 0} />
          <Block text='การพัฒนา' score={report?.average.develop ?? 0} />
        </Box>

        <Box className="pl-4 mt-4 flex flex-col gap-2">
          <ScoreTitle>การดำเนินด้วยวาจา</ScoreTitle>
          <Block text='สไลด์' score={report?.average.slide ?? 0} />
          <Block text='การนำเสนอ' score={report?.average.presentation ?? 0} />
          <Block text='อวัจนภาษา' score={report?.average.nonverbal ?? 0} />
        </Box>

        <Box className="pl-4 mt-4 flex flex-col gap-2">
          <ScoreTitle>ปริญยานิพนธ์</ScoreTitle>
          <Block text='เนื้อหา' score={report?.average.content ?? 0} />
          <Block text='รูปแบบ' score={report?.average.style ?? 0} />
        </Box>

        <Box className="pl-4 mt-4 flex flex-col gap-2">
          <ScoreTitle>ผลงานและการสาธิต</ScoreTitle>
          <Block text='ความสมบูรณ์ของชิ้นงาน' score={report?.average.perfection ?? 0} />
          <Block text='การสาธิต' score={report?.average.demonstration ?? 0} />
        </Box>

        <Box className="pl-4 mt-4 flex items-center gap-12">
          <ScoreTitle>เกรดที่เหมาะสม</ScoreTitle>
          <Box className="px-6 py-2 border rounded">{report?.average.grade ?? 0}</Box>
        </Box>
      </Box>

      <Box className="mt-4">
        <Title>Coment from Professors</Title>
        <Box className="flex flex-col gap-2 mt-2 pl-4">
          {
            report.comment.length != 0 ? report?.comment.map((value, index) => (
              <p key={index}>{index + 1}. {value}</p>
            )) : (
              <p>-</p>
            )
          }
        </Box>
      </Box>
    </Box >
  )
}

export default Page
