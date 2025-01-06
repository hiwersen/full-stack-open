import axios from "axios"

const url = 'http://localhost:3001/persons'

const responseHandler = ({ data }) => data

const personsService = {
    getAll: () => 
        axios
            .get(url)
            .then(responseHandler),
    create: (person) => 
        axios
            .post(url, person)
            .then(responseHandler),
    update: (person) => 
        axios
            .put(`${url}/${person.id}`, person)
            .then(responseHandler),
    delete: (id) => 
        axios
            .delete(`${url}/${id}`)
            .then(responseHandler)    
}

export default personsService

