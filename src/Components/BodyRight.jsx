import React, { useRef, useState } from 'react'
import handleRequest from '../modules/handleRequest';
import { FaRegCopy } from "react-icons/fa";

function BodyRight() {
    const [name, setName] = useState('');
    const [json, setJSONContent] = useState('');
    const [response, setResponse] = useState('');
    const [responseOk, setResponseOK] = useState(false)
    const dialogs = useRef();
    const urlRef = useRef();

    const copyToClipboard = async () => {
        navigator.clipboard.writeText(urlRef.current.innerText)
            .then(() => {
                console.log("URL copied to clipboard")
                setResponse("URL_successfully_copied_to_clipboard")
            })
            .catch(error => console.error('Unable to copy to clipboard: ', error));
        // dialogs.current.close()
    }

    const handleSubmit = async () => {
        const { response, responseOk } = await handleRequest({ name, json })
        setResponse(response)
        setResponseOK(responseOk)

        dialogs.current?.showModal();
    }

    return (
        <div className='bg-gray-500 rounded-l-none p-2 sm:p-5 md:p-7 lg:p-10 w-full h-full flex justify-center items-center'>

            <form
                action='https://json.paudelrohan.com.np/api/JSON/addJson'
                method='GET'
                onSubmit={(event) => { event.preventDefault() }}
                className=' flex flex-col w-full h-full space-y-3 '
            >

                <label htmlFor='name' className='flex flex-col text-lg font-medium'>Name
                    <input type='text' placeholder="name" id='name' minLength={5} name='name' required
                        onInput={(event) => { setName(event.target.value) }}
                        className='rounded-md border border-solid  border- p-1 font-normal'
                        autoComplete='off'
                    />
                </label>
                <label htmlFor='json' className='flex flex-col font-medium'>JSON
                    <textarea
                        required
                        rows={12}
                        name='json'
                        placeholder='{"Choose Kindness":"❤️"}'
                        onInput={(event) => { setJSONContent(event.target.value) }}
                        id='json'
                        className='resize-none rounded-md p-1 font-normal'
                    />
                </label>
                {/* <p className='text-black text-center'>{response}</p> */}
                <button onClick={handleSubmit}
                    className='rounded-md bg-black text-white self-center px-5 py-1 active:bg-gray-700 text-xl '
                >Submit</button>
            </form>

            <dialog ref={dialogs} className='overflow-hidden bg-transparent backdrop-blur-3xl'>
                <div className='rounded-md bg-amber-100 min-w-96 min-h-48 border border-black border-solid flex flex-col justify-center items-center overflow-hidden p-5'>


                    {responseOk ?
                        <p
                            ref={urlRef}
                            onClick={copyToClipboard}
                            className='px-2 py-2 border bg-gray-900 text-white rounded-lg flex items-center gap-5'
                        >{response.split(' ').pop()}<FaRegCopy size={30} className='active:text-green-400' /></p>
                        :
                        <p className='flex-grow'>{response}</p>
                    }


                    <form method="dialog" className='my-3' >
                        <button className='rounded-md bg-black text-white self-center px-5 py-1 active:bg-gray-700 text-xl '>OK</button>
                    </form>
                </div>
            </dialog>



        </div>
    )
}

export default BodyRight