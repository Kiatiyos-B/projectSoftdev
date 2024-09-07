export default function Box_detail(props: any) {
  return (
    <div className="mt-4">
      <p className='my-6 text-[#7c858e]'>Project Detail</p>
      <div className="border border-solid border-stone-600 rounded-md">
        <div className="p-6 pb-4">
          <span className={`pb-2 flex fleex-col`}> <b>Name: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.name} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Descriptions: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.descriptions} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Author: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.author} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Created at: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.create} </p></span>
          <span className={`pb-2 flex fleex-col`}> <b>Updated at: </b> <p className='ml-4 w-fit text-[#7c858e]'>{props.update} </p></span>
        </div>
      </div>
    </div>
  )
}

