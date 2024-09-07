import userData from '../../../userTestData'
import Link from 'next/link'

export default function Present_schedule(props: any) {
  const handleBox = () => {
    if (userData.role != "Student") {
      return <button className="border-2 border-[#f57d1f] text-[#f57d1f] rounded-md w-fit p-3 m-4 hover:border-[#7c858e]"><Link href={`/project/${props.project_id}/evaluate`}>{props.scoreDisplay ? 'Edit Score' : 'Evaluate'}</Link></button>
    }
  }

  return (
    <div className="mt-4">
      <p className='my-6 text-[#7c858e]'>Presentation Schedule</p>
      <div className="border border-solid border-stone-600 rounded-md">
        <div className="p-6 pb-4">
          <span className={`pb-2 flex fleex-col`}> <b>Date: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.date} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Time: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.time} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Chairman: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.chair} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Examiners: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.exam} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Location: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.location} </p></span>
        </div>
        <div >
          {
            handleBox()
          }
          {props.role == 'author' && (
            <button className="border-2 border-[#f57d1f] text-[#f57d1f] rounded-md w-fit p-3 hover:border-[#7c858e]"><Link href={`/project/${props.project_id}/report`}>View Score</Link></button>
          )}
        </div>
      </div>
    </div>
  )
}

