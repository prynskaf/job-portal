import React from 'react'
import "./Insight.scss"
import { BarCharComponent } from '../BarCharComponent/BarCharComponent'
import { RadarComponent } from '../Charts/RadarChartComponent/RadarComponent'
import { PieChartComponent } from '../Charts/PieChartComponent/PieChartComponent'


const Insight = () => {
  return (
    <div className="Insight">
    <div className="Insight__wrapper">

     {/* insigh header */}
    <div className="insight-header">
          <span className="badge">Insight</span>
          <h2>Market Overview</h2>
            <p>
            Stay ahead with our comprehensive market insights. We analyze industry trends,
            track in-demand skills, and monitor employment patterns to give you a clear
            view of the job market landscape.
            </p>
        </div>

        {/* market card listings */}
       <div className='market-card-listings'>
       <div className='top-industry'>
        <PieChartComponent/>
       </div>
       <div className='demanded-skills'>
        <RadarComponent/>
       </div>
       <div className='merge-trends'>
        <BarCharComponent/>
       </div>
       </div>
    </div>
  </div>
  )
}

export default Insight
