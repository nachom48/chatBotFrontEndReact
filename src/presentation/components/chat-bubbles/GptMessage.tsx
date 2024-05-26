import React from 'react'
import Markdown from 'react-markdown'

interface IGptMessageProps{
    text:string;
}

const GptMessage = ({text}:IGptMessageProps) => {
  return (
    <div className='flex justify-start w-full p-3 rounded-lg'>
        <div className='flex flex-row items-start'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
                G
            </div>
            <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-x'>
                <Markdown>{text}</Markdown>
            </div>
        </div>
    </div>
  )
}

export default GptMessage