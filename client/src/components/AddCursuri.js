import { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AbcIcon from '@mui/icons-material/Abc';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();
function AddCursuri (){

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        const content = data.get('content');
        fetch('http://localhost:3000/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: name, 
            content: content
           }),
        })
          .then((res) => res.json())
          .then((data)=>{
            toast.success(`Curs ${name} adaugat cu succes!`)
          }).catch((e)=>toast.error(`Adaugare curs ${name} esuata!`));
      };
    return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={2.5}
      
      />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AbcIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Adauga un curs
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="content"
              type="text"
              id="content"
              autoComplete="content"
            />
            <Button
              fullWidth
             type="submit"
             variant="contained" color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Adauga
            </Button>
            <Button
              fullWidth
            type='button'
            variant="outlined" color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick = {
                  ()=>  window.location.href = `/admin`
              }
            >
              Inapoi
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
    )
}

export default AddCursuri;