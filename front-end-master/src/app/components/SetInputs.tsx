import React, { useState } from 'react'
import {
  TextField,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AiOutlineClose } from 'react-icons/ai'
import dayjs from 'dayjs';

import { Professor } from '../presentation/typings';

type TextInputProp = {
  label: string
  id: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
  type: string
  maxLength: number
  onClear: (id: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

type DateTimeInputProp = {
  label: string
  id: string
  value: string
  onChange: (time: any) => void
  error: string
}

type SearchInputProp = {
  label: string
  id: string
  value: string
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelect: (id: string) => void
  onClear: (id: string) => void
  searchValue: Professor[]
}

type SearchItemProp = {
  id: string,
  text: string,
  status: boolean | undefined,
  onClick: (id: string) => void
}

export const TextInput = ({ label, id, value, error, onChange, onFocus, onBlur, onClear, type, maxLength }: TextInputProp) => {

  const filterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/^\s+/, '').replace(/[^\w\dก-๙\-_. ]/g, '')
    onChange(e)
  }

  return (
    <Box className="w-full relative">
      <TextField
        fullWidth
        size="small"
        color="warning"
        helperText={error == "" ? undefined : error}
        error={error == "" ? false : true}
        label={label}
        id={id}
        onChange={filterValue}
        inputProps={{ maxLength: maxLength }}
        autoComplete="off"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
      />
      <AiOutlineClose className="absolute top-3 right-2 cursor-pointer text-slate-500 hover:text-black" onClick={() => onClear(id)} />
    </Box>
  )
}

const SearchItem = ({ id, text, status, onClick }: SearchItemProp) => {
  return (
    <div
      id={id}
      onClick={() => onClick(id)}
      className='cursor-pointer p-1 hover:bg-gray-100 rounded flex items-center justify-between'
    >
      {text}
      <span onClick={() => onClick(id)} className={`${status ? 'text-green-500 bg-green-200' : 'text-red-500 bg-red-200'} px-2 rounded-lg`}>{status ? 'avaliable' : 'not avaliable'}</span>
    </div>
  )
}

export const SearchInput = ({ label, id, value, error, onChange, onSelect, onClear, searchValue }: SearchInputProp) => {
  const [dropdown, setDropdown] = useState(false)
  const handleFocus = () => {
    setDropdown(true)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setDropdown(false);
    }, 200)
  }
  return (
    <Box className="flex gap-2 relative w-full">
      <TextInput
        label={label}
        id={id}
        value={value}
        onChange={onChange}
        error={error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type='text'
        maxLength={50}
        onClear={() => onClear(id)}
      />
      <div
        className={
          `absolute z-50 top-[45px] left-0 right-0 bg-white drop-shadow rounded p-2 
          ${dropdown && searchValue.length != 0 ? "" : "hidden"}`
        }
      >
        {searchValue.map((item: Professor) => (
          <SearchItem
            id={item.id.toString()}
            key={item.id} text={item.name}
            onClick={onSelect}
            status={item.room_status}
          />
        ))}
      </div>
    </Box>
  )
}

export const DateInput = ({ label, id, value, onChange, error }: DateTimeInputProp) => {
  const dateValue = dayjs(value, "DD-MM-YYYY")
  return (
    <DatePicker
      slotProps={{
        textField: {
          error: error == "" ? false : true,
          helperText: error == "" ? undefined : error,
          fullWidth: true,
          size: 'small',
          label: label,
          color: 'warning',
          id: id,
        }
      }}
      onChange={onChange}
      value={dateValue}
    />
  )
}

export const TimeInput = ({ label, id, value, onChange, error }: DateTimeInputProp) => {
  const timeValue = dayjs(value, "HH:mm")
  return (
    <TimePicker
      slotProps={{
        textField: {
          fullWidth: true,
          size: 'small',
          label: label,
          color: 'warning',
          id: id,
          error: error == "" ? false : true,
          helperText: error == "" ? undefined : error
        }
      }}
      ampm={false}
      onChange={onChange}
      value={timeValue}
    />
  )
}

export const SelectInput = (
  { label, values, currValue, onChange, error, id }:
    {
      label: string,
      values: any[],
      currValue: string,
      onChange: (e: SelectChangeEvent<string>) => void,
      error: string
      id: string
    }

) => {
  return (
    <FormControl
      fullWidth
      size="small"
      error={error == "" ? false : true}
    >
      <InputLabel color='warning'>{label}*</InputLabel>
      <Select
        label={label}
        color={error == "" ? 'warning' : 'error'}
        id={id}
        value={currValue}
        onChange={onChange}
      >
        {values.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {
        error == "" ? null : (<FormHelperText>{error}</FormHelperText>)
      }
    </FormControl >
  )
}
