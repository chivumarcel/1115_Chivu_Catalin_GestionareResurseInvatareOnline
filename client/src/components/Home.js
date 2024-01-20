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

const theme = createTheme();

export default function Home() {
  const [user, setUser] = useState({});
  const [cursuri, setCursuri] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('id')) window.location.href = '/login';
    else {
      const fetchStudent = async () => {
        const res = await fetch(
          `http://localhost:3000/users/${localStorage.getItem('id')}`
        );
        const data = await res.json();
        console.log(data)
        setUser(data);
      };
      const fetchCursuri = async () => {
        const res = await fetch(`http://localhost:3000/courses/${localStorage.getItem('id')}`);
        const data = await res.json();
        console.log(data); 
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
              {`Pagina ta de cursuri, ${user.fullname}`}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Bine ai venit pe Platforma! Inscrie-te la cursuri cu un click
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
                  onClick={() =>
                    (window.location.href = `/materie/${materie.nume}`)
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
