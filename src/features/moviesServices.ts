import axios from 'axios'
import Movie from "../interfaces/movieInterface";

const getMovies = async () => {
    const response = await axios.get("https://good-plum-squirrel-cuff.cyclic.app/api/peliculas")
    return response.data
  }

const getTopMovie = async () => {
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20')
    try {
        const topMovie = data.results.sort(() => 0.5 - Math.random()).slice(0, 1);
        return topMovie
    } catch (error:any) {
        return error.message
    }
}

const getPopularMovies = async () => {
    
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20')
    try {
        const popularMovies = data.results.sort(() => 0.5 - Math.random()).slice(0, 4);
        return popularMovies
    } catch (error:any) {
        return error.message
    }
    
    
}

const getMovieById = async (movieId:any) => {
    const response = await axios.get(import.meta.env.API + `/api/peliculas/${movieId}`)
    return response.data
  }

const createMovie = async (movieData:Movie) => {
    const response = await axios.post("https://good-plum-squirrel-cuff.cyclic.app/api/peliculas",movieData,
    // {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //       }
    // }
    )
    return response.data
  }

const moviesService = {
    getMovies,
    getMovieById,
    createMovie,
    getTopMovie,
    getPopularMovies
}

export default moviesService;
