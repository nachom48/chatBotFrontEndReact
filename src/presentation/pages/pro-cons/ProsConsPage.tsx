import  { useState } from 'react'
import GptMessage from '../../components/chat-bubbles/GptMessage';
import MyMessage from '../../components/chat-bubbles/MyMessage';
import TypingLoader from '../../loaders/TypingLoader';
import TextMessageBox from '../../components/chat-input-boxes/TextMessageBox';
import { proConsUseCase } from '../../../core/use-cases';




interface Message{
  text:string;
  isGpt:boolean;
}

const ProConsPage = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [messages,setMessages] = useState<Message[]>([]);


  const handlePost = async (text:string) =>{
    setLoading(true);
    setMessages((prev)=> [...prev,{text:text, isGpt:false}]);
    //llamar isUsecase

    const { content, ok } = await proConsUseCase(text);
    
    setLoading(false);

    if(!ok) return;

    setMessages((prev)=> [...prev,{text:content, isGpt:true}]);

   //añadir el mensaje de isgpt en true;

  }



  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text='Puede escribri lo que sea que quieras que compare te de mis puntos de vista.' />
          {
            messages.map((message,index)=>(
              message.isGpt 
              ? <GptMessage key={index} text={message.text}/>
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

export default ProConsPage