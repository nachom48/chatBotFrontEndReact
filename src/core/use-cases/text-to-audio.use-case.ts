import axios from "axios"

export const textToAudioUseCase = async( prompt:string,voice:string ) =>{
    try {
        const resp = await axios.post(`${import.meta.env.VITE_GPT_API}/text-to-audio`,{prompt,voice})
        if(!resp.data) throw new Error('No se pudo realizar la generacion del audio');
        const audioFile = await resp.data.blob();
        const audioUrl = URL.createObjectURL(audioFile)

        return {
            ok:true,
            message:prompt,
            audioUrl
        }
    } catch (error) {
        return {
            ok:false,
            message:'No se pudo realizar la generación del audio'
        }
    }
}