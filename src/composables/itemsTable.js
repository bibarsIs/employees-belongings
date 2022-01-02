import axios from "axios"

export async function fetchData(employeeId) {
    const response = await axios.get('http://localhost:3001/data/' + employeeId)
    return await response.data
}

