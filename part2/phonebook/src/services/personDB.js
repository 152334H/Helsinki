import React from 'react'
import axios from 'axios'
// server helpers
const DB_URL = 'http://de.irscybersec.tk:3001/persons'
const dataOf = r => r.data
const getPersons = () => axios.get(DB_URL).then(dataOf)
const addPerson = person => axios.post(DB_URL, person).then(dataOf)

export default { getPersons, addPerson }
