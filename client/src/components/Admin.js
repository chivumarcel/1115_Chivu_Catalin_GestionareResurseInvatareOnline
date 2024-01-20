import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function Admin() {
  const [user, setUser] = useState({});
  const [cursuri, setCursuri] = useState([]);

  const fetchCursuri =async () => {
    const res = await fetch(`http://localhost:3000/courses/all`);
        const data = await res.json();
        setCursuri(data);
  };
  useEffect(fetchCursuri, []);

  const stergeCurs = (key) => {
    fetch(`http://localhost:3000/courses/${key}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        fetchCursuri()
      });
  }
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
             Gestioneaza cursurile cu un singur click
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cursuri.map((materie,i) => (
              <Grid item key={materie.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>{
                    window.location.href = `/admin/editcurs/${cursuri[i].id}`;
                  }}
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
                <Button
                    onClick={()=>{stergeCurs(cursuri[i].id)}}
                    >Sterge</Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
