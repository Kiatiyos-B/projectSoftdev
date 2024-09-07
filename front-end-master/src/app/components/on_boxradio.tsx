export default function On_box(props: any) {
  return (
    <div className='grid grid-cols-6 justify-items-center mt-8 pl-4 mr-10'>
      <div className="flex w-full justify-start pl-4 col-span-2">
        <p className=' text-[#f36a00]'>{props.Head}</p>
      </div>
      <p>4</p>
      <p>3</p>
      <p>2</p>
      <p>1</p>
    </div>
  )
}
