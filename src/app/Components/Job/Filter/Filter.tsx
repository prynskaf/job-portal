'use client'
import React, { useState } from 'react'
import './Filter.scss'

const Filter = () => {
    // const [selectedFilters, setSelectedFilters] = useState({
    //   jobType: [],
    //   workMode: [],
    //   experienceLevel: [],
    // });
  
    // const handleCheckboxChange = (category: string, value: string) => {
    //   setSelectedFilters((prev) => ({
    //     ...prev,
    //     [category]: prev[category].includes(value)
    //       ? prev[category].filter((item) => item !== value)
    //       : [...prev[category], value],
    //   }));
    // };
  
    return (
      <div className="filter-container">
        <h3>Filter</h3>
        <button className="clear-all">Clear all</button>
  
        <div className="filter-group">
          <h4>Job Type</h4>
          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                // onChange={() => handleCheckboxChange("jobType", type)}
                // checked={selectedFilters.jobType.includes(type)}
              />
              {type}
            </label>
          ))}
        </div>
  
        <div className="filter-group">
          <h4>Work Mode</h4>
          {["On-site", "Remote", "Hybrid"].map((mode) => (
            <label key={mode}>
              <input
                type="checkbox"
                // onChange={() => handleCheckboxChange("workMode", mode)}
                // checked={selectedFilters.workMode.includes(mode)}
              />
              {mode}
            </label>
          ))}
        </div>
  
        <div className="filter-group">
          <h4>Experience Level</h4>
          {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
            <label key={level}>
              <input
                type="checkbox"
                // onChange={() => handleCheckboxChange("experienceLevel", level)}
                // checked={selectedFilters.experienceLevel.includes(level)}
              />
              {level}
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default Filter;