import React from 'react'

interface IGptMessageProps{
    userScore:number;
    errors:string[];
    message:string;
}

const GptOrtographyMessage = ({userScore,errors,message}:IGptMessageProps) => {
  return (
    <div className='flex justify-start w-full p-3 rounded-lg'>
        <div className='flex flex-row items-start'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
                G
            </div>
            <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-x'>
                <h3 className='text-3xl'> Puntaje : {userScore}</h3>
                <p>
                    {message}
                </p>
                {
                    (errors.length === 0)
                    ?<p>No se encontraron errores, perfecto!</p>
                    : (
                        <>
                        <h3 className='text-2xl'>Errores encontrados </h3>
                        <ul>
                            {
                                errors.map((error,i)=>(
                                    <li key={i}>
                                        {error}
                                    </li>
                                ))
                            }
                        </ul>
                        </>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default GptOrtographyMessage;