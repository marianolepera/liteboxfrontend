import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loader from "../components/Loader";
import { getTopMovie } from "../features/movieSlice";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import { Box, Typography } from "@mui/material";
  
const Home: FC = () =>{
    const dispatch = useAppDispatch();
    const { loadingTopMovie, topMovie,error } = useAppSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getTopMovie());
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
            minHeight:"100%",
            position:"absolute",
        },
    }

    if(loadingTopMovie){
        return <Loader/>
    }
    if(error){
        return <Box> <Typography variant="h1">HUBO UN ERROR AL CARGAR LA IMAGEN</Typography></Box>
    }
    return (
      <Box sx={container.heroContainer}>
            <NavBar></NavBar>
            <Hero
                topMovie={topMovie} 
            />
      </Box>
    )
  }


  export default Home