import React, { FormEvent, useState } from 'react'

interface ITextMessageBoxProps {
    onSendMessage: (message: string, selectedOption: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    options: IOption[];
}

interface IOption {
    id: string;
    text: string;
}

const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections = false, options }: ITextMessageBoxProps) => {

    const [message, setMessage] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim().length === 0) return;
        if(selectedOption === '') return;
        onSendMessage(message, selectedOption);
        setMessage('');
        console.log('handlesendmessage')
    }

    return (
        <form onSubmit={handleSendMessage}
            className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
        >
            <div className='flex-grow'>
                <div className='flex'>
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
                        className=' w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
                    />
                    <select name='select'
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className='w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'>
                        <option  value={''} >Seleccione</option>
                        {options.map((option) => (
                            <option key={option.id} value={option.id} >{option.text}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='ml-4'>
                <button className='btn-primary'>
                    <span className='mr-2'>
                        <i className='fa-regular fa-paper-plane' />
                        Enviar
                    </span>
                </button>
            </div>
        </form>
    )
}

export default TextMessageBoxSelect;