// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// acesta era fisierul initial




import React from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Inscriere from './components/Inscriere';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './components/Admin';
import AddCursuri from './components/AddCursuri';
import EditCurs from './components/EditCurs';

export default function App() {
    return (
      <>
       <Navbar />
       <ToastContainer />
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/inscriere" element={<Inscriere />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin/addcurs" element={<AddCursuri />} />
        <Route exact path="/admin/editcurs/:id" element={<EditCurs />} />
      </Routes>
    </BrowserRouter>
      </>
    );
  }
