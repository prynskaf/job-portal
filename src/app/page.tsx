import React from 'react'
import Header from './Components/Header/Header'
import FeatueredJobs from './Components/FeatueredJobs/FeatueredJobs'
import TopCompanies from './Components/TopCompanies/TopCompanies'

const Home = () => {
  return (
    <div className="home-wrapper">
      <Header/>
      <FeatueredJobs/>
      <TopCompanies/>
    </div>
  )
}

export default Home
