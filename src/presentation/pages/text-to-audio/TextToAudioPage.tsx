import { useState } from 'react'
import GptMessage from '../../components/chat-bubbles/GptMessage';
import MyMessage from '../../components/chat-bubbles/MyMessage';
import TypingLoader from '../../loaders/TypingLoader';
import TextMessageBoxSelect from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { textToAudioUseCase } from '../../../core/use-cases/text-to-audio.use-case';
import GptMessageAudio from '../../components/chat-bubbles/GptMessagAudio';


const disclaimer = `## ¿Que audio quieres generaer hoy?
* Todo el audio generado es por AI`;

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]


interface TextMessage {
  text: string;
  type:'text';
  isGpt: boolean;
}

interface AudioMessage {
  text:string;
  isGpt:boolean;
  audio:string;
  type:'audio'
};

type Message = TextMessage | AudioMessage;

const TextToAudio = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);


  const handlePost = async (text: string,selectedVoice:string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false ,type:'text'}]);

    const {ok,message,audioUrl} = await textToAudioUseCase(text,selectedVoice);
    setLoading(false);

    if(!ok) return;

    setMessages((prev) => [...prev, { text: `${selectedVoice }`, message, isGpt: true ,type:'audio',audio:audioUrl!}]);




  }



  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='flex flex-col justify-between items-center'>
          <GptMessage text={disclaimer} />
          {
            messages.map((message,index)=>
              message.isGpt 
            ?   (
                message.type === 'audio'
                ?<GptMessageAudio key={index} text={message.text} audio={message.audio} />
                :<GptMessage key={index} text={message.text} />
              )
            : <MyMessage key={index} text={message.text}/>  
            )
          }



          {
            loading
            &&
            <TypingLoader className='fade-in' />
          }
        </div>
      </div>
      <TextMessageBoxSelect
        options={voices}
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que deseas'
      />
    </div>
  )
}

export default TextToAudio