import React, { useState } from 'react'
import GptMessage from '../components/chat-bubbles/GptMessage';
import MyMessage from '../components/chat-bubbles/MyMessage';
import TextMessageBox from '../components/chat-input-boxes/TextMessageBox';
import TypingLoader from '../loaders/TypingLoader';



interface Message{
  text:string;
  isGpt:boolean;
}

const ChatTemplate = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [messages,setMessages] = useState<Message[]>([]);


  const handlePost = async (text:string) =>{
    setLoading(true);
    setMessages((prev)=> [...prev,{text:text, isGpt:false}]);
    //llamar isUsecase

   setLoading(false);

   //añadir el mensaje de isgpt en true;

  }



  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudare con las traducciones y correciones.' />
          {
            messages.map((message,index)=>(
              message.isGpt 
              ? <GptMessage key={index} text='Esto es de OpenAi'/>
              : <MyMessage key={index} text={message.text}/>
            ))
          }
          {
            loading 
            &&
            <TypingLoader className='fade-in'/>          
            }
        </div>
      </div>
      <TextMessageBox 
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas'
        disableCorrections={true}
      />
    </div>
  )
}

export default ChatTemplate