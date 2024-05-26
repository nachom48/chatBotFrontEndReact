import React from 'react'
import './TypingLoader.css'

interface ITypingLoaderProps {
    className?: string;
}

const TypingLoader = ({ className }: ITypingLoaderProps) => {
    return (
        <div className='w-full flex flex-start'>
            <div className={`typing ${className}`}>
                <span className='circle scaling'>
                </span>
                <span className='circle scaling'>
                </span>
                <span className='circle scaling'>
                </span>
            </div>
        </div>
    )
}

export default TypingLoader