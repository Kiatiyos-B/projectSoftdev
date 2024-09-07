import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import useDownloader from "react-use-downloader";


export default function Attachments(props: any) {
  const openPdfInNewTab = (url: any) => {
    console.log(url)
    window.open(url, '_blank');
  }

  const { download } = useDownloader();

  const fileUrl = props.path;
  const filename = props.filename || 'file.pdf';

  return (
    <div className="border border-solid border-stone-600 rounded-md w-full">
      <div className="grid grid-rows-2 grid-cols-1 p-6  gap-2">
        <div className="flex flex-rows justify-between items-center">
          <p className="text-l w-full">
            <b>{props.filename}</b>
          </p>
          <Button className='border-solid border-2 border-[#F36A00] px-4 text-[#F36A00] hover:border-[#7c858e]' size='small' onClick={() => openPdfInNewTab(props.path)}>
            <b>Preview</b>
          </Button>
        </div>
        <p className="text-xs flex items-center">
          {props.date}
        </p>

        <div className='flex justify-center'>
          <Button className='border-solid border-2 border-[#F36A00] px-4 text-[#F36A00] hover:border-[#7c858e]' size='small' onClick={() => download(fileUrl, filename)} >
            <b>Download</b>
          </Button>
        </div>
      </div>
    </div>
  );
}
