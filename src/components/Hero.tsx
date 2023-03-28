import { FC, useEffect,useState } from "react";
import { FormControl, Grid, MenuItem, Select, Typography,useTheme,Box, styled, Paper, Button } from "@mui/material";
import MiniCard from "./MiniCard";
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMovies,getPopularMovies,reset } from "../features/movieSlice";
import Loader from "./Loader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Movie from "../interfaces/movieInterface";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AddIcon from '@mui/icons-material/Add';

  
interface HeroInterface {
    topMovie: Movie | null
}

const Hero:FC<HeroInterface> = ({topMovie}:HeroInterface) =>{
    const theme = useTheme();
    const [category,setCategory]=useState("populares")
    const dispatch = useAppDispatch();
    const { loadingMovies, popularMovies,movies,error } = useAppSelector((state) => state.movies);


    const getCategoryOfMovie = () =>{
        if(category == "populares"){
            dispatch(getPopularMovies())
        }else{
            dispatch(getMovies())
        }
    }

    useEffect(() => {
        getCategoryOfMovie()
    }, [category,dispatch]);
  
    

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
      };

      if(loadingMovies){
        return <Loader/>
    }

    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    //   }));
    const verSX={
        fontSize:"18px",
        lineHeight:"18px",
        letterSpacing:"4px",
        fontWeight:400,
        color:"white",
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };

    const gridColumnSX={
       marginTop:50, 
      [theme.breakpoints.down('md')]: {marginTop: 0,}
    }

    const originalDeSX={
        fontSize:"20px",
        lineHeight:"24px",
        letterSpacing:"4px",
        color:"white",
        // [theme.breakpoints.up('lg')]: {paddingLeft: 24,}
    }

    const originalLiteFlixSX={
        fontSize:"20px",
        lineHeight:"24px",
        fontWeight:600,
        letterSpacing:"4px",
        color:"white",
        margintRight:20,
        // [theme.breakpoints.up('lg')]: {paddingLeft: 24,}
    }

    const titleTopMovieSX={
        fontSize:"120px",
        lineHeight:"100px",
        letterSpacing:"16px",
        color:(theme:any) => theme.palette.custom.main,
        [theme.breakpoints.down('md')]: {fontSize: "76px",lineHeight:"77.5px",letterSpacing:"12px",textAlign:"center"}

    }
    const flexDirectionSX={
        display:"flex",
        flexDirection:"row",
        [theme.breakpoints.down('md')]: {justifyContent: "center",textAlign:"center",alignItems:"center"}

    }

    const buttonPlaySX={
        fontSize:"18px",
        lineHeight:"21.6px",
        backgroundColor:theme.palette.secondary.main,
        letterSpacing:"4px",
        color:"white",
        fontWeight:400,
        padding:2,
        ':hover':{
            bgcolor:'rgba(0, 0, 0, 0.5)',
            borderColor:theme.palette.secondary.main,
        }
    }

    const miListaSX={
        fontSize:"18px",
        lineHeight:"21.6px",
        letterSpacing:"4px",
        color:"white",
        fontWeight:400,
        padding:2,
        background: `rgba(36, 36, 36, 0.5)`,
        border: `1px solid rgba(255, 255, 255, 0.5)`,
        ':hover':{
            bgcolor:theme.palette.secondary.main,
            borderColor:theme.palette.secondary.main,
        }
    }

    return(
        <Box sx={{marginTop:4}}>
            <Grid container columns={12}>
                <Grid item md={1} lg={1}></Grid>
                <Grid item sx={gridColumnSX} xs={12} sm={12} md={8} lg={8}>
                    <Box>
                        <Box sx={flexDirectionSX}>
                            <Typography style={{marginRight:10,}} sx={originalDeSX}> ORIGINAL DE </Typography>
                            <Typography sx={originalLiteFlixSX}>  LITEFLIX</Typography>
                        </Box>
                        <Typography style={{marginTop:12}} sx={titleTopMovieSX}>{topMovie?.original_title}</Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex',marginTop:20 }}}>
                            <Button sx={buttonPlaySX} style={{marginRight:20,width:248}} startIcon={<PlayArrowOutlinedIcon/>}>
                                REPRODUCIR
                            </Button>
                            <Button  startIcon={<AddIcon/>} sx={miListaSX} style={{width:248}} variant="outlined">
                                MI LISTA
                            </Button>
                        </Box>
                        {/* MOBILE VIEW  STARTS*/}
                        <Box sx={{ display: { xs: 'block', md: 'none', }}}>
                            <Grid item xs={12} sm={12} sx={{textAlign:"center"}}>
                                <Button sx={buttonPlaySX} style={{width:"70%",marginTop:20}} startIcon={<PlayArrowOutlinedIcon/>}>
                                    REPRODUCIR
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{textAlign:"center"}}>
                                <Button  startIcon={<AddIcon/>} style={{width:"70%",marginTop:10}} sx={miListaSX} variant="outlined">
                                    MI LISTA
                                </Button>
                            </Grid>
                        </Box>
                        {/* MOBILE VIEW ENDS */}
                    </Box>
                </Grid>
                <Grid  item xs={12} sm={12} sx={{ display: { xs: 'block', md: 'none', marginTop:20}}}></Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Box  sx={flexDirectionSX} >
                        <Typography style={{marginTop:4,marginRight:4}} sx={verSX}>VER: </Typography>
                        <Select 
                            disableUnderline
                            MenuProps={{
                                PaperProps: {
                                  sx: {
                                    bgcolor: theme.palette.secondary.main,
                                    '& .MuiMenuItem-root': {
                                      padding: 2,
                                    },
                                  },
                                },
                              }}
                            value={category}
                            style={verSX}
                            sx={{[theme.breakpoints.down('md')]: {bottom:-6},"& .MuiSelect-icon": { color: "white",top:-1 } }}
                            variant="standard"
                            onChange={handleChangeCategory} 
                            displayEmpty
                            IconComponent={(props)=>(<ExpandMoreIcon {...props} />)}
                            >
                            <MenuItem sx={{color:"white"}} value={"populares"}>
                                POPULARES
                            </MenuItem>
                            <MenuItem sx={{color:"white"}} value={"peliculas"}>
                                MIS PELICULAS
                            </MenuItem>
                            
                        </Select>
                    </Box>
            
                {category == "populares" && (
                    <>
                    {popularMovies?.map(movie=>(
                        <div key={movie?.id}>
                            <MiniCard movieCard={movie}></MiniCard>
                        </div>
                    ))}
                    </>
                ) }
                {category == "peliculas" && (
                    <>
                    {movies?.map(movie=>(
                        <div key={movie?.id}>
                            <MiniCard movieCard={movie}></MiniCard>
                        </div>
                    ))}
                    </>
                )}
                    
                    

                    
                    
                    
                </Grid>

            </Grid>
        </Box>
    )
}

export default Hero