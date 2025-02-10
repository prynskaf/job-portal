import React from 'react'
import ProfileHeader from '../Components/Profile/ProfileHeader/ProfileHeader'
import AppliedJobs from '../Components/Profile/AppliedJobs/AppliedJobs'
import SavedJobs from '../Components/Profile/SavedJobs/SavedJobs'

const profilePage = () => {
  return (
    <div>
     <ProfileHeader/>
     <AppliedJobs/>
     <SavedJobs/>
    </div>
  )
}

export default profilePage
