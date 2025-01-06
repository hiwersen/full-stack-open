import axios from "axios"

const url = 'http://localhost:3001/persons'

const responseHandler = ({ data }) => data

const getAll = () => 
    axios
        .get(url)
        .then(responseHandler)

const create = (person) => 
    axios
        .post(url, person)
        .then(responseHandler)


export default { getAll, create }