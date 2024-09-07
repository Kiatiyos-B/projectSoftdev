import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ExamineStudent({ std_id, id, name, value, onChange }: any) {
  const customStyles = {
    color: '#f36a00',
  };

  return (
    <div>
      <div className="border-2 rounded mt-4 mx-12">
        <RadioGroup className="grid grid-cols-8 items-center" id={id} onChange={onChange} value={value}>
          <div className='grid p-4 pl-10 col-span-1 '>
            <p>{std_id}</p>
          </div>
          <div className='grid p-4 pl-10 col-span-2 w-fit'>
            <p className='w-fit'>{name}</p>
          </div>
          <div className='grid grid-cols-10 col-span-5 justify-between'>
            <FormControlLabel value="10" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="9" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="8" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="7" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="6" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="5" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="4" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="3" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="2" control={<Radio style={customStyles} size='small' />} label="" />
            <FormControlLabel value="1" control={<Radio style={customStyles} size='small' />} label="" />
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

