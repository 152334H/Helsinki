import axios from 'axios'
const baseUrl = 'http://de.irscybersec.tk:3001/notes'

const dataOf = res => res.data

const getAll = () => {
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return axios.get(baseUrl).then(res => res.data.concat(nonExisting))
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(dataOf)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(dataOf)
}

export default { getAll, create, update }
