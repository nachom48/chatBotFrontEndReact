import React from 'react'
import Markdown from 'react-markdown'

interface IMyMessageProps{
    text:string;
}

const MyMessage = ({text}:IMyMessageProps) => {
  return (
    <div className='w-full flex p-3 justify-end items-center'>
        <div className='flex items-center justify-start flow-row-reverse'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
                F
            </div>
            <div className='relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl'>
                {text}
            </div>
        </div>
    </div>
  )
}

export default MyMessage