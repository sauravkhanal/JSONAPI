async function getSampleJson() {
    try {
        const response = await fetch("https://json.gorkhacloud.com/api/SampleJSON/GetDistrictsByDevelopmentRegion");
        const res = await response.json();
  
        return res.formattedString

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export default getSampleJson