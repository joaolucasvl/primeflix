import axios from "axios";
//https://api.themoviedb.org/3/movie/now_playing
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;