'use client';
import React, { useState } from 'react';
import './Filter.scss';
import { fetchFilterData, FilterCategory } from '@/app/utils/filterData/filterData';
import { CiFilter } from 'react-icons/ci';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setFilters, fetchJobs } from '@/lib/redux/jobsSlice';

const titles = ['Job Type', 'Work Mode', 'Job Functions', 'Experience Level'];

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.jobs);

  const [filterData, setFilterData] = useState<FilterCategory[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [fetched, setFetched] = useState<string[]>([]);
  const [loadingTitles, setLoadingTitles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleAccordion = async (title: string) => {
    const isOpen = expanded.includes(title);

    setExpanded((prev) =>
      isOpen ? prev.filter((item) => item !== title) : [...prev, title]
    );

    if (!fetched.includes(title)) {
      setLoadingTitles((prev) => [...prev, title]);

      try {
        const allData = await fetchFilterData();
        const category = allData.find((cat) => cat.title === title);
        if (category) {
          setFilterData((prev) => [...prev, category]);
          setFetched((prev) => [...prev, title]);
        }
      } catch (err) {
        setErrors((prev) => ({ ...prev, [title]: 'Failed to load this filter group.' }));
      } finally {
        setLoadingTitles((prev) => prev.filter((t) => t !== title));
      }
    }
  };

  const handleCheckboxChange = (category: string, option: string) => {
    const updatedCategory = filters[category as keyof typeof filters] || [];
    const updatedFilters = updatedCategory.includes(option)
      ? updatedCategory.filter((item) => item !== option)
      : [...updatedCategory, option];

    dispatch(setFilters({ [category]: updatedFilters }));
    dispatch(fetchJobs());
  };

  return (
    <>
      <div className="onMobileFile">
        <button onClick={() => setIsFilterVisible((prev) => !prev)} className="filter-toggle-button">
          <CiFilter fontSize={25} />
          {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
        </button>
      </div>

      <div className={`filter-container ${isFilterVisible ? 'visible' : 'hidden'}`}>
        {titles.map((title) => {
          const category = filterData.find((cat) => cat.title === title);
          const isOpen = expanded.includes(title);
          const isLoading = loadingTitles.includes(title);
          const error = errors[title];

          return (
            <div key={title} className="filter-group">
              <h4 onClick={() => toggleAccordion(title)} className="filter-header">
                {title}
                <span className={`arrow ${isOpen ? 'expanded' : ''}`}>▼</span>
              </h4>

              {isOpen && (
                <div className="filter-options show">
                  {isLoading && <div className="loading">Loading...</div>}
                  {error && <div className="error">{error}</div>}
                  {!isLoading && category?.options.map((option) => (
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
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
