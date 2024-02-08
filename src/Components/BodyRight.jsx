import React, { useState, useEffect } from 'react'
import handleRequest from '../modules/handleRequest';
import { FaRegCopy, FaExternalLinkAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import getSampleJson from '../modules/getSampleJson';

// apply className dynamically in tailwind
// import classNames from 'classnames';
import validateName from '../modules/validateName';

import { ClipLoader } from 'react-spinners';

function BodyRight() {
    const [loading, setLoading] = useState(false);
    const [Url, setUrl] = useState('');
    const [response, setResponse] = useState({
        statusCode: 200,
        message: {
            fieldError: {
                name: "Message for Name filed",
                json: "Message for Json filed",
            },
            // information: ""
        },
        data: {
            parsingUrl: "https://json.gorkhacloud.com/api/json/userDetails",
            formattedJson: "{\n  \"chooseKindness\":  \"❤️\"\n}"
        }
    });

    useEffect(() => {
        switch (response.statusCode) {
            case 200:
                toast.success(response.message.information)
                break;
            case 400:
                console.log('case 400');
                const { name, json } = response.message.fieldError;
                name && setError('name', { type: 'manual', message: name });
                json && setError('json', { type: 'manual', message: json });
                break;
            default:
                toast.error(response.message.information)
        }
    }, [response])

    //monitor parsingUrl
    useEffect(() => {
        if (response.data !== null)
            setUrl(response.data.parsingUrl)
    }, [response.data])

    //react hook form
    const { register, handleSubmit, formState, reset, setValue, setError } = useForm();
    const { errors } = formState;


    const copyToClipboard = async () => {
        if (response.statusCode == 200)
            navigator.clipboard.writeText(Url)
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

        // Create an AbortController to abort the fetch request if it takes too long
        const controller = new AbortController();

        // set timeout for 15s

        const timeout = setTimeout(() => {
            controller.abort();
            setResponse({
                statusCode: 500,
                message: "Request timed out",
                data: {}
            });
            setLoading(false);
        }, 15000)

        try {
            const res = await handleRequest({ ...data })
            setResponse({ ...res })
            console.log(res)
        } catch (error) {

            if (error.name === 'AbortError')
                console.log("Fetch aborted due to timeout")
            else {
                console.error('Fetch error:', error);
                setResponse({
                    statusCode: 500,
                    message: "An error occurred during the request",
                    data: {}
                });
            }
        } finally {
            clearTimeout(timeout)
            setLoading(false)
        }

    }

    const loadSample = async () => {
        setLoading(true)
        const data = await getSampleJson();
        setValue('json', data)
        setLoading(false)
    }

    return (
        <div className='bg-white dark:bg-blue-bg rounded-l-none p-2 sm:p-5 md:p-7 lg:p-10 w-full h-full flex-col justify-center items-center'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' flex flex-col w-full'
            >

                <label htmlFor='name' className='flex flex-col text-lg font-medium dark:text-gray-200 '>Name
                    <input type='text' placeholder="name" id='name' name='name'
                        className={`rounded-md  p-2 font-normal bg-gray-50 dark:bg-blue-bg2 dark:border-none border border-solid border-slate-200 focus:bg-white dark:focus:bg-blue-bg3 dark:focus:outline-none ${errors.name && "outline outline-2 outline-red-500 outline-solid"}`}
                        autoComplete='off'
                        formNoValidate
                        {...register("name", {
                            required: "Name is required",
                            validate: validateName
                        })}
                    />
                    <p className='text-red-500 min-h-6 text-sm'>{errors.name?.message}</p>
                </label>

                <label htmlFor='json' className='flex flex-col font-medium dark:text-gray-200'>JSON
                    <textarea
                        rows={10}
                        name='json'
                        placeholder={response.data?.formattedJson}
                        id='json'
                        className={`rounded-md  p-2 font-normal bg-gray-50 dark:bg-blue-bg2 dark:border-none border border-solid border-slate-200 focus:bg-white dark:focus:bg-blue-bg3 dark:focus:outline-none ${errors.name && "outline outline-2 outline-red-500 outline-solid"}`}
                        formNoValidate
                        {...register("json", {
                            required: "Json is required"
                        })}
                    />
                    <p className='text-red-500 min-h-6 text-sm'>{errors.json?.message}</p>
                </label>

                {/* URL bar */}
                <div
                    className={`px-2 py-2 border dark:border-none text-black dark:bg-blue-dark dark:text-gray-400 rounded-lg flex items-center gap-5 self-center max-w-full shadow-sm`}
                    title='click me to copy link '
                >
                    <p className='overflow-hidden' onClick={copyToClipboard}>
                        {Url}
                    </p>
                    <FaRegCopy
                        size={24}
                        onClick={copyToClipboard}
                        className='transition hover:scale-110 hover:text-blue-700 active:scale-95'
                    />
                    <FaExternalLinkAlt
                        title="open Url in new tab" size={21}
                        onClick={() => window.open(Url, "_blank")}
                        className='transition hover:scale-110 hover:text-blue-700 active:scale-95'
                    />

                </div>

            </form>

            <div className='flex flex-col items-center gap-5 sm:flex-row sm:justify-center pt-5'>

                <button onClick={loadSample}
                    title='Get ready made sample of json'
                    className='rounded-md bg-blue-600 shadow-sm text-white text-xl px-5 py-1 
                        transition hover:bg-blue-800 active:bg-blue-500 active:scale-95'
                >
                    <p className=' select-none'>Get Sample Json</p>
                </button>

                <button onClick={handleSubmit(onSubmit)}
                    title='submit to get url for your json data'
                    className='rounded-md bg-blue-600 shadow-sm text-white text-xl px-5 py-1 
                        transition hover:bg-blue-800 active:bg-blue-500 active:scale-95'
                >
                    <p className=' select-none'>Submit</p>
                </button>

            </div>

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center">
                    {/* <div className="bg-white p-4 rounded-md"> */}
                    <ClipLoader
                        size={50}
                        loading={loading}
                    />
                    {/* </div> */}
                </div>
            )}


        </div>
    )
}

export default BodyRight