export default function On_examine(props: any) {
  return (
    <div className='grid grid-cols-8 items-center mx-12'>
      <div className="flex w-full justify-center pl-1 col-span-1">
        <p>ID</p>
      </div>
      <div className="flex w-full justify-start pl-10 col-span-2">
        <p>Name</p>
      </div>
      <div className="grid grid-cols-10 col-span-5 justify-between">
        <p>10</p>
        <p>9</p>
        <p>8</p>
        <p>7</p>
        <p>6</p>
        <p>5</p>
        <p>4</p>
        <p>3</p>
        <p>2</p>
        <p>1</p>
      </div>
    </div>
  )
}
