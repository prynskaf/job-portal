import React from 'react'
import AboutHeader from '../Components/AboutUs/AboutHeader/AboutHeader'
import Insight from '../Components/AboutUs/Insight/Insight'
import OurTeam from '../Components/AboutUs/OurTeam/OurTeam'
import OurMission from '../Components/AboutUs/OurMission/OurMission'

const AboutPage = () => {
  return (
    <div>
     <AboutHeader />
     <OurMission />
     <Insight/>
     <OurTeam />
    </div>
  )
}

export default AboutPage
