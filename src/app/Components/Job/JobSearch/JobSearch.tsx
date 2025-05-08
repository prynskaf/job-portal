'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setSearchQuery, setFilters, resetFilters } from '@/lib/redux/jobsSlice';
import './JobSearch.scss';
import Filter from '../Filter/Filter';
import JobListings from '../JobListings/JobListings';
import Dropdown from '../Dropdown/Dropdown';
import FindJobInput from '../FindJobInput/FindJobInput';

const JobSearch = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, filters } = useAppSelector((state) => state.jobs);

  const handleClear = () => {
    dispatch(resetFilters());
    dispatch(setSearchQuery({ jobTitle: '', location: '' }));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ sortBy: e.target.value }));
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
            <h2>All Jobs(100)</h2>
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
