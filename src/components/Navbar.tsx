import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RightDrawer from './Drawer';
import Modal from './Modal';




function Header() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const liteSX ={
    fontSize:"34px",
    lineHeight:"34px",
    fontWeight: 500,
    letterSpacing: '4px',
    color: (theme:any) => theme.palette.custom.main,
    textDecoration: 'none',
  }

  const flixSX={
    fontSize:"34px",
    lineHeight:"34px",
    fontWeight: 400,
    letterSpacing: '4px',
    color: (theme:any) => theme.palette.custom.main,
    textDecoration: 'none',
  }

  const addMovieSX={
    color:"white",
    fontWeight: 550,
    fontSize: "18px",
    lineHeight:"18px",
    letterSpacing: "4px",              
    display: { xs: 'none', md: 'flex' },
    "$hover":{
        scale: '5.04'
    }
  }

  return (
    <AppBar sx={{boxShadow:"none",background: "transparent"}} position="static">
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1,display: { xs: 'none', md: 'flex' }}}>
            <Typography
                sx={liteSX}
            >
                LITE
            </Typography>
            <Typography
                sx={flixSX}
            >
                FLIX
            </Typography>
            <Button 
                sx={addMovieSX} 
                style={{marginLeft:30}}
                variant="text" 
                onClick={handleClickOpen}
                startIcon={<AddIcon />}>
                AGREGAR PELICULA
            </Button>
            <Modal
              open={open}
              setOpen={setOpen}
            />
          </Box>
          <Box sx={{ flexGrow: 0,display:"flex" }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
              <RightDrawer handleClickOpen={handleClickOpen}/>
              <IconButton 
                size="large"
                color="inherit">
                <NotificationsActiveIcon fontSize='large' style={{marginLeft:10,marginRight:10}}/>
              </IconButton>
              
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/image5.svg" />
              </IconButton>
            </Box>
          </Box>

          {/* MOBILE  VIEW STARTS */}
          <Box sx={{  flexGrow:1,display: { xs: 'flex', md: 'none' } }}>
          <RightDrawer handleClickOpen={handleClickOpen}/>
          </Box>
          <Box sx={{flexGrow:1,display: { xs: 'flex', md: 'none' } }}>
            <Typography
              sx={liteSX}
            >
              LITE
            </Typography>
            <Typography
              sx={flixSX}
            >
              FLIX
            </Typography>
          </Box>
          <Box sx={{display: { xs: 'flex', md: 'none' } }}>
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/public/image5.svg" />
            </IconButton>
          </Box>
          {/* MOBILE VIEW ENDS */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;