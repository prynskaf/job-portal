'use client';
import React, { useState } from 'react';
import './Filter.scss';
import { filterData } from '@/app/utils/filterData/filterData';
import { CiFilter } from 'react-icons/ci';

const Filter: React.FC = () => {
  const [expanded, setExpanded] = useState<string[] | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false); 

  const toggleAccordion = (title: string) => {
    setExpanded((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title];
      }
      return [title];
    });
  };

  const expandAll = () => {
    const allTitles = filterData.map((category) => category.title);
    setExpanded(allTitles);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <>
      <div className="onMobileFile">
        <button onClick={toggleFilterVisibility} className="filter-toggle-button">
          <CiFilter fontSize={25} />
          {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
        </button>
      </div>
      <div
        className={`filter-container ${isFilterVisible ? 'visible' : 'hidden'}`}
      >
        {/* Salary Range */}
        <div className="filter-group salary-range">
          <h4 className="salary-range-title">Salary Range</h4>
          <div className="salary-inputs">
            <input
              type="number"
              placeholder="Min"
              className="salary-input"
              aria-label="Minimum Salary"
            />
            <input
              type="number"
              placeholder="Max"
              className="salary-input"
              aria-label="Maximum Salary"
            />
          </div>
        </div>

        {/* Dynamic Filter Categories */}
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
                  <input type="checkbox" />
                  <span>{option.label}</span>
                  <span className="count">({option.count})</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="expand-all" onClick={expandAll}>
          Expand all
        </button>
      </div>
    </>
  );
};

export default Filter;
