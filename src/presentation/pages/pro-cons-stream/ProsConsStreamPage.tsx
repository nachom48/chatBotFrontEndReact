import  { useRef, useState } from 'react'
import GptMessage from '../../components/chat-bubbles/GptMessage';
import MyMessage from '../../components/chat-bubbles/MyMessage';
import TypingLoader from '../../loaders/TypingLoader';
import TextMessageBox from '../../components/chat-input-boxes/TextMessageBox';
import { proConsStreamGeneratorUseCase } from '../../../core/use-cases/pros-cons/proConsStreamUseCaseGenerator';




interface Message{
  text:string;
  isGpt:boolean;
}

const ProConsStreamPage = () => {

  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [loading,setLoading] = useState<boolean>(false);
  const [messages,setMessages] = useState<Message[]>([]);


  const handlePost = async (text:string) =>{
    if(isRunning.current){
      abortController.current.abort();
      abortController.current = new AbortController();
    }
    isRunning.current = true;
    setLoading(true);
    setMessages((prev)=> [...prev,{text:text, isGpt:false}]);

   const stream = await proConsStreamGeneratorUseCase(text,abortController.current.signal);


   setLoading(false);

  setMessages((messages)=>[...messages,{text:'',isGpt:true}]);
  for await (const text of stream){
    setMessages((messages)=>{
            const newMessages = [...messages];
            newMessages[newMessages.length-1].text= text;
            return newMessages;
          })
  }


//generar el ultimo mensaje
  // if(!reader) return alert('No se pudo realizar el reader')

  //   const decoder = new TextDecoder();
  //   let message = '';

  //   while(true){
  //     const {value,done} = await reader.read();
  //     if(done)break;
      
  //     const decodedChunk = decoder.decode(value,{stream:true});
  //     message += decodedChunk;

  //     setMessages((messages)=>{
  //       //actualizo el ultimo
  //       const newMessages = [...messages];
  //       newMessages[newMessages.length-1].text= message;
  //       return newMessages;
  //     })
  //   }

  }



  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text='¿Que deseas comparar hoy?' />
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

export default ProConsStreamPage