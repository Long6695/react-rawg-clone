import React from 'react';

import NavBar from './components/navbar/NavBar';
import Home from 'pages/home/Home';
import Views from 'pages/views/Views';
import Detail from 'pages/detail/Detail';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import styled from 'styled-components';



const App = () => {
  return (
    <Container>
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route path="/views" element={<Views/>}/>
          <Route path="/detail/:slug" element={<Detail/>}/> 
        </Routes>
      </Router>
    </Container>
  )
}

export default App

const Container = styled.div`
  background-color: #151515;
  min-height: 100vh;
  padding: 40px
`