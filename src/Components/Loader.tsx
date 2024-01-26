import React from 'react'
import logo from "/logo.png"

// For user side pages
const LoaderOne:React.FC = () => {
  
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center left-0 top-0 z-30">
        <img
          src={logo}
          alt="..Loading"
          className="w-[2rem] animate-spin"
        />
      </div>
    );
  }


export default LoaderOne