async function getSampleJson() {
    try {
        const response = await fetch("https://json.khanalsaurav.com.np/json/sample");
        const json = await response.json();
        return json

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export default getSampleJson