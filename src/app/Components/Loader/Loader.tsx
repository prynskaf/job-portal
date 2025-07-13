import Image from 'next/image'
import React from 'react'
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="joblistings__loader-overlay">
      <Image 
      src="/Loader/loading.gif" 
      alt="Loading..." 
      width={50} 
      height={50} 
      unoptimized  />
    </div>
  )
}

export default Loader
