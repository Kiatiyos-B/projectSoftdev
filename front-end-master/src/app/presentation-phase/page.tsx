"use client"

import Progress_bar from "../components/Progressbar"
import Box_detail from "../components/box_detail"
import Present_schedule from "../components/box_present_schedule"
import Attachments from "../components/Attachments"

export default function Page() {

  return (
    <div className="flex min-h-screen flex-col p-8">
      <Progress_bar />
      <Box_detail
        name="Mr.su"
        descriptions="Bla Bla Bla..."
        author="Dr.thanaboy"
        create="2021-10-10"
        update="2021-10-11"
        textColor="black"
      />

      <Present_schedule
        date="2021-10-10"
        time="10.00-11.00"
        exam="Dr.thanaboy, Dr.JR, Dr.PP"
        location="KMITL"
      />


      <p className='my-6 text-[#7c858e]'>Attachments</p>
      <div className="grid grid-rows-1 grid-cols-3 gap-4">
        <Attachments
          filename="File Document.pdf"
          date="2021-10-10"
          path="https://www.sadudee.org/wp-content/uploads/2017/04/I-could-sing-of-your-love-forever.pdf"
        />
        <Attachments
          filename="Presentation.pdf"
          date="2021-10-10"
        />


      </div>


    </div>
  )
}
