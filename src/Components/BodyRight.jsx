import React, { useRef, useState, useEffect } from 'react'
import handleRequest from '../modules/handleRequest';
import { FaRegCopy, FaExternalLinkAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getSampleJson from '../modules/getSampleJson';

// apply className dynamically in tailwind
import classNames from 'classnames';
import validateName from '../modules/validateName';

import { ClipLoader } from 'react-spinners';

function BodyRight() {
    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState({
        statusCode: 200,
        message: "Demo Json Loaded successfully",
        data: {
            parsingUrl: "https://json.gorkhacloud.com/api/json/userDetails",
            formattedJson: "{\n  \"test\": \"one\"\n}"
        }
    });

    useEffect(() => {
        switch (response.statusCode) {
            case 200:
                toast.success(response.message)
                break;
            case 400:
                toast.warn(response.message)
                break;
            default:
                toast.error(response.message)
        }
    }, [response])

    //configure color or url bar border based on response
    const borderColorClass = classNames({
        'border-green-500': response.statusCode === 200,
        'border-yellow-500': response.statusCode === 400,
        'border-red-500': response.statusCode !== 200 && response.statusCode !== 400,
    })


    //react hook form
    const { register, handleSubmit, formState, reset, setValue } = useForm();
    const { errors } = formState;


    const copyToClipboard = async () => {
        if (response.statusCode == 200)
            navigator.clipboard.writeText(urlRef.current.innerText)
                .then(() => {
                    console.log("URL copied to clipboard")
                    toast.success("URL copied on clipboard")
                })
                .catch(error => {
                    toast.error("Unable to copy to clipboard")
                    console.error('Unable to copy to clipboard: ', error);
                });

    }

    const onSubmit = async (data) => {
        setLoading(true)
        const res = await handleRequest({ ...data })
        setResponse({ ...res })
        setLoading(false)
        // console.log(res)

    }

    const loadSample = async () => {
        setLoading(true)
        const data = await getSampleJson();
        setValue('json', data)
        setLoading(false)
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
                    <p className='text-red-700 min-h-5 text-sm'>{errors.name?.message}</p>
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
                    <p className='text-red-700 min-h-5 text-sm'>{errors.json?.message}</p>
                </label>

                {/* URL bar */}
                <div
                    className={`px-2 py-2 border bg-gray-900 text-white rounded-lg flex items-center gap-5 self-center max-w-full ${borderColorClass}`}
                    title={response.statusCode == 200 ? 'click me to copy link ' : ''}
                >
                    <p className='overflow-hidden' onClick={copyToClipboard}>
                        {
                            response.statusCode == 200 ? response.data.parsingUrl : response.message
                            // console.log(response.data.parsingUrl)
                        }
                    </p>

                    {
                        response.statusCode == 200 &&
                        <>
                            <FaRegCopy
                                size={24}
                                onClick={copyToClipboard}
                                className='hover:text-green-400 active:text-green-800'
                            />
                            <FaExternalLinkAlt title="open Url in new tab" size={22} onClick={() => window.open(response.data.parsingUrl, "_blank")} className='hover:text-green-400 active:text-green-800' />
                        </>
                    }
                </div>

                <div className='flex space-x-5 justify-center'>

                    <button onClick={handleSubmit}
                        className='rounded-md bg-black text-white px-5 py-1 active:bg-gray-700 text-xl '
                    >
                        Submit
                    </button>

                    <button onClick={loadSample}
                        className='rounded-md bg-black text-white  px-5 py-1 active:bg-gray-700 text-xl '
                    >
                        Get Sample Json
                    </button>

                </div>
            </form>

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <ClipLoader
                            size={50}
                            loading={loading}
                        />
                    </div>
                </div>
            )}


        </div>
    )
}

export default BodyRight