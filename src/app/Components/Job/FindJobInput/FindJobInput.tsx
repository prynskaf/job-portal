'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchJobTitleSuggestions, fetchLocationSuggestions, setSearchQuery, fetchJobs } from '@/lib/redux/jobsSlice';
import { debounce } from 'lodash'; // Use lodash for debouncing
import { CiSearch } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname from next/navigation
import './FindJobInput.scss';

const FindJobInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const { titleSuggestions, locationSuggestions, searchQuery, isLoading } = useAppSelector(state => state.jobs);

    const [jobQuery, setJobQuery] = useState(searchQuery.jobTitle);
    const [locationQuery, setLocationQuery] = useState(searchQuery.location);

    const [showJobSuggestions, setShowJobSuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [focusedField, setFocusedField] = useState<null | 'job' | 'location'>(null); // Track focused field
    const inputRef = useRef<HTMLDivElement | null>(null);

    const router = useRouter(); // Initialize useRouter from next/navigation
    const pathname = usePathname(); // Get current path

    const [localSearchQuery, setLocalSearchQuery] = useState({ jobTitle: '', location: '' });
    const [debouncedQuery, setDebouncedQuery] = useState(localSearchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(localSearchQuery);
        }, 500); // 500ms debounce

        return () => clearTimeout(handler);
    }, [localSearchQuery]);

    useEffect(() => {
        dispatch(setSearchQuery(debouncedQuery));
        dispatch(fetchJobs());
    }, [debouncedQuery, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalSearchQuery((prev) => ({ ...prev, [name]: value }));
    };

    const handleJobQueryChange = debounce((query: string) => {
        setJobQuery(query);
        dispatch(fetchJobTitleSuggestions(query));
        setShowJobSuggestions(query.length > 0);
    }, 200);

    const handleLocationQueryChange = debounce((query: string) => {
        setLocationQuery(query);
        dispatch(fetchLocationSuggestions(query));
        setShowLocationSuggestions(query.length > 0);
    }, 200);

    const handleInputFocus = (field: 'job' | 'location') => {
        if (focusedField !== field) { // Only show suggestions if different field is focused
            setFocusedField(field);
            if (field === 'job') setShowJobSuggestions(true);
            if (field === 'location') setShowLocationSuggestions(true);
        }
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

    useEffect(() => {
        // When the job or location query changes, update the search query in the Redux store
        dispatch(setSearchQuery({ jobTitle: jobQuery, location: locationQuery }));

        // Update the URL query parameters based on the current input values
        const queryParams = new URLSearchParams();
        if (jobQuery) queryParams.append('jobTitle', jobQuery);
        if (locationQuery) queryParams.append('location', locationQuery);

        // If jobQuery or locationQuery is empty, remove that parameter from the URL
        if (!jobQuery) queryParams.delete('jobTitle');
        if (!locationQuery) queryParams.delete('location');

        // Update the URL with the new query parameters
        router.replace(`${pathname}?${queryParams.toString()}`);
    }, [jobQuery, locationQuery, dispatch, pathname, router]);

    const handleSuggestionClick = (value: string, type: 'job' | 'location') => {
        if (type === 'job') {
            setJobQuery(value);
        } else {
            setLocationQuery(value);
        }

        clearSuggestions();
    };

    const handleSearch = () => {
        if (!jobQuery && !locationQuery) return;

        const queryParams = new URLSearchParams();
        if (jobQuery) queryParams.append('jobTitle', jobQuery);
        if (locationQuery) queryParams.append('location', locationQuery);

        router.push(`/jobs?${queryParams.toString()}`);
        dispatch(setSearchQuery({ jobTitle: jobQuery, location: locationQuery }));
        dispatch(fetchJobs()); // Trigger job fetch
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
                        onChange={(e) => handleJobQueryChange(e.target.value)}
                        onFocus={() => handleInputFocus('job')}
                    />
                </label>
                <label className='hide__on__mobile'>
                    <IoLocationOutline />
                    <input
                        type="search"
                        placeholder="Location"
                        value={locationQuery}
                        onChange={(e) => handleLocationQueryChange(e.target.value)}
                        onFocus={() => handleInputFocus('location')}
                    />
                </label>

                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Search'}
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
