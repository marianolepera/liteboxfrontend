import { FC, useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loader from "../components/Loader";
import { getTopMovie,getMovies,getPopularMovies,reset } from "../features/movieSlice";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import { Box } from "@mui/material";
  
const Home: FC = () =>{
    const dispatch = useAppDispatch();
    const { loading, topMovie,movies,popularMovies,error } = useAppSelector((state) => state.movies);
    useEffect(() => {
        dispatch(getTopMovie());
        dispatch(getPopularMovies())
        dispatch(getMovies())
        
    }, [dispatch]);

    
    let myMovieURL="https://image.tmdb.org/t/p/original"+ topMovie?.poster_path

    const container ={
        heroContainer:{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${myMovieURL}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition:"center center",
            backgroundSize:"100% 100%",
            width:"100%",
            height:"auto",
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