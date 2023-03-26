import { FC, useEffect,useState } from "react";
import Box from '@mui/material/Box';


interface HeroInterface {
    image:string
  }

const Hero:FC<HeroInterface> = ({image}:HeroInterface) =>{

    const container ={
        heroContainer:{
            backgroundImage: `url(${image})`
        }
        
    }

    return(
        <Box sx={container.heroContainer}>
            <img src={image} ></img>
        </Box>
    )
}

export default Hero