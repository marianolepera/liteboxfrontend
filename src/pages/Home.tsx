import { FC, useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loader from "../components/Loader";
import { getTopMovie,getMovies,getPopularMovies } from "../features/movieSlice";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import { Box } from "@mui/material";
  
const Home: FC = () =>{
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTopMovie());
        dispatch(getPopularMovies())
        dispatch(getMovies())
    }, [dispatch]);

    const { loading, topMovie,movies,popularMovies,error } = useAppSelector((state) => state.movies);
    let myMovieURL="https://image.tmdb.org/t/p/original"+ topMovie?.poster_path

    const container ={
        heroContainer:{
            backgroundImage: `url("${myMovieURL}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition:"center center",
            backgroundSize:"cover",
            height:"100%",
            maxHeight:"100%",
            maxWidth:"100%",
            position:"relative",
        },
        
    }

    if(loading){
        return <Loader/>
    }
    

    

    return (
      <Box sx={container.heroContainer}>
            <NavBar></NavBar>
            <Hero 
                movies={movies}
                popularMovies={popularMovies}
            // myMovieURL={myMovieURL}
            />
      </Box>
    )
  }


  export default Home