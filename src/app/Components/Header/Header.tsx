import React from 'react'
import "./Header.scss"
import Image from 'next/image'
import FindJobInput from '../Job/FindJobInput/FindJobInput'

const Header = () => {
  return (
    <section className='header__container'>
      <div className="header__wrapper">
        
        <div className="header__content">
        <div className="header__description">
            <h1>Find a job that aligns with your interests and skills</h1>
            <p>Thousands of jobs in all the leading sector are waiting for you.</p>
         
        </div>
        <div className="header__image ">
            <Image src="/header/headerSvg.svg" alt="headerSvg" width={500} height={500}  />
        </div>
        </div>
       
       <div className="find__job">
        <FindJobInput/>
       </div>
      </div>
    </section>
  )
}

export default Header
