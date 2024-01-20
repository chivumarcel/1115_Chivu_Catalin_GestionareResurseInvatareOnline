import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

   this.state = {
      email: '',       // pt autentificare
      password: '',    // tot pt autentificare
      nume: '',        // pt inregistrare
      newEmail: '',    // Inițializare adăugată pentru email-ul de înregistrare
      newPassword: '', // Inițializare adăugată pentru parola de înregistrare
    };
  }

  handleLogin() {
    const email = this.state.email;
    const password = this.state.password;
    fetch('http://localhost:3000/users/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) alert('Eroare');
        else {
          toast.success('Autentificare cu succes!')
          localStorage.setItem('id', data.id);
         
        }
      }).catch(() => toast.error('Autentificare esuata!'));
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('admin', true);
      window.location.href = '/admin';
    } else {
      localStorage.removeItem('admin');
      window.location.href = '/';
    }
  }

  handleRegister() {
    const email = this.state.newEmail;
    const password = this.state.newPassword;
    const fullname = this.state.nume;
    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullname }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.ok) {
        this.setState({ newEmail: '', newPassword: '', nume: '' });
        toast.success('Inregistrare cu succes!')
      } else {
        toast.error('Inregistrare esuata!')
      }
    });
  }
  
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        {/* Elementul div pentru imaginea de fundal */}
        <div
          style={{
            width: '100%', // pun latime completa
            height: '100px', // setez inaltime de 100px
            backgroundImage: 'url(/src/slim-stripe.jpg)', //nu vrea sa afiseze imaginea nici mort...
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)', // aplic un efect de blur
          }}
        />
        <h2 style={{ marginTop: '10px' }}>Autentificare cu un cont existent</h2>
        <div style={{ width: '500px' }}>
          <label>Email:</label>
          <input
            className="form-control"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div style={{ width: '500px' }}>
          <label>Parola:</label>
          <input
            className="form-control"
            type={'password'}
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <Button
            sx={{
                marginTop: '10px',
                color: 'white', // fac culoarea textului> alb
                fontWeight: 'bold' // fac textul bold
              }}
          onClick={() => this.handleLogin(this.props.functie)}
        >
          Accesare aplicatie
        </Button>
        <h2 style={{ marginTop: '100px' }}>Inregistreaza-te cu un cont nou</h2>
        <div style={{ width: '500px' }}>
          <label>Nume:</label>
          <input
            className="form-control"
            value={this.state.nume}
            onChange={(e) => this.setState({ nume: e.target.value })}
          />
        </div>
        <div style={{ width: '500px' }}>
          <label>Email:</label>
          <input
            className="form-control"
            value={this.state.newEmail}
            onChange={(e) => this.setState({ newEmail: e.target.value })}
          />
        </div>
        <div style={{ width: '500px' }}>
          <label>Parola:</label>
          <input
            className="form-control"
            type={'password'}
            value={this.state.newPassword}
            onChange={(e) => this.setState({ newPassword: e.target.value })}
          />
        </div>
        <Button
            sx={{
                marginTop: '10px',
                color: 'white', // fac culoarea textului> alb
                fontWeight: 'bold' // fac textul bold
              }}
          onClick={() => this.handleRegister()}
        >
          Inregistrare
        </Button>
      </div>
    );
  }
}
