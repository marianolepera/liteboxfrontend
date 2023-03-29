import Typography from '@mui/material/Typography';
import React, {useMemo,FC} from 'react'
import { useTheme } from '@mui/material';
import {useDropzone} from 'react-dropzone'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinearProgress from '@mui/material/LinearProgress';


interface DropZoneInterface {
  progress: number,
  handleImageReader: (file:File,fileRejected:Object) => void,
  resetProgress: () => void
}

const DropZone:FC<DropZoneInterface> =({handleImageReader,progress,resetProgress}:DropZoneInterface)=> {
    const theme = useTheme();
    const { 
        getRootProps, 
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject } = useDropzone({
        accept: {
          'image/png': ['.png'],
          'image/jpeg': ['.jpg', '.jpeg'],
        },
        onDrop: (acceptFiles,fileRejections) => {
          const fileRejected= (fileRejections[0])
          const file = acceptFiles[0];
         
          handleImageReader(file,fileRejected);
        },
        
      });

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
        textAlign:"center",
        padding: '20px',
        height:64,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'white',
        borderStyle: 'dashed',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        outline: 'none',
        transition: 'border .24s ease-in-out',
        
    };
    
    const focusedStyle = {
    borderColor: 'white'
    };
    
    const acceptStyle = {
    borderColor: '#00e676'
    };
    
    const rejectStyle = {
    borderColor: '#ff1744'
    };
    const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
    }), [
    isFocused,
    isDragAccept,
    isDragReject
    ]);
    const letraSX={
        color: (theme:any) => theme.palette.secondary.contrastText,
        fontSize:"16px",
        lineHeight:"19px",
        letterSpacing:"4px",
        margin: "auto",
        
        
    }
  return (
    <div className="container">
        {progress > 0 ? 
        <div>
            {progress < 100 && 
                <Typography sx={{color:"white"}}> CARGANDO {progress} %</Typography>
            }
            {progress == 100 && 
                <Typography sx={{color:"white"}}>{progress} % CARGADO</Typography>
            }
            <LinearProgress color="custom" variant="determinate" value={progress} />
            {progress < 100 && 
                <Typography sx={{color:"white",float:"right"}} onClick={resetProgress}> CANCELAR</Typography>
            }
            {progress == 100 && 
                <Typography sx={{color:(theme:any) => theme.palette.custom.main,float:"right"}} >LISTO</Typography>
            }
        </div>
        :
        <div {...getRootProps({style})}>

            <input {...getInputProps()} onChange={(e:any) => handleImageReader(e.target.files[0],e.target.fileRejected[0])}/>
            <Typography sx={letraSX}>{<AttachFileIcon sx={{color:"white"}}/>} AGREGA UN ARCHIVO O ARRASTRALO Y SOLTALO AQUI</Typography>
        </div>
        }
    </div>
  )
}

export default DropZone