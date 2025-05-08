'use client';
import React, { useEffect, useState } from 'react';
import './Filter.scss';
import { fetchFilterData, FilterCategory } from '@/app/utils/filterData/filterData';
import { CiFilter } from 'react-icons/ci';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setFilters } from '@/lib/redux/jobsSlice';
import { fetchJobs } from '@/lib/redux/jobsSlice';

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.jobs);
  const [filterData, setFilterData] = useState<FilterCategory[]>([]);
  const [expanded, setExpanded] = useState<string[] | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFilterData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFilterData();
        setFilterData(data);
      } catch (err) {
        setError('Failed to load filters. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadFilterData();
  }, []);

  const toggleAccordion = (title: string) => {
    setExpanded((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title];
      }
      return [title];
    });
  };

  const handleCheckboxChange = (category: string, option: string) => {
    const updatedCategory = filters[category as keyof typeof filters] || [];
    const updatedFilters = updatedCategory.includes(option)
      ? updatedCategory.filter((item) => item !== option)
      : [...updatedCategory, option];

    dispatch(setFilters({ [category]: updatedFilters }));
    dispatch(fetchJobs()); // Trigger job fetch after filter update
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return <div className="loading">Loading filters...</div>;
  }

  return (
    <>
      <div className="onMobileFile">
        <button onClick={() => setIsFilterVisible((prev) => !prev)} className="filter-toggle-button">
          <CiFilter fontSize={25} />
          {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
        </button>
      </div>
      <div className={`filter-container ${isFilterVisible ? 'visible' : 'hidden'}`}>
        {filterData.map((category) => (
          <div key={category.title} className="filter-group">
            <h4 onClick={() => toggleAccordion(category.title)} className="filter-header">
              {category.title}
              <span
                className={`arrow ${
                  Array.isArray(expanded) && expanded.includes(category.title) ? 'expanded' : ''
                }`}
              >
                ▼
              </span>
            </h4>
            <div
              className={`filter-options ${
                Array.isArray(expanded) && expanded.includes(category.title) ? 'show' : ''
              }`}
            >
              {category.options.map((option) => (
                <label key={option.label} className="filter-option">
                  <input
                    type="checkbox"
                    checked={
                      filters[category.key as keyof typeof filters]?.includes(option.label) || false
                    }
                    onChange={() => handleCheckboxChange(category.key, option.label)}
                  />
                  <span>{option.label}</span>
                  <span className="count">({option.count})</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Filter;
