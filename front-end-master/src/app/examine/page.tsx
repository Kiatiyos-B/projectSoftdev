"use client"
import On_box from "../components/on_boxradio"
import Boxradio from "../components/boxradio"
import React, { useState, createContext, useContext, } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Box_examine from "../components/box_examine";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useHistory } from 'react-router-dom';

export default function Page() {
    // const history = useHistory();
    const [radioValue, setRadioValue] = useState('');
    const [block_radio, setBlock_radio] = useState([]);
    const [grade, setGrade] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setGrade(event.target.value as string);
        // console.log(event.target.value);
    };
    const addData = (radioValue:never) => {
        setBlock_radio([...block_radio, radioValue]);
    };

    const handleRadioChange = (value:string) => {
        setRadioValue(value as string);
        addData(parseInt(value) as never);
        // block_radio.push(value);
        // console.log(value);
    }

    const average_for = (block_radio:number[]) => {
        if (block_radio.length === 0) {
            return window.alert("กรุณาประเมินคะแนน");
        }
        
        let sum = block_radio.reduce((total, current) => total + current, 0);
        let average = sum / block_radio.length;
        console.log(average);
        return average;
    }

    const testing = () => {
        let average = average_for(block_radio);
        return window.alert("คะแนนเฉลี่ยที่ได้คือ " + average + " เกรด " + grade);
    }

    // let AJ = "advisor"
    let AJ = ''
    const handleExamine = () => {
        if (AJ == 'advisor'){
            return true // </Box_examine>
        }
    }
    return (
        <div>
            <div>
                {handleExamine()}
            </div>
            <form  onSubmit={testing} action="presentation-phase">
            {/* <form onSubmit={testing} > */}
                <On_box Head='ประเมินชิ้นงาน' />
                <Boxradio header='หัวข้อโครงการ' onRadioChange={handleRadioChange}/>
                <Boxradio header='การค้นข้อมูล' onRadioChange={handleRadioChange}/>
                <Boxradio header='การออกแบบ' onRadioChange={handleRadioChange}/>
                <Boxradio header='การพัฒนา' onRadioChange={handleRadioChange}/>
                <br/>
                <br/>
                <On_box Head='การดำเนินด้วนวาจา'/>
                <Boxradio header='สไลด์' onRadioChange={handleRadioChange}/>
                <Boxradio header='การนำเสนอ' onRadioChange={handleRadioChange}/>
                <Boxradio header='อวัจนภาษา' onRadioChange={handleRadioChange}/>
                <br/>
                <br/>
                <On_box Head='ปริญญานิพนธ์' />
                <Boxradio header='เนื้อหา' onRadioChange={handleRadioChange}/>
                <Boxradio header='รูปแบบ' onRadioChange={handleRadioChange}/>
                <br/>
                <br/>
                <On_box Head='ผลงานและการสาธิต'/>
                <Boxradio header='ความสมบูรณ์ของชิ้นงาน' onRadioChange={handleRadioChange}/>
                <Boxradio header='การสาธิต' onRadioChange={handleRadioChange}/>
                <br />
                <br />
            

                <div className="mt-8 mx-12">
                    <p className="text-[#f36a00] ">เกรดที่เหมาะสม</p>
                    <div className="grid grid-cols-6 pl-12">
                        <p className="col-span-2">สำหรับให้คณะกรรมการหลักสูตรพิจารณา<br/>*ไม่มีผลต่อคะแนนสอบ</p>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth >
                                <Select 
                                    labelId="demo-simple-select-label" id="demo-simple-select"
                                    value={grade} onChange={handleChange} >
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