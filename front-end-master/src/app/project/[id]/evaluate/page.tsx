"use client"

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import userData from '../../../../../userTestData'
import { useRouter } from 'next/navigation'

import On_box from "../../../components/on_boxradio"
import Boxradio from "../../../components/boxradio"
import ExamineStudent from "../../../components/examine_student"
import On_examine from "../../../components/on_examinestudent"

import getProjectPermission from "../api/getProjectPermission"
import getEvaluateScore from '../api/getEvaluateScore'
import getStudentScore from '../api/getStudentScore'
import submitStdScore from '../api/submitStdScore'
import submitScore from '../api/submitScore'
import editSubmitScore from '../api/editSubmitScore'

type ScoreType = {
  project_id: number
  professor_id: number
  project_title: number
  research: number
  design: number
  slide: number
  develop: number
  presentation: number
  nonverbal: number
  content: number
  style: number
  perfection: number
  demonstration: number
  grade: string
  comment: string
}

type StudScoreType = {
  id: number
  std_id: string
  name: string
  score: number | null
}

type PageProps = {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  const [score, setScore] = useState<ScoreType>({
    project_id: Number(params.id),
    professor_id: userData.id,
    project_title: 0,
    research: 0,
    design: 0,
    slide: 0,
    develop: 0,
    presentation: 0,
    nonverbal: 0,
    content: 0,
    style: 0,
    perfection: 0,
    demonstration: 0,
    grade: "A",
    comment: ""
  })

  const [stdScore, setStdScore] = useState<StudScoreType[]>([])
  const [role, setRole] = useState('examiner')
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getProjectPermission(Number(params.id), userData.id).then((res: any) => {
      if (res.status != 200) {
        alert("Permission denied")
      }
      setRole(res.data.role)

      if (res.data.role == 'author') {
        getStudentScore(Number(params.id), userData.id).then((res: any) => {
          if (res.status != 200) return
          setStdScore(res.data)
        })
      }

      getEvaluateScore(Number(params.id), userData.id).then((res: any) => {
        if (res.status != 200) {
          return
        }
        const data: ScoreType = res.data.data[0]
        setIsEdit(true)
        setScore({
          project_id: data.project_id,
          professor_id: userData.id,
          project_title: data.project_title,
          research: data.research,
          design: data.design,
          slide: data.slide,
          develop: data.develop,
          presentation: data.presentation,
          nonverbal: data.nonverbal,
          content: data.content,
          style: data.style,
          perfection: data.perfection,
          demonstration: data.demonstration,
          grade: data.grade,
          comment: data.comment
        })
      })
    })
  }, [])

  const onChangeScore = (e: React.ChangeEvent<HTMLElement>, id: string) => {
    setScore(prev => ({
      ...prev,
      ['id']: (e.target as HTMLInputElement).value
    }))
  }

  const onChangeGrade = (e: SelectChangeEvent<string>) => {
    setScore(prev => ({
      ...prev,
      ['grade']: e.target.value
    }))
  }

  const onChangeStd = (e: React.ChangeEvent<HTMLElement>, id: string) => {
    const value = Number((e.target as HTMLInputElement).value);
    setStdScore((prevStdScore) =>
      prevStdScore.map((item) =>
        item.id === Number(id) ? { ...item, score: value } : item
      )
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (role == 'author') {
      for (const item of stdScore) {
        if (!item.score) {
          console.log(stdScore)
          alert("Please complete the form")
          return
        }
      }
      submitStdScore({
        professor_id: userData.id,
        project_id: Number(params.id),
        score: stdScore
      }).then((res: any) => {
        console.log(res)
      })
    }

    
     // Except comment
    const values = Object.keys(score) as (keyof ScoreType)[];
    values.pop()
    const filteredValues = values.filter((key) => !score[key]);
    const isComplete = filteredValues.length;
    if (isComplete) {
      console.log(score)
      alert('Please complete the form')
      return
    }

    if (isEdit) {
      editSubmitScore(score).then((res: any) => {
        console.log(res)
        if (res.status == 200) {
          alert(res.data.message)
          router.push(`/project/${params.id}`)
        }
      })

    } else {
      submitScore(score).then((res: any) => {
        console.log(res)
        if (res.status == 201) {
          alert(res.data.message)
          router.push(`/project/${params.id}`)
        }
      })
    }
  }

  return (
    <div>
      {
        role == "author" && (
          <div>
            <div>
              <p className="m-4 text-[#f36a00]">Members</p>
            </div>
            <div className="border-2 rounded py-12 mx-12">
              <On_examine />
              {
                stdScore.map((item: StudScoreType, index) => (
                  <ExamineStudent
                    std_id={item.std_id}
                    id={item.id}
                    name={item.name}
                    value={item.score !== null ? item.score.toString() : ''} // Check if item.score is not null
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedScore = [...stdScore];
                      updatedScore[index].score = parseInt(e.target.value, 10); // Convert string to number
                      setStdScore(updatedScore);
                    }}
                    key={index}
                  />
                ))
                
              }
            </div>
          </div>
        )
      }

      <form onSubmit={handleSubmit} action="presentation-phase">
        <On_box Head='ประเมินชิ้นงาน' />
        <Boxradio header='หัวข้อโครงการ' onRadioChange={onChangeScore} value={score?.project_title} id="project_title" />
        < Boxradio header='การค้นข้อมูล' onRadioChange={onChangeScore} value={score?.research} id="research" />
        <Boxradio header='การออกแบบ' onRadioChange={onChangeScore} value={score?.design} id="design" />
        <Boxradio header='การพัฒนา' onRadioChange={onChangeScore} value={score?.develop} id="develop" />
        <br />
        <br />
        <On_box Head='การดำเนินด้วนวาจา' />
        <Boxradio header='สไลด์' onRadioChange={onChangeScore} value={score?.slide} id="slide" />
        <Boxradio header='การนำเสนอ' onRadioChange={onChangeScore} value={score?.presentation} id="presentation" />
        <Boxradio header='อวัจนภาษา' onRadioChange={onChangeScore} value={score?.nonverbal} id="nonverbal" />
        <br />
        <br />
        <On_box Head='ปริญญานิพนธ์' />
        <Boxradio header='เนื้อหา' onRadioChange={onChangeScore} value={score?.content} id="content" />
        <Boxradio header='รูปแบบ' onRadioChange={onChangeScore} value={score?.style} id="style" />
        <br />
        <br />
        <On_box Head='ผลงานและการสาธิต' />
        <Boxradio header='ความสมบูรณ์ของชิ้นงาน' onRadioChange={onChangeScore} value={score?.perfection} id="perfection" />
        <Boxradio header='การสาธิต' onRadioChange={onChangeScore} value={score?.demonstration} id="demonstration" />
        <br />
        <br />


        <div className="mt-8 mx-12">
          <p className="text-[#f36a00] ">เกรดที่เหมาะสม</p>
          <div className="grid grid-cols-6 pl-12">
            <p className="col-span-2">สำหรับให้คณะกรรมการหลักสูตรพิจารณา<br />*ไม่มีผลต่อคะแนนสอบ</p>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth >
                <Select
                  value={score.grade} onChange={onChangeGrade}
                  id="grade"
                >
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"B+"}>B+</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C+"}>C+</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"D+"}>D+</MenuItem>
                  <MenuItem value={"D"}>D</MenuItem>
                  <MenuItem value={"F"}>F</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div>
          <p className="mx-12 mt-8 mb-6 text-[#f36a00]">Comment</p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            placeholder="Comment . . ."
            fullWidth
            className="px-12 ml-4"
            onChange={(e) => onChangeScore(e, "comment")}
            value={score.comment}
          />
        </div>
        <div className="flex flex-col py-6">
          <button className=" self-center border-2 border-[#f57d1f] text-[#f57d1f] rounded-md w-fit p-3 m-4 hover:border-[#7c858e]"  >
            <b>Submit</b>
          </button>
        </div>
      </form>
    </div>
  )
}
