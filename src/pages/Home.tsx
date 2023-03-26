import { FC, useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loader from "../components/Loader";
import { getTopMovie,getMovies } from "../features/movieSlice";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
  
const Home: FC = () =>{
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMovies())
        dispatch(getTopMovie());
    }, [dispatch]);

    const { loading, topMovie,error } = useAppSelector((state) => state.movies);

    let myMovie= topMovie?.map(top=>( top.poster_path))
    let myMovieURL="https://image.tmdb.org/t/p/original"+ myMovie

    if(loading){
        return <Loader/>
    }
    
    

    return (
      <>
        <NavBar></NavBar>
        {/* <img src={myMovieURL}></img> */}
        <Hero image={myMovieURL}>

        </Hero>
      </>
    )
  }


  export default Home