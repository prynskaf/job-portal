'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchJobTitleSuggestions, fetchLocationSuggestions, setSearchQuery, fetchJobs } from '@/lib/redux/jobsSlice';
import { debounce } from 'lodash';
import { CiSearch } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';
import './FindJobInput.scss';

const FindJobInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const { titleSuggestions, locationSuggestions, searchQuery } = useAppSelector(state => state.jobs);

    const [jobQuery, setJobQuery] = useState(searchQuery.jobTitle);
    const [locationQuery, setLocationQuery] = useState(searchQuery.location);
    const [showJobSuggestions, setShowJobSuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [isSearching, setIsSearching] = useState(false);


    const router = useRouter();
    const pathname = usePathname();

    // Debounced fetch for suggestions only
    const fetchJobSuggestionsDebounced = debounce((query: string) => {
        dispatch(fetchJobTitleSuggestions(query));
    }, 200);

    const fetchLocationSuggestionsDebounced = debounce((query: string) => {
        dispatch(fetchLocationSuggestions(query));
    }, 200);

    // Handle job input change (instant update, debounce fetch)
    const handleJobQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setJobQuery(value);
        setShowJobSuggestions(value.length > 0);
        fetchJobSuggestionsDebounced(value);
    };

    // Handle location input change (instant update, debounce fetch)
    const handleLocationQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocationQuery(value);
        setShowLocationSuggestions(value.length > 0);
        fetchLocationSuggestionsDebounced(value);
    };

    const handleInputFocus = (field: 'job' | 'location') => {
        if (field === 'job') setShowJobSuggestions(true);
        if (field === 'location') setShowLocationSuggestions(true);
    };

    const clearSuggestions = () => {
        setShowJobSuggestions(false);
        setShowLocationSuggestions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                clearSuggestions();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Keep Redux state in sync with local state for query params
    useEffect(() => {
        dispatch(setSearchQuery({ jobTitle: jobQuery, location: locationQuery }));
        const queryParams = new URLSearchParams();
        if (jobQuery) queryParams.append('jobTitle', jobQuery);
        if (locationQuery) queryParams.append('location', locationQuery);
        router.replace(`${pathname}?${queryParams.toString()}`);
    }, [jobQuery, locationQuery, dispatch, pathname, router]);

    const handleSuggestionClick = (value: string, type: 'job' | 'location') => {
        if (type === 'job') {
            setJobQuery(value);
            setShowJobSuggestions(false);
        } else {
            setLocationQuery(value);
            setShowLocationSuggestions(false);
        }
        clearSuggestions();
    };

    // Accurate search: update Redux state, then fetch jobs
    const handleSearch = async () => {
        if (!jobQuery && !locationQuery) return;

        setIsSearching(true); // start local loading

        dispatch(setSearchQuery({ jobTitle: jobQuery, location: locationQuery }));
        await dispatch(fetchJobs()); // wait for the jobs to be fetched

        const queryParams = new URLSearchParams();
        if (jobQuery) queryParams.append('jobTitle', jobQuery);
        if (locationQuery) queryParams.append('location', locationQuery);

        router.push(`/jobs?${queryParams.toString()}`);
        setIsSearching(false); // stop loading after navigation
    };

    return (
        <div className='find__job__container' ref={inputRef}>
            <div className="find__job__input">
                <label>
                    <CiSearch />
                    <input
                        type="search"
                        placeholder="Job title, Keyword..."
                        value={jobQuery}
                        onChange={handleJobQueryChange}
                        onFocus={() => handleInputFocus('job')}
                    />
                </label>
                <label className='hide__on__mobile'>
                    <IoLocationOutline />
                    <input
                        type="search"
                        placeholder="Location"
                        value={locationQuery}
                        onChange={handleLocationQueryChange}
                        onFocus={() => handleInputFocus('location')}
                    />
                </label>
                <button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                </button>

            </div>
            {(showJobSuggestions || showLocationSuggestions) && (
                <div className="suggestions__container">
                    {showJobSuggestions && (
                        <div className="job__suggestions">
                            {titleSuggestions.length > 0 ? (
                                titleSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(suggestion, 'job')}
                                    >
                                        {suggestion}
                                    </div>
                                ))
                            ) : (
                                <p>No job titles found</p>
                            )}
                        </div>
                    )}
                    {showLocationSuggestions && (
                        <div className="location__suggestions">
                            {locationSuggestions.length > 0 ? (
                                locationSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(suggestion, 'location')}
                                    >
                                        {suggestion}
                                    </div>
                                ))
                            ) : (
                                <p>No locations found</p>
                            )}
                        </div>
                    )}
                </div>
            )}
            {(!showJobSuggestions && !showLocationSuggestions) && (
                <p>
                    Suggestion: UI/UX Designer, Programming, <span>Digital Marketing</span>, Video, Animation.
                </p>
            )}
        </div>
    );
};

export default FindJobInput;

