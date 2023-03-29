import { FC,useState,useRef } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Movie from "../interfaces/movieInterface";
import { Box, Grid, useTheme } from "@mui/material";
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import StarIcon from '@mui/icons-material/Star';


interface miniCardInterface {
  movieCard: Movie,
  typeMovie: number,
}



const MiniCard:FC<miniCardInterface> = ({movieCard,typeMovie}:miniCardInterface) =>{
  const [isButtonVisible, setButtonVisible] = useState(false)
  const containerRef = useRef();

  let MovieCardURL
  if(typeMovie == 1) {
    MovieCardURL="https://image.tmdb.org/t/p/w500"+ movieCard?.backdrop_path
  }else if (typeMovie == 2){
    if(movieCard.title){
      MovieCardURL="https://image.tmdb.org/t/p/w500"+ movieCard?.backdrop_path
    }else{
      MovieCardURL=movieCard?.backdrop_path
    }
    
  }
  const theme = useTheme();

  const cardSX={
    width: 220,
    height:152,
    marginTop:2,
    marginBottom:1,
    [theme.breakpoints.down('md')]: {width:"70%",height:"180px",marginLeft:10,justifyContent:"center",textAlign:"center",alignItems:"center"},
  }

  const miniCardImageSX={
    backgroundRepeat: 'no-repeat',
    backgroundPosition:"center center",
    backgroundSize:"100% 100%",
    alignItems: "center",
    justifyContent: "center",
    height:152,
    maxHeight:"100%",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${MovieCardURL}")`,
    [theme.breakpoints.down('md')]: {width:"100%",height:"180px",justifyContent:"center",textAlign:"center",alignItems:"center"},
    ':hover':{
      opacity:0.8,
      transition: "0.45s ease",
      cursor: "pointer"
    }
  }

  const titleSX={
    fontSize:"16px",
    letterSpacing:"4px",
    color:"white",
    textAlign:"center",
    marginBottom:1
  }

  const cardContentBoxSX={
    height:152,
    justifyContent:"center",
    textAlign:"center",
  }
  const playCircleSX={
    color:"white",
    ":hover" : {
      color: (theme:any) => theme.palette.custom.main,
      transition: "0.45s ease",
      cursor: "pointer"
    }
  }

  const averageSX={
    fontSize:"14px",
    lineHeight:"12px",
    letterSpacing:"2px",
    color:"white"
  }

  const starSX={
    fontSize:"14px",
    lineHeight:"12px",
    letterSpacing:"2px",
    marginBottom:10,
    color: (theme:any) => theme.palette.custom.main,
  }
  return (
      <Card sx={cardSX}>
         <CardMedia  sx={miniCardImageSX}  >
          <Box ref={containerRef} 
            onMouseLeave={() => setButtonVisible(false)}>
            <Box
              onMouseEnter={() => setButtonVisible(true)}
            >
              {isButtonVisible ? 
                <Box sx={cardContentBoxSX} style={{transition:"0.5s",}}>
                  {/* MOBILE VIEW STARTS */}
                  <Box sx={{  display: { xs: 'block', md: 'none',position:"relative",marginLeft:10 } }}>
                    <Box sx={{display:"flex",paddingTop:5}}>
                      <PlayCircleFilledTwoToneIcon sx={playCircleSX}  fontSize="large" ></PlayCircleFilledTwoToneIcon>
                      <Typography sx={titleSX} style={{marginTop:5}} > {movieCard?.original_title} </Typography>
                    </Box>
                    <Box sx={{display:"flex",position:"absolute",paddingTop:5}}>
                      <StarIcon sx={starSX}></StarIcon>
                      <Typography sx={averageSX} style={{marginTop:2}}> {movieCard?.vote_average}</Typography>
                      <Box sx={{marginLeft:30}}>
                        <Typography sx={averageSX} style={{marginTop:2}}> {movieCard?.release_date?.substring(0,4)}</Typography>
                      </Box>
                      
                    </Box>
                  </Box>
                  {/* MOBILE VIEW ENDS */}
                  <Box sx={{  display: { xs: 'none', md: 'block' } }}>
                    <Box sx={{display:"flex",flexDirection:"row",paddingTop:5}}>
                      <PlayCircleFilledTwoToneIcon sx={playCircleSX} fontSize="large" ></PlayCircleFilledTwoToneIcon>
                      <Typography sx={titleSX} style={{marginTop:5}}> {movieCard?.original_title}</Typography>
                    </Box>
                    <Box sx={{display:"flex",marginTop:1}}>
                      <StarIcon sx={starSX}></StarIcon>
                        <Typography sx={averageSX} style={{marginTop:2}}> {movieCard?.vote_average}</Typography>
                      <Box sx={{marginLeft:18}}>
                        <Typography sx={averageSX} style={{marginTop:2}}> {movieCard?.release_date?.substring(0,4)}</Typography>  
                      </Box>
                    </Box>
                  </Box>
                </Box>
                : 
                <Box sx={cardContentBoxSX}>
                  <PlayCircleFilledTwoToneIcon sx={{marginTop:8,color:"white"}} fontSize="large" ></PlayCircleFilledTwoToneIcon>
                  <Typography sx={titleSX} style={{transitionDelay: isButtonVisible ? "200ms ease-out" : "200ms"}} >{movieCard?.original_title}</Typography>
                </Box>  
                }  
            </Box>
          </Box>
        </CardMedia> 
      </Card>
  );
}

export default MiniCard