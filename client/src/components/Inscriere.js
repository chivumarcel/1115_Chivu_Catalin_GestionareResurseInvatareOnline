import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function Inscriere() {
  const [user, setUser] = useState({});
  const [cursuri, setCursuri] = useState([]);

    const inscriereLaCurs = (id) => {
        ///register/:courseId/users/:userId"
        fetch( `http://localhost:3000/courses/register/${id}/users/${localStorage.getItem('id')}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }) .then((res) => res.json())
            .then((data) => {
            }).catch( (err)=>{console.log(err);}
            );
    };

  useEffect(() => {
    if (!localStorage.getItem('id')) window.location.href = '/login';
    else {
      const fetchStudent = async () => {
        const res = await fetch(
          `http://localhost:3000/users/${localStorage.getItem('id')}`
        );
        const data = await res.json();
        setUser(data);
      };
      const fetchCursuri = async () => {
        const res = await fetch(`http://localhost:3000/courses/all`);
        const data = await res.json();
        setCursuri(data);
      };
      fetchStudent();
      fetchCursuri();
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Cursuri Disponibile
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
             Inscrie-te la cursuri cu un singur click
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cursuri.map((materie) => (
              <Grid item key={materie.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>{
                   let raspuns = prompt('Daca doresti sa te inscrii la '+materie.name+', tasteaza Da');
                   if(raspuns === 'da' || raspuns === 'Da' || raspuns === 'DA'){
                       inscriereLaCurs(materie.id);
                       toast.success('Inscriere efectuata!',{
                        position: "top-right",
                        autoClose: 1500,
                       });
                       
                   } else toast.error('Inscriere anulata', {
                    position: "top-right",
                    autoClose: 1500,
                  });
                  }
                  }
                >
                  <CardMedia
                    component="img"
                    image="./course.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ textAlign: 'center' }}
                    >
                      {materie.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
