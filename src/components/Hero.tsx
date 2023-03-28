import { FC, useEffect,useState } from "react";
import { FormControl, Grid, MenuItem, Select, Typography,useTheme,Box } from "@mui/material";
import MiniCard from "./MiniCard";
import { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMovies,getPopularMovies,reset } from "../features/movieSlice";
import Loader from "./Loader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  
const Hero:FC = () =>{
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
  
    const verSX={
        fontSize:"18px",
        lineHeight:"18px",
        letterSpacing:"4px",
        fontWeight:400,
        color:"white",
    }


    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
      };

      if(loadingMovies){
        return <Loader/>
    }
    return(
        <Box sx={{marginTop:4}}>
            <Grid container >
                <Grid item  xs={12} md={9}></Grid>
                <Grid item xs={12} md={3}>
                    <Grid container direction="row">
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
                            sx={{ "& .MuiSelect-icon": { color: "white",top:-1 } }}
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
                </Grid>
            
                {category == "populares" && popularMovies?.map(movie=>(
                    <div key={movie?.id}>
                        <MiniCard movieCard={movie}></MiniCard>
                    </div>
                ))} 
                {category == "peliculas" && movies?.map(movie=>(
                    <div key={movie?.id}>
                        <MiniCard movieCard={movie}></MiniCard>
                    </div>
                ))}    
                    

                    
                    
                    
                </Grid>

            </Grid>
        </Box>
    )
}

export default Hero