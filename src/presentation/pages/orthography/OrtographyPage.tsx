import React, { useState } from 'react'
import GptMessage from '../../components/chat-bubbles/GptMessage'
import MyMessage from '../../components/chat-bubbles/MyMessage'
import TypingLoader from '../../loaders/TypingLoader'
import TextMessageBox from '../../components/chat-input-boxes/TextMessageBox'
import TextMessageBoxFile from '../../components/chat-input-boxes/TextMessageBoxFile'
import TextMessageBoxSelect from '../../components/chat-input-boxes/TextMessageBoxSelect'
import { orthographyUseCase } from '../../../core/use-cases'
import GptOrtographyMessage from '../../components/chat-bubbles/GptOrthographyMessage'


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number,
    errors: string[],
    message: string;
  }
}

const OrthographyPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);


  const handlePost = async (text: string) => {
    setLoading(true );
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    const data = await orthographyUseCase(text);
    if (!data.ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo realizar la correción', isGpt: true }])
    } else {
      setMessages((prev) => [...prev, {
        text: data.message, isGpt: true,
        info: {
          errors: data.errors,
          message: data.message,
          userScore: data.useScore || 0
        }
      }
      ])
    }

    setLoading(false);


  }



  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudare con las traducciones y correciones.' />
          {
            messages.map((message, index) => (
              (message.isGpt && message.info)
                ? <GptOrtographyMessage 
                    key={index} 
                    errors={message.info!.errors} 
                    message={message.info!.message}
                    userScore={message.info!.userScore}
                    />
                : <MyMessage key={index} text={message.text} />
            ))
          }
          {
            loading
            &&
            <TypingLoader className='fade-in' />
          }
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas'
        disableCorrections={true}
      />
      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas'
      />
          <TextMessageBoxSelect
        options={[
          {id:'1',text:'Hola'},
          {id:'2',text:'Mundo'}
        ]}
        onSendMessage={console.log}

      />  */}
    </div>
  )
}

export default OrthographyPage