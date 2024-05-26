import axios from "axios"

export const translateUseCase = async( prompt:string,lang:string ) =>{
    try {

        const resp = await axios.post(`${import.meta.env.VITE_GPT_API}/translate`,{prompt,lang})
        console.log("esto traigo",resp)
        if(!resp.data) throw new Error('No se pudo realizar la correción');
        const data = resp.data;
        return {
            ok:true,
            message:data
        }
    } catch (error) {
        return {
            ok:false,
            message:'No se pudo realizar la traduccion'
        }
    }
}