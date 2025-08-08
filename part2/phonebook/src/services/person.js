import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const addPerson = (person) => {
     const request = axios.post(baseUrl, person)
     return request.then(response => response.data)

}

const getAll = () => {
     const request = axios.get(baseUrl)
     return request.then(response => response.data)
}

const removePerson = (id) => {
     const request = axios.delete(`${baseUrl}/${id}`)
     return request.then(response => response.data)
}

const update = (id,updatedPerson) => {
     const request = axios.put(`${baseUrl}/${id}`, updatedPerson)

     return request.then(response => response.data)
}
export default { addPerson, getAll, removePerson, update }