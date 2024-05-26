import axios from "axios"
import { OrtographyResponse } from "../../interfaces/ortographyresponse.interface";

export const orthographyUseCase = async( prompt:string ) =>{
    try {

        const body = JSON.stringify(prompt)

        const resp = await axios.post<OrtographyResponse>(`${import.meta.env.VITE_GPT_API}/orthography`,{prompt:body})
        if(!resp.data) throw new Error('No se pudo realizar la correción');
        const data = resp.data;
        console.log("esto tengo en data",data)
        return {
            ok:true,
            ...data
        }
    } catch (error) {
        return {
            ok:false,
            useScore:0,
            errors:[],
            message:'No se pudo realizar la correción'
        }
    }
}