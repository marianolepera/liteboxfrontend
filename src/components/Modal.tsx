import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor:theme.palette.secondary.main,
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <Box sx={{backgroundColor:(theme:any) =>theme.palette.secondary.main}}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            AGREGAR PELICULA
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
                AGREGA UN ARCHIVO O ARRASTRALO Y SOLTALO AQUI 
            </Typography>
            <Box sx={{justifyContent:"center",textAlign:"center",alignItems:"center"}}>
                <TextField  
                    required
                    color="success"
                    sx={{ input: { color: 'white'} }} 
                    InputLabelProps={{style: { color: '#fff',borderBottom:"white"  }}}  
                    id="standard-basic" 
                    label="TITULO" 
                    variant="standard" />
            </Box>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Save changes
            </Button>
            </DialogActions>
        </Box>
       
      </BootstrapDialog>
    </div>
  );
}