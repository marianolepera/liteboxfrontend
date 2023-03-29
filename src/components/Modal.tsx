import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DropZone from './DropZone';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createMovie,reset } from "../features/movieSlice";
import Movie from '../interfaces/movieInterface';
import { LinearProgress, Typography } from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor:theme.palette.secondary.main,
    width:"730px",
    [theme.breakpoints.down('md')]: {
    width: '375px',
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    backgroundColor:theme.palette.secondary.main
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
      },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '&:hover .MuiInput-underline:before': {
        borderBottomColor: 'white',
      },
    "& .MuiFormLabel-root": {
        color: 'white'
    },
  });

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

 
  

  const titleSX={
    marginTop: 4, 
    p: 2,
    color:(theme:any) => theme.palette.custom.main,
    textAlign:"center",
    fontSize:"20px",
    fontWeight:500,
    lineHeight:"20px",
    letterSpacing:"4px"
  }
  return (
    <DialogTitle sx={titleSX} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Modal({open,setOpen}:any) {
  const dispatch = useAppDispatch();
  const { error,success } = useAppSelector((state) => state.movies);
  const [progress, setProgress] = React.useState(0);
  const [isError, setIsError] = React.useState(false);
  const [original_title, setOriginalTitle] = React.useState("")
  const [backdrop_path, setBackDropPath] = React.useState('');
  const handleClose = () => {
    dispatch(reset())
    setOpen(false);
    setIsError(false)
    setProgress(0)
  };

  const handleImageReader = (files:any,fileRejected:any) => {
    const fileReader:any = new FileReader();
    fileReader.onerror = () => {
        setProgress(100)
        setIsError(true);
      };
    
    fileReader.onloadstart = (data:ProgressEvent) => {
      if (fileReader.readyState === 1) {
        let valueProgress = data.loaded;
        setProgress(valueProgress);
      }
    };

    fileReader.onprogress = (data:ProgressEvent) => {
      if (fileReader.readyState === 1) {
        let valueProgress = (data.loaded / data.total) * 50;
        setProgress(valueProgress);
      }
    };

    fileReader.onloadend = (data:ProgressEvent) => {
      if (fileReader.readyState === 2) {
        const valueProgress = 50 + (data.loaded / data.total) * 50;
        setProgress(valueProgress);
        setBackDropPath(fileReader.result );
      }
    };

    if (files) {
        fileReader.readAsDataURL(files);
    }
    if(fileRejected){
        setIsError(true)
    }
  };

  const onSubmitMovie = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formMovie:Movie={
            original_title,
            backdrop_path
        }
        dispatch(createMovie(formMovie))
        dispatch(reset())
  }

  const validations = () =>{
    if(progress != 100 || !original_title){
        return true
    }
    else
    {
        return false
    }
  }

  const resetProgress = () =>{
    setIsError(false)
    setProgress(0)
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <Box sx={{
            backgroundColor:(theme:any) =>theme.palette.secondary.main,
            height:440}}>
            <form onSubmit={(e) =>onSubmitMovie(e)}>
                {progress > 0 ? 
                <>
                    {progress == 100 && error && 
                    <>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        LITEFLIX
                        </BootstrapDialogTitle>
                        <DialogContent sx={{marginTop:7,textAlign:"center"}}>
                           <Typography sx={{color:"white"}}>¡¡ERROR!!</Typography>
                           <Typography sx={{color:"white"}}>Hubo un error al intentar subir la pelicula. Intentelo nuevamente</Typography>
                        </DialogContent>
                        <DialogActions sx={{justifyContent:"center"}}>
                            <Button onClick={handleClose} sx={{width:180,marginBottom:4}}  type="submit" variant="contained" color="modalButtom" autoFocus >
                                REINTENTAR
                            </Button>
                        </DialogActions>
                    </>  
                    }
                    { progress == 100 && success && 
                      <>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        LITEFLIX
                        </BootstrapDialogTitle>
                        <DialogContent sx={{marginTop:7,textAlign:"center"}}>
                          <Typography sx={{color:"white"}}>¡FELICITACIONES!</Typography>
                          <Typography sx={{color:"white"}}>{original_title} FUE CORRECTAMENTE SUBIDO</Typography>
                        </DialogContent>
                        <DialogActions sx={{justifyContent:"center"}}>
                            <Button onClick={handleClose} sx={{width:180,marginBottom:4}}  type="submit" variant="contained" color="modalButtom" autoFocus >
                                IR AL HOME
                            </Button>
                        </DialogActions>
                     </>
                    }
                    {!error && !success && 
                        <>
                          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                          AGREGAR PELICULA
                          </BootstrapDialogTitle>
                          <DialogContent sx={{marginTop:3}}>
                          <DropZone handleImageReader={handleImageReader} progress={progress} resetProgress={resetProgress}></DropZone>
                          <Box sx={{justifyContent:"center",textAlign:"center",alignItems:"center",marginTop:4}}>
                              <CssTextField   
                                  value={original_title}
                                  onChange={(e) =>setOriginalTitle(e.target.value)}
                                  required
                                  placeholder='titulo'
                                  sx={{input: { color: 'white',borderColor:"white",textAlign:"center"  } }} 
                                  InputLabelProps={{style: { color: 'white' }}}  
                                  id="standard-basic" 
                                  variant="standard" />
                          </Box>
                          </DialogContent>
                          <DialogActions sx={{justifyContent:"center"}}>
                              <Button  disabled={validations()} sx={{width:180,marginBottom:4}}  type="submit" variant="contained" color="modalButtom" autoFocus >
                                  SUBIR PELICULA
                              </Button>
                          </DialogActions>
                        </>
                    }
                </>
                :
                <>
                { isError ? 
                    <>
                     <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                     AGREGAR PELICULA
                     </BootstrapDialogTitle>
                     <DialogContent sx={{marginTop:3}}>
                     <Typography sx={{color:"white"}}>¡ERROR! NO SE PUDO CARGAR LA PELICULA </Typography>
                     <LinearProgress color="warning" variant="determinate" value={progress} />
                     <Typography sx={{color:"white",float:"right"}}  onClick={resetProgress}>REINTENTAR</Typography>
                     <Box sx={{justifyContent:"center",textAlign:"center",alignItems:"center",marginTop:4}}>
                         <CssTextField   
                             value={original_title}
                             onChange={(e) =>setOriginalTitle(e.target.value)}
                             required
                             placeholder='titulo'
                             sx={{input: { color: 'white',borderColor:"white",textAlign:"center"  } }} 
                             InputLabelProps={{style: { color: 'white' }}}  
                             id="standard-basic" 
                             variant="standard" />
                     </Box>
                     </DialogContent>
                     <DialogActions sx={{justifyContent:"center"}}>
                         <Button  disabled={true} sx={{width:180,marginBottom:4}}  type="submit" variant="contained" color="modalButtom" autoFocus onClick={handleClose}>
                             SUBIR PELICULA
                         </Button>
                     </DialogActions>
                    </>
                :
                    <>
                      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                      AGREGAR PELICULA
                      </BootstrapDialogTitle>
                      <DialogContent sx={{marginTop:3}}>
                      <DropZone handleImageReader={handleImageReader} resetProgress={resetProgress} progress={progress}></DropZone>
                      <Box sx={{justifyContent:"center",textAlign:"center",alignItems:"center",marginTop:4}}>
                          <CssTextField  
                              value={original_title}
                              onChange={(e) =>setOriginalTitle(e.target.value)}
                              required
                              placeholder='titulo'
                              sx={{input: { color: 'white',borderColor:"white",textAlign:"center"  } }} 
                              InputLabelProps={{style: { color: 'white' }}}  
                              id="standard-basic" 
                              // label="TITULO" 
                              variant="standard" />
                      </Box>
                      </DialogContent>
                      <DialogActions sx={{justifyContent:"center"}}>
                          <Button  disabled={validations()}  sx={{width:180,marginBottom:4}} type="submit" variant="contained" color="modalButtom" autoFocus onClick={handleClose}>
                              SUBIR PELICULA
                          </Button>
                      </DialogActions>
                    </>
                }
                </>
                }
            </form>
        </Box>
      </BootstrapDialog>
    </div>
  );
}