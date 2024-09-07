import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Boxradio(props: any) {

  const customStyles = {
    color: '#f36a00',
  };

  return (
    <div >
      <div className="grid grid-cols-6 grid-rows-1 border-2 rounded mt-4 mx-12">
        <div className='grid w-full p-4 pl-10 col-span-2'>
          <p>{props.header}</p>
        </div>
        <RadioGroup className="col-span-4 grid grid-cols-4 items-center" id={props.id} onChange={(e) => props.onRadioChange(e, props.id)} value={props.value}>
          <FormControlLabel className='m-auto' value="4" control={<Radio style={customStyles} size='small' />} label="" />
          <FormControlLabel className='m-auto' value="3" control={<Radio style={customStyles} size='small' />} label="" />
          <FormControlLabel className='m-auto' value="2" control={<Radio style={customStyles} size='small' />} label="" />
          <FormControlLabel className='m-auto' value="1" control={<Radio style={customStyles} size='small' />} label="" />
        </RadioGroup>
      </div>
    </div>

  )
}

