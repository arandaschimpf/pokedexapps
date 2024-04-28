import axios from 'axios';



const pokemonApi = axios.create({
    baseURL: 'http://localhost:4000/api'
});

export default pokemonApi;