import React, { FormEvent, useState } from 'react'

interface ITextMessageBoxProps {
    onSendMessage: (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
}

const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections = false }: ITextMessageBoxProps) => {

    const [message,setMessage] = useState<string>('');

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(message.trim().length === 0) return;

        onSendMessage(message);
        setMessage('')
        console.log('handlesendmessage')
    }

    return (
        <form onSubmit={handleSendMessage}
            className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
        >
            <div className='flex-grow'>
                <div className='relative w-full'>
                    <input
                        type='text'
                        autoFocus
                        name='message'
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        placeholder={placeholder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections ? 'on' : 'off'}
                        spellCheck={disableCorrections ? 'true' : 'false'}
                        className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
                    />
                </div>
            </div>
            <div className='ml-4'>
                <button className='btn-primary'>
                    <span className='mr-2'>
                        <i className='fa-regular fa-paper-plane'/>
                    Enviar
                    </span>
                </button>
            </div>
        </form>
    )
}

export default TextMessageBox