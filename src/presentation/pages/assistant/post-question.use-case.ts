import axios, { AxiosHeaders } from "axios";
import { QuestionResponse } from "../../../interfaces/assistant.response.interface";



export const postQuestionUseCase = async (threadId:string,question:string) =>{

    try {
        
        const resp = await axios.post(
            `${import.meta.env.VITE_ASSISTANT_API}/user-question`,
            { threadId, question },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ) ;

        const replies = resp.data as QuestionResponse[];


        return replies;

    } catch (error) {
        console.log(error)
        throw new Error('Error posting question');
    }

}