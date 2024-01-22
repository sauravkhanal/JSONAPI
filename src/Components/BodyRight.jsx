import React, { useState } from 'react'

function BodyRight() {
    const [Name, setName] = useState('');
    const [JSONContent, setJSONContent] = useState('');
    return (
        <div className='bg-gray-500 rounded-l-none p-2 sm:p-5 md:p-7 lg:p-10 w-full h-full flex justify-center items-center'>

            <form
                action='https://json.paudelrohan.com.np/api/JSON/addJson'
                method='GET'
                onSubmit={(event) => { event.preventDefault() }}
                className=' flex flex-col w-full h-full space-y-3 '
            >

                <label htmlFor='Name' className='flex flex-col text-lg font-medium'>Name
                    <input type='text' placeholder="Name" id='Name' minLength={5} name='Name' required
                        onInput={(event) => { setName(event.target.value) }}
                        className='rounded-md border border-solid  border- p-1 font-normal'
                        autoComplete='off'
                    />
                </label>
                <label htmlFor='JsonContent' className='flex flex-col font-medium'>JSON
                    <textarea
                        required
                        rows={12}
                        JSONName='JsonContent'
                        placeholder='{"Choose Kindness":"❤️"}'
                        onInput={(event) => { setJSONContent(event.target.value) }}
                        id='JsonContent'
                        className='resize-none rounded-md p-1 font-normal'
                    />
                </label>
                <button type='submit' 
                    className='rounded-md bg-black text-white self-center px-5 py-1 active:bg-gray-700 text-xl '
                >Submit</button>
            </form>
        </div>
    )
}

export default BodyRight