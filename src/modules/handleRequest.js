import { API_ENDPOINT } from "./variables"

async function handleRequest(data) {

    try {
        const response = await fetch(
            API_ENDPOINT, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }
        )
        // if (!response.ok) {
        //     const status = response.status;
        //     if (status == 400) {
        //         const responseMessage = await response.text()
        //         // console.log(`response json: ${responseMessage}`)
        //         return {response: responseMessage, responseOk:false}
        //     }
        //     const statusText = response.statusText
        //     throw new Error(`HTTP error! Status: ${status} - ${statusText}`)
        // }

        // const responseMessage = await response.text()
        // // console.log(`response json: ${responseMessage}`)
        // return { response: responseMessage, responseOk: true }

        const responseMessage = await response.json()
        // alert(responseMessage)
        return {...responseMessage}

    } catch (error) {
        console.error("Couldn't complete request: ", error)
    }
}

export default handleRequest