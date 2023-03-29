import { FC,useState,Fragment } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useTheme, useMediaQuery, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';


interface rightDrawerInterface {
  handleClickOpen: () =>void
}

type Anchor = 'right';

const RightDrawer:FC<rightDrawerInterface> =({handleClickOpen}:rightDrawerInterface) => {
  const [state, setState] = useState({
    right: false,
  });
  const theme = useTheme();
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const drawerSX={
    width: 532, 
    backgroundColor:"secondary.main",
    color:"secondary.contrastText",
    height:"100%",
    [theme.breakpoints.down('md')]: {width: 375,},
  }

  const listItemSX={
    fontSize: '22px',
    lineHeight:"22px",
    letterSpacing:"4px"
  }

  const listItemButtonSX={
    fontSize: '22px',
    fontWeight:700,
    lineHeight:"22px",
    letterSpacing:"4px",
  }
  
  const list = (anchor: Anchor) => (
    <Box
      sx={drawerSX}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Box sx={{marginLeft:4}}>
        <div style={{display:"flex",flexDirection:"row",marginTop:10}}>
            <Box sx={{flexGrow:2}}>
                <IconButton
                size="large"
                onClick={toggleDrawer(anchor, false)}
                color="inherit"
                >
                    <CloseIcon fontSize='large'/>
                </IconButton>
            </Box> 
            <Box>
            <IconButton 
                size="large"
                color="inherit">
                <NotificationsActiveIcon fontSize='large'/>
            </IconButton>
            </Box>
            <Box sx={{flexGrow:0.2,marginRight:0}}>
            <IconButton>
                <Avatar alt="Remy Sharp" src="/public/image5.svg" />
            </IconButton>
            </Box>
        </div>
      <List>
        {['INICIO', 'SERIES', 'PELICULAS', 'AGREGADAS  RECIENTEMENTE','POPULARES','MIS PELICULAS','MI LISTA'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primaryTypographyProps={listItemSX} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItemButton 
        sx={{
          ":hover":{
          transform: "scale(1.1)",
          transition: "all 0.45s ease-in-out",
          cursor: "pointer"
        }}} 
        onClick={handleClickOpen}>
              <ListItemText  primaryTypographyProps={listItemButtonSX}  primary="+ AGREGAR PELICULA" />
      </ListItemButton>
      <List>
        {['CERRAR SESION'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primaryTypographyProps={listItemSX} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Box>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <Fragment key={anchor}>
             <IconButton
              sx={{
                ":hover":{
                transform: "scale(1.2)",
                transition: "all 0.45s ease-in-out",
                cursor: "pointer"
            }}}
              size="large"
              onClick={toggleDrawer(anchor, true)}
              color="inherit"
            >
                <MenuIcon fontSize='large'/>
            </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}

export default RightDrawer