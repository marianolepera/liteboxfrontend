import { FC, useEffect,useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Movie from "../interfaces/movieInterface";
import { Box, useTheme } from "@mui/material";


interface miniCardInterface {
  movieCard: Movie,
}



const MiniCard:FC<miniCardInterface> = ({movieCard}:miniCardInterface) =>{

  let MovieCardURL="https://image.tmdb.org/t/p/w500"+ movieCard?.backdrop_path
  const theme = useTheme();

  const cardSX={
    width: 220,
    height:152,
    marginTop:2,
    marginBottom:1,
    position:"relative",
    [theme.breakpoints.down('md')]: {width:"100%",}

    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,

    // overflow:"hidden"
  }

  const miniCardImageSX={
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition:"center center",
    backgroundSize:"100% 100%",
    width:"100%",
    maxWidth:"auto",
    maxHeight:"100%",
    // display:"block"
    }
  const titleSX={
    fontSize:"16px",
    letterSpacing:"4px",
    color:"white",
    textAlign:"center",
  }
  return (
      <Card sx={cardSX}>
        <CardMedia  sx={miniCardImageSX} image={MovieCardURL} >
          <CardContent sx={{backgroundColor:"transparent",position:"relative"}} >
          <Typography sx={titleSX} style={{display:"flex",alignItems:"flex-end",}} >
              {movieCard?.original_title}
            </Typography>
            {/* <Typography sx={{color:"white"}} gutterBottom >
              {popular?.vote_average}
            </Typography>
            <Typography sx={{color:"white"}} variant="body2" color="text.secondary">
              {popular?.release_date ? popular?.release_date.substring(0,4) : null}
            </Typography>  */}
          </CardContent>
        </CardMedia>
        {/* <Box sx={miniCardImageSX}>

        </Box> */}
        {/* <img src={popularMovieURL} style={miniCardImageSX}>
        </img>
        <Box sx={{position:"relative",zIndex:3}}> 
            <Typography sx={{color:"white"}} gutterBottom >
              {popular?.original_title}
            </Typography>
            <Typography sx={{color:"white"}} gutterBottom >
              {popular?.vote_average}
            </Typography>
            <Typography sx={{color:"white"}} variant="body2" color="text.secondary">
              {popular?.release_date ? popular?.release_date.substring(0,4) : null}
            </Typography> 
        </Box> */}
      </Card>
  );
}

export default MiniCard