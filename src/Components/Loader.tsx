import React from 'react'
import logo from "../assets/Images/logo.png"

// For user side pages
const LoaderOne:React.FC = () => {
  
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center">
        <img
          src={logo}
          alt="..Loading"
          className="w-[2rem] animate-spin"
        />
      </div>
    );
  }
  

export default LoaderOne