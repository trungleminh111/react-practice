
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';

import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login';

function App() {



  return (
    <>


      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<TableUsers />} />
          <Route path='/Login' element={<Login />} />

        </Routes>

      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
