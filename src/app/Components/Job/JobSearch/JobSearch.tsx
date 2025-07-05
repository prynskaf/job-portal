'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setSearchQuery, setFilters, resetFilters, fetchJobs } from '@/lib/redux/jobsSlice';

import './JobSearch.scss';
import Filter from '../Filter/Filter';
import JobListings from '../JobListings/JobListings';
import Dropdown from '../Dropdown/Dropdown';
import FindJobInput from '../FindJobInput/FindJobInput';

const JobSearch = () => {
  const dispatch = useAppDispatch();
  const allJobs = useAppSelector((state) => state.jobs.allJobs); // 👈 Get total jobs

  const handleClear = () => {
    dispatch(resetFilters());
    dispatch(setSearchQuery({ jobTitle: '', location: '' }));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'newest' || value === 'oldest') {
      dispatch(setFilters({ sortBy: value }));
      dispatch(fetchJobs());
    }
  };

  return (
    <div className='jobs__page'>
      <div className='jobs__wrapper'>
        <h1>Jobs</h1>
        <p>Search for your desired job matching your skills</p>

        <div className='jobs___search'>
          <FindJobInput />
        </div>

        <div className="actions">
          <h2>Filter</h2>
          <div className='clear__btn'>
            <button onClick={handleClear}>clear</button>
            <h2>All Jobs ({allJobs.length})</h2> {/* ✅ Dynamic count */}
          </div>
          <Dropdown onChange={handleDropdownChange} />
        </div>

        <div className="Filter__wrapper">
          <div className="LeftSidebar">
            <Filter />
          </div>
          <div className='RightSection'>
            <JobListings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
