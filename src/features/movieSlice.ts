import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Movie from "../interfaces/movieInterface";
import moviesService from "./moviesServices";

interface MovieState  {
    loadingTopMovie: boolean;
    loadingMovies: boolean;
    error: string | null;
    success: boolean;
    movies: Movie[] | null;
    topMovie:Object | null,
    popularMovies: Array<Object> | null
    movieSelected: Movie | null;
  }
  
const initialState: MovieState = {
  loadingTopMovie: false,
  loadingMovies: false,
  error: null,
  movies: null,
  topMovie:null,
  success: false,
  popularMovies:null,
  movieSelected:null
}

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, thunkApi) => {
    try {
      return await moviesService.getMovies()
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getTopMovie = createAsyncThunk(
  "movies/getTopMovie",
  async (_, thunkApi) => {
    try {
      return await moviesService.getTopMovie()
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async (_, thunkApi) => {
    try {
      return await moviesService.getPopularMovies()
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createMovie = createAsyncThunk(
  "movies/createMovie",
  async (movieData:Movie, thunkApi) => {
    try {
      let movie = await moviesService.createMovie(movieData)
      return movie
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const getMoviebyId = createAsyncThunk(
  'movies/getMovieById',
  async ( movieId:number,thunkApi) => {
    try {
      return await moviesService.getMovieById(movieId)
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
)



const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMovie.pending, (state) => {
        state.loadingMovies = true;
      })
      .addCase(createMovie.fulfilled, (state, action:PayloadAction<Movie>) => {
        state.loadingMovies = false;
        state.success = true;
        state.movies?.push(action.payload)
      })
      .addCase(createMovie.rejected, (state, action:PayloadAction<any>) => {
        state.loadingMovies = false;
        state.error = action.payload
      })
      .addCase(getMovies.pending, (state, action) => {
        state.loadingMovies = true;
      })
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loadingMovies = false;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
        state.loadingMovies = false;
        state.error = action.payload;
      })
      .addCase(getTopMovie.pending, (state, action) => {
        state.loadingTopMovie = true;
      })
      .addCase(getTopMovie.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingTopMovie = false;
        state.topMovie = action.payload;
      })
      .addCase(getTopMovie.rejected, (state, action: PayloadAction<any>) => {
        state.loadingTopMovie = false;
        state.error = action.payload;
      })
      .addCase(getPopularMovies.pending, (state, action) => {
        state.loadingMovies = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingMovies = false;
        state.popularMovies = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action: PayloadAction<any>) => {
        state.loadingMovies = false;
        state.error = action.payload;
      })
      .addCase(getMoviebyId.pending, (state, action) => {
          state.loadingMovies = true;
        })
      .addCase(getMoviebyId.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loadingMovies = false;
        state.movieSelected = action.payload;
      })
      .addCase(getMoviebyId.rejected, (state, action: PayloadAction<any>) => {
        state.loadingMovies = false;
        state.error = action.payload;
      });
  },
});
export const { reset } = movieSlice.actions

export default movieSlice.reducer;
