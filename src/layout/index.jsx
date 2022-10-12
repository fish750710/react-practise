import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

export default function Layout(props) {
  const style = {
    minHeight: '500px',
  }
  return(
    <>
      <Navbar />
        <main style={style}><Outlet /></main>
      <Footer />
    </>
  )
}