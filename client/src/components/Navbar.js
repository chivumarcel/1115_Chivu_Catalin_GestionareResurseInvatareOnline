import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={() => (window.location.href = '/')}
      >
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
      {localStorage.getItem('id') && !localStorage.getItem('admin')&&(
         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}
         style={{cursor:'pointer'}}
         onClick={() => {
               window.location.href = '/inscriere';
             }}>
          Inscrie-te la un curs nou
         </Typography>
      )}
      {localStorage.getItem('id') && localStorage.getItem('admin')&&(
         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}
         style={{cursor:'pointer'}}
         onClick={() => {
               window.location.href = '/admin/addcurs';
             }}>
          Gestioneaza Cursuri
         </Typography>
      )}
      {localStorage.getItem('id') && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            window.location.href = '/';
            localStorage.removeItem('id');
            localStorage.removeItem('admin');
          }}
        >
          Logout
        </Button>
      )}
    </Toolbar>
  );
}

const darkTheme2 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function EnableColorOnDarkAppBar() {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme2}>
        <AppBar position="static" color="primary" enableColorOnDark>
          {appBarLabel('Learning Platform')}
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}