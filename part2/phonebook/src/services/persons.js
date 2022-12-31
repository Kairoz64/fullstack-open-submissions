import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data)
}

const create = newPerson => {
	const request = axios.post(baseUrl, newPerson);
	return request.then(response => response.data);
}

const changePerson = (id, person) => {
	const request = axios.put(`${baseUrl}/${id}`, person);
	return request.then(response => response.data);
}

const erase = id => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then(() => {return})
}


const person = {
	getAll,
	create,
	changePerson,
	erase
}

export default person;