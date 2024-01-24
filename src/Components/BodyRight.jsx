import React, { useRef, useState } from 'react'
import handleRequest from '../modules/handleRequest';
import { FaRegCopy,FaExternalLinkAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';

function BodyRight() {

    const [response, setResponse] = useState({
        responseMessage:"successfully hosted on https://json.gorkhacloud.com/api/json/userDetails",
        responseOk: true
    });

    const urlRef = useRef();

    //react hook form
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const validateName = (value) => {
        const startsWithLetter = /^[a-zA-Z]/;
        const containsOnlyLettersAndNumbers = /^[a-zA-Z0-9]*$/;
      
        const errorMessages = {
          required: 'Name is required',
          minLength: 'Name must be at least 5 characters long',
          maxLength: 'Name cannot exceed 50 characters',
          startsWithLetter: 'Name must start with a letter',
          containsOnlyLettersAndNumbers: 'Name can only contain letters and numbers',
        };
      
        if (!containsOnlyLettersAndNumbers.test(value)) {
          return errorMessages.containsOnlyLettersAndNumbers;
        }

        if (!startsWithLetter.test(value)) {
          return errorMessages.startsWithLetter;
        }
      
        if (value.length < 5) {
          return errorMessages.minLength;
        }
      
        if (value.length > 50) {
          return errorMessages.maxLength;
        }
      
      
        return true; // Validation passed
      };

    const copyToClipboard = async () => {
        navigator.clipboard.writeText(urlRef.current.innerText)
            .then(() => {
                console.log("URL copied to clipboard")
                // setResponse("URL_successfully_copied_to_clipboard")
                // setTimeout(() => urlRef.current.innerText = response.split(" ").pop(), 2000)
                // urlRef.current.innerText = "URL successfully copied to clipboard"
            })
            .catch(error => console.error('Unable to copy to clipboard: ', error));
        // dialogs.current.close()
    }

    const onSubmit = async (data) => {
        const { response, responseOk } = await handleRequest({ ...data })
        setResponse({responseMessage: response, responseOk:responseOk})
        console.log(response)
        // dialogs.current?.showModal();
        // console.log(data.name)
    }

    return (
        <div className='bg-gray-500 rounded-l-none p-2 sm:p-5 md:p-7 lg:p-10 w-full h-full flex justify-center items-center'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' flex flex-col w-full h-full space-y-3 '
            >

                <label htmlFor='name' className='flex flex-col text-lg font-medium invalid:text-red-600'>Name
                    <input type='text' placeholder="name" id='name' name='name'
                        className='rounded-md  p-2 font-normal bg-gray-200 focus:bg-white'
                        autoComplete='off'
                        formNoValidate
                        {...register("name", {
                            required: "Name is required",
                            validate: validateName
                        })}
                    />
                    <p className='text-red-700 min-h-4 text-sm'>{errors.name?.message}</p>
                </label>
                <label htmlFor='json' className='flex flex-col font-medium '>JSON
                    <textarea
                        rows={10}
                        name='json'
                        placeholder='{"Choose Kindness":"❤️"}'
                        id='json'
                        className='resize-none rounded-md p-1 font-normal bg-gray-200 focus:bg-white'
                        formNoValidate
                        {...register("json", {
                            required: "Json is required"
                        })}
                    />
                    <p className='text-red-700 min-h-4 text-sm'>{errors.json?.message}</p>
                </label>

                {response.responseOk ?
                    <div
                        ref={urlRef}
                        onClick={copyToClipboard}
                        className='px-2 py-2 border bg-gray-900 text-white rounded-lg flex items-center gap-5'
                    > 
                    <p className='overflow-hidden'>
                        {response.responseOk ? response.responseMessage.split(' ').pop() : "https://json.gorkhacloud.com/api/json/userDetails"}</p>
                        <FaRegCopy size={24} className='hover:text-green-400 active:text-green-800' />
                        <FaExternalLinkAlt size={24} onClick={()=> window.open(response.responseMessage.split(' ').pop(),"_blank")} className='hover:text-green-400 active:text-green-800' />
                        
                        </div>
                    :
                    <p className='flex-grow'>{response}</p>
                }

                <button onClick={handleSubmit}
                    className='rounded-md bg-black text-white self-center px-5 py-1 active:bg-gray-700 text-xl '
                >Submit</button>
            </form>

        </div>
    )
}

export default BodyRight