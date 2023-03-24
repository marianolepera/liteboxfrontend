import { FC, useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTopMovie } from "../features/movieSlice";

import Navbar from '../components/Navbar';
import Loader from "../components/Loader";

const Home:FC = () =>{
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        dispatch(getTopMovie());
    }, [dispatch]);

    const { loading, topMovie,error } = useAppSelector((state) => state.movies);

    if(loading){
        return <Loader/>
    }
    
    return(
        <div>
            <Navbar></Navbar>
        </div>
    )
}

export default Home