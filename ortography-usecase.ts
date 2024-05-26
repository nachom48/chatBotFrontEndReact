import axios from "axios"

export const orthographyUseCase = async( prompt:string ) =>{
    try {

        const resp = await axios
        
    } catch (error) {
        return {
            ok:false,
            useScore:0,
            errors:[],
            message:'No se pudo realizar la correción'
        }
    }
}