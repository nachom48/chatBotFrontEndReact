import React, { FormEvent, useRef, useState } from 'react'

interface ITextMessageBoxProps {
    onSendMessage: (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    accept?: string;
}

const TextMessageBoxFile = ({ onSendMessage, placeholder, disableCorrections = false, accept }: ITextMessageBoxProps) => {

    const [message, setMessage] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim().length === 0) return;

        onSendMessage(message);
        setMessage('')
        console.log('handlesendmessage')
    }

    return (
        <form onSubmit={handleSendMessage}
            className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
        >
            <div className='mr-3' >
                <button type='button' onClick={() => inputFileRef.current?.click()} className='flex items-center justify-center text-gray-400 hover:text-gray-600'>
                    <i className='fa-solid fa-paperclip text-xl'></i>
                </button>
                <input
                    type='file'
                    accept={accept}
                    ref={inputFileRef}
                    hidden
                    onChange={(e) => setSelectedFile(e.target.files?.item(0))}
                />
            </div>
            <div className='flex-grow'>
                <div className='relative w-full'>
                    <input
                        type='text'
                        autoFocus
                        name='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections ? 'on' : 'off'}
                        spellCheck={disableCorrections ? 'true' : 'false'}
                        className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
                    />
                </div>
            </div>
            <div className='ml-4'>
                <button className='btn-primary'
                        disabled={!selectedFile}
                >
                    {
                        (!selectedFile)
                            ?  <span className='mr-2'>
                                     Enviar
                              </span>
                            :<span className='mr-2'>{selectedFile.name.substring(0,10)+ '...'}</span>
                    }
                    <i className='fa-regular fa-paper-plane' />
                </button>
            </div>
        </form>
    )
}

export default TextMessageBoxFile