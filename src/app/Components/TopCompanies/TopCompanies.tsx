import { topCompaniesIcons } from '@/app/utils/topCompaniesIcon/icons'
import Image from 'next/image'
import React from 'react'
import './TopCompanies.scss'

const TopCompanies = () => {
  return (
    <div className='top__companies'>
        <div className="top__companies__wrapper">
        <div className='top__companies__header'>
            <div className='line'></div>
            <h2>Top companies hiring now</h2>
            <div className='line'></div>
        </div>
        
        <div className='compaines__icons'>
          {topCompaniesIcons.map((icons) => (
            <Image  key={icons.alt} src={icons.icon} alt={icons.alt} height={120} width={120}/>
          ) )}  
        </div>
        </div>
  
    </div>
  )
}

export default TopCompanies
