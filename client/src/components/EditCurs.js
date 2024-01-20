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
function EditCurs (){
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const href = window.location.href;
        const id = href.split('/').at(-1);
        const fetchCurs = async () => {
          const res = await fetch(`http://localhost:3000/courses/get/${id}`);
          const data = await res.json();
          setName(data.name);
          setContent(data.content);
        };
        fetchCurs();
      }, []);

    const handleSubmit = () => {
         const id = window.location.href.split('/').at(-1);      
        fetch(`http://localhost:3000/courses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: name, 
            content: content
           }),
        })
          .then((res) => res.json())
          .then((data)=>{
            toast.success(`Curs ${name} modificat cu succes!`)
          }).catch((e)=>toast.error(`Modificare curs ${name} esuata!`));
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => setContent(e.target.value)}
              name="content"
              value={content}
              label="content"
              type="text"
              id="content"
              autoComplete="content"
            />
            <Button
              fullWidth
             type="button"
             variant="contained" color="success"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Salveaza
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

export default EditCurs;