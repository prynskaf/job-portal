
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
// import { fetchJobTitleSuggestions, fetchLocationSuggestions, setSearchQuery } from '@/lib/redux/jobsSlice';
// import { debounce } from 'lodash'; // Use lodash for debouncing
// import { CiSearch } from 'react-icons/ci';
// import { IoLocationOutline } from 'react-icons/io5';
// import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname from next/navigation
// import './FindJobInput.scss';

// const FindJobInput: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { titleSuggestions, locationSuggestions, searchQuery } = useAppSelector(state => state.jobs);

//     const [jobQuery, setJobQuery] = useState(searchQuery.jobTitle);
//     const [locationQuery, setLocationQuery] = useState(searchQuery.location);

//     const [showJobSuggestions, setShowJobSuggestions] = useState(false);
//     const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); // Loading state for the button

//     const router = useRouter(); // Initialize useRouter from next/navigation
//     const pathname = usePathname(); // Get the current path

//     const handleJobQueryChange = debounce((query: string) => {
//         setJobQuery(query);
//         dispatch(fetchJobTitleSuggestions(query));
//         setShowJobSuggestions(query.length > 0);
//     }, 300);

//     const handleLocationQueryChange = debounce((query: string) => {
//         setLocationQuery(query);
//         dispatch(fetchLocationSuggestions(query));
//         setShowLocationSuggestions(query.length > 0);
//     }, 300);

//     const handleInputFocus = (field: string) => {
//         if (field === 'job') setShowJobSuggestions(true);
//         if (field === 'location') setShowLocationSuggestions(true);
//     };

//     const clearSuggestions = () => {
//         // Prevent clearing immediately after clicking a suggestion
//         setTimeout(() => {
//             setShowJobSuggestions(false);
//             setShowLocationSuggestions(false);
//         }, 200);
//     };

//     useEffect(() => {
//         dispatch(setSearchQuery({ jobTitle: jobQuery, location: locationQuery }));
//     }, [jobQuery, locationQuery, dispatch]);

//     const handleSuggestionClick = (value: string, type: 'job' | 'location') => {
//         if (type === 'job') {
//             setJobQuery(value);
//         } else {
//             setLocationQuery(value);
//         }

//         // Keep suggestions visible for a moment after selection
//         clearSuggestions();
//     };

//     const handleSearch = () => {
//         if (!jobQuery && !locationQuery) return; // Optionally handle empty input

//         setIsLoading(true); // Show loading spinner

//         // Use URLSearchParams to format query parameters properly
//         const queryParams = new URLSearchParams();
//         if (jobQuery) queryParams.append('jobTitle', jobQuery);
//         if (locationQuery) queryParams.append('location', locationQuery);

//         // Redirect after a slight delay if on the homepage
//         if (pathname === '/') {
//             setTimeout(() => {
//                 router.push(`/jobs?${queryParams.toString()}`);
//             }, 500); // Set a small delay for the loading spinner
//         } else {
//             // If not on the homepage, just navigate without delay
//             router.push(`/jobs?${queryParams.toString()}`);
//         }
//     };

//     return (
//         <div className='find__job__container'>
//             <div className="find__job__input">
//                 <label>
//                     <CiSearch />
//                     <input
//                         type="search"
//                         placeholder="Job title, Keyword..."
//                         value={jobQuery}
//                         onChange={(e) => handleJobQueryChange(e.target.value)}
//                         onFocus={() => handleInputFocus('job')}
//                         onBlur={clearSuggestions}
//                     />
//                 </label>
//                 <label className='hide__on__mobile'>
//                     <IoLocationOutline />
//                     <input
//                         type="search"
//                         placeholder="Location"
//                         value={locationQuery}
//                         onChange={(e) => handleLocationQueryChange(e.target.value)}
//                         onFocus={() => handleInputFocus('location')}
//                         onBlur={clearSuggestions}
//                     />
//                 </label>

//                 <button onClick={handleSearch} disabled={isLoading}>
//                     {isLoading ? 'Loading...' : 'Search'}
//                 </button>
//             </div>

//             {(showJobSuggestions || showLocationSuggestions) && (
//                 <div className="suggestions__container">
//                     {showJobSuggestions && titleSuggestions.length > 0 && (
//                         <div className="job__suggestions">
//                             {titleSuggestions.map((suggestion, index) => (
//                                 <div
//                                     key={index}
//                                     className="suggestion-item"
//                                     onClick={() => handleSuggestionClick(suggestion, 'job')}
//                                 >
//                                     {suggestion}
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {showLocationSuggestions && locationSuggestions.length > 0 && (
//                         <div className="location__suggestions">
//                             {locationSuggestions.map((suggestion, index) => (
//                                 <div
//                                     key={index}
//                                     className="suggestion-item"
//                                     onClick={() => handleSuggestionClick(suggestion, 'location')}
//                                 >
//                                     {suggestion}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             )}

//             {(!showJobSuggestions && !showLocationSuggestions) && (
//                 <p>
//                     Suggestion: UI/UX Designer, Programming, <span>Digital Marketing</span>, Video, Animation.
//                 </p>
//             )}
//         </div>
//     );
// };

// export default FindJobInput;

'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchJobTitleSuggestions, fetchLocationSuggestions, setSearchQuery } from '@/lib/redux/jobsSlice';
import { debounce } from 'lodash'; // Use lodash for debouncing
import { CiSearch } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname from next/navigation
import './FindJobInput.scss';

const FindJobInput: React.FC = () => {
    const dispatch = useAppDispatch();
    const { titleSuggestions, locationSuggestions, searchQuery } = useAppSelector(state => state.jobs);

    const [jobQuery, setJobQuery] = useState(searchQuery.jobTitle);
    const [locationQuery, setLocationQuery] = useState(searchQuery.location);

    const [showJobSuggestions, setShowJobSuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state for the button

    const router = useRouter(); // Initialize useRouter from next/navigation
    const pathname = usePathname(); // Get the current path

    const handleJobQueryChange = debounce((query: string) => {
        setJobQuery(query);
        dispatch(fetchJobTitleSuggestions(query));
        setShowJobSuggestions(query.length > 0);
    }, 300);

    const handleLocationQueryChange = debounce((query: string) => {
        setLocationQuery(query);
        dispatch(fetchLocationSuggestions(query));
        setShowLocationSuggestions(query.length > 0);
    }, 300);

    const handleInputFocus = (field: string) => {
        if (field === 'job') setShowJobSuggestions(true);
        if (field === 'location') setShowLocationSuggestions(true);
    };

    const clearSuggestions = () => {
        // Prevent clearing immediately after clicking a suggestion
        setTimeout(() => {
            setShowJobSuggestions(false);
            setShowLocationSuggestions(false);
        }, 200);
    };

    useEffect(() => {
        dispatch(setSearchQuery({ jobTitle: jobQuery, location: locationQuery }));
    }, [jobQuery, locationQuery, dispatch]);

    const handleSuggestionClick = (value: string, type: 'job' | 'location') => {
        if (type === 'job') {
            setJobQuery(value);
        } else {
            setLocationQuery(value);
        }

        // Keep suggestions visible for a moment after selection
        clearSuggestions();
    };

    const handleSearch = () => {
        if (!jobQuery && !locationQuery) return; // Optionally handle empty input

        if (pathname === '/') {
            setIsLoading(true); // Show loading spinner on homepage only

            // Use URLSearchParams to format query parameters properly
            const queryParams = new URLSearchParams();
            if (jobQuery) queryParams.append('jobTitle', jobQuery);
            if (locationQuery) queryParams.append('location', locationQuery);

            // Redirect after a slight delay if on the homepage
            setTimeout(() => {
                router.push(`/jobs?${queryParams.toString()}`);
            }, 500); // Set a small delay for the loading spinner
        } else {
            // If not on the homepage (e.g., on /jobs), just navigate immediately
            const queryParams = new URLSearchParams();
            if (jobQuery) queryParams.append('jobTitle', jobQuery);
            if (locationQuery) queryParams.append('location', locationQuery);

            router.push(`/jobs?${queryParams.toString()}`);
        }
    };

    return (
        <div className='find__job__container'>
            <div className="find__job__input">
                <label>
                    <CiSearch />
                    <input
                        type="search"
                        placeholder="Job title, Keyword..."
                        value={jobQuery}
                        onChange={(e) => handleJobQueryChange(e.target.value)}
                        onFocus={() => handleInputFocus('job')}
                        onBlur={clearSuggestions}
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
                        onBlur={clearSuggestions}
                    />
                </label>

                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
            </div>

            {(showJobSuggestions || showLocationSuggestions) && (
                <div className="suggestions__container">
                    {showJobSuggestions && titleSuggestions.length > 0 && (
                        <div className="job__suggestions">
                            {titleSuggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion, 'job')}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}

                    {showLocationSuggestions && locationSuggestions.length > 0 && (
                        <div className="location__suggestions">
                            {locationSuggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion, 'location')}
                                >
                                    {suggestion}
                                </div>
                            ))}
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
