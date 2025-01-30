import React from 'react'
import FindJobInput from '../FindJobInput/FindJobInput'
import "./JobSearch.scss"

const JobSearch = () => {
  return (
    <div className='jobs__page'>
    <div className='jobs__wrapper'>
       <h1>Jobs</h1>
       <p>Search for your desired job matching your skills</p>

       <div className='jobs___search'>
         <FindJobInput/>
       </div>
    </div>
    </div>
  )
}

export default JobSearch
