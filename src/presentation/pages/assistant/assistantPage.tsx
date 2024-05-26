import { useEffect, useState } from "react";
import GptMessage from "../../components/chat-bubbles/GptMessage";
import MyMessage from "../../components/chat-bubbles/MyMessage";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import TypingLoader from "../../loaders/TypingLoader";
import { createThreadUseCase } from "../../../core/use-cases/assistant/create-thread.use-case";
import { postQuestionUseCase } from "./post-question.use-case";




interface Message {
  text: string;
  isGpt: boolean;
}

const AssistantPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  //obtener el thread, y si no existe , crearlo.Lo vamos a guardar en LocalStorage inicialmente

  const fetchThreadId = async () => {
    const threadIdFromLocalStorage = localStorage.getItem('threadId');
    if (threadIdFromLocalStorage) {
      setThreadId(threadIdFromLocalStorage);
    } else {
      const createdThreadId = await createThreadUseCase();
      setThreadId(createdThreadId);
      localStorage.setItem('threadId', createdThreadId);
    }
  };

  useEffect(() => {
    fetchThreadId();
  }, []);


  useEffect(() => {

    if (threadId) {
      setMessages((prev) => [...prev, { text: `Numero de thread ${threadId}`, isGpt: true }])
    }
  }, [threadId])




  const handlePost = async( text: string ) => {

    if ( !threadId ) return;

    setLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }] );

    
    const replies = await postQuestionUseCase(threadId, text)
    
    setLoading(false);

    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages ( (prev) => [
          ...prev,
          { text: message, isGpt: (reply.role === 'assistant'), info: reply  }
        ] )
      }
    }
    


  }


  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text='Hola, buen dia, soy Sam, ¿En que puedo ayudarte?.' />
          {
            messages.map((message, index) => (
              message.isGpt
                ? <GptMessage key={index} text={message.text} />
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
    </div>
  )
}

export default AssistantPage