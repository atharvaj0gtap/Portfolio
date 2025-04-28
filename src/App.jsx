import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App