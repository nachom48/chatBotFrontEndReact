import axios from "axios"


export const createThreadUseCase = async () =>{
    try {
        //Primero creo el Thread para tener el ID y los mensajes van dentro 
        const resp = await axios.post(`${import.meta.env.VITE_ASSISTANT_API}/create-thread`);

        const {id} = resp.data;

        //aca obtengo el Id del thread
        return id;

    } catch (error) {
        throw new Error('No se pudo crear el thread')
    }
}