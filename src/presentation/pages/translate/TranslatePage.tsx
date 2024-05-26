import  { useState } from 'react'
import GptMessage from '../../components/chat-bubbles/GptMessage';
import MyMessage from '../../components/chat-bubbles/MyMessage';
import TypingLoader from '../../loaders/TypingLoader';
import TextMessageBox from '../../components/chat-input-boxes/TextMessageBox';
import TextMessageBoxSelect from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { translateUseCase } from '../../../core/use-cases/translateUseCase';



interface Message{
  text:string;
  isGpt:boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

const TranslatePage = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [messages,setMessages] = useState<Message[]>([]);


  const handlePost = async (text:string,selectedOption: string) =>{
    const newMessage = `Traduce ${text} al idiomta ${selectedOption}`
    setLoading(true);
    setMessages((prev)=> [...prev,{text:newMessage, isGpt:false}]);

    const {ok,message} = await translateUseCase(text,selectedOption);
   setLoading(false);
   if(!ok){
     return alert(message)
   }
   setMessages((prev)=> [...prev,{text:message, isGpt:true}]);

   //añadir el mensaje de isgpt en true;

  }



  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text='¿Qué quieres que traduzca hoy?' />
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
      <TextMessageBoxSelect
        options={languages} 
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas'
      />
    </div>
  )
}

export default TranslatePage