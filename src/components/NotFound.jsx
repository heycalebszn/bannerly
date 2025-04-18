import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <Navbar />
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Footer />
    </div>
  )
}

export default NotFound
