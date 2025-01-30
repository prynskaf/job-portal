import React from 'react'
import Header from './Components/Header/Header'
import FeatueredJobs from './Components/FeatueredJobs/FeatueredJobs'

const Home = () => {
  return (
    <div className="home-wrapper">
      <Header/>
      <FeatueredJobs/>
    </div>
  )
}

export default Home
