import { FC, useEffect,useState } from "react";
import Box from '@mui/material/Box';
import { Grid, Typography } from "@mui/material";
import MiniCard from "./MiniCard";
import Movie from "../interfaces/movieInterface";



interface HeroInterface {
    movies: Array<Movie>,
    popularMovies: Array<Movie>
  }

  
const Hero:FC<HeroInterface>= ({movies,popularMovies}:HeroInterface) =>{
  
    const verSX={
        fontSize:"18px",
        lineHeight:"18px",
        letterSpacing:"4px",
        fontWeight:400,
        color:"white"
    }


    return(
        <Box sx={{marginTop:4}}>
            <Grid container >
                <Grid item  xs={12} md={10}></Grid>
                <Grid item xs={12} md={2}>
                    <Grid container direction="column">
                        <Typography sx={verSX}>VER POPULARES</Typography>
                        {popularMovies?.map(popular=>(
                            <div key={popular?.id}>
                                 <MiniCard popular={popular}></MiniCard>
                            </div>
                        ))}
                       
                    </Grid>
                    
                </Grid>

            </Grid>
        </Box>
    )
}

export default Hero