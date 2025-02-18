'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import './FindJobInput.scss';

interface Suggestion {
    id: number;
    title: string;
}

const fakeJobSuggestions: Suggestion[] = [
    { id: 1, title: 'Frontend Developer' },
    { id: 2, title: 'Backend Developer' },
    { id: 3, title: 'Full Stack Engineer' },
    { id: 4, title: 'UI/UX Designer' },
    { id: 5, title: 'Product Manager' },
    { id: 6, title: 'Data Scientist' },
    { id: 7, title: 'Digital Marketing Specialist' }
];

const fakeCountries: Suggestion[] = [
    { id: 1, title: 'United States' },
    { id: 2, title: 'United Kingdom' },
    { id: 3, title: 'Canada' },
    { id: 4, title: 'Germany' },
    { id: 5, title: 'Netherlands' },
    { id: 6, title: 'Belgium' },
    { id: 7, title: 'Australia' },
    { id: 8, title: 'India' }
];

const FindJobInput: React.FC = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [jobQuery, setJobQuery] = useState<string>('');
    const [locationQuery, setLocationQuery] = useState<string>('');
    const [jobSuggestions, setJobSuggestions] = useState<Suggestion[]>([]);
    const [countrySuggestions, setCountrySuggestions] = useState<Suggestion[]>([]);
    const [showJobSuggestions, setShowJobSuggestions] = useState<boolean>(false);
    const [showCountrySuggestions, setShowCountrySuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (jobQuery.length > 1) {
            const filteredSuggestions = fakeJobSuggestions.filter((suggestion) =>
                suggestion.title.toLowerCase().includes(jobQuery.toLowerCase())
            );
            setJobSuggestions(filteredSuggestions);
            setShowJobSuggestions(true);
        } else {
            setJobSuggestions([]);
            setShowJobSuggestions(false);
        }
    }, [jobQuery]);

    useEffect(() => {
        if (locationQuery.length > 1) {
            const filteredCountries = fakeCountries.filter((country) =>
                country.title.toLowerCase().includes(locationQuery.toLowerCase())
            );
            setCountrySuggestions(filteredCountries);
            setShowCountrySuggestions(true);
        } else {
            setCountrySuggestions([]);
            setShowCountrySuggestions(false);
        }
    }, [locationQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowJobSuggestions(false);
                setShowCountrySuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='find__job__container' ref={inputRef}>
            <div className="find__job__input">
                <label>
                    <CiSearch />
                    <input
                        type="search"
                        placeholder="Job title, Keyword..."
                        value={jobQuery}
                        onChange={(e) => setJobQuery(e.target.value)}
                        onFocus={() => setShowJobSuggestions(true)}
                    />
                </label>
                <label className='hide__on__mobile'>
                    <IoLocationOutline />
                    <input
                        type="search"
                        placeholder="Location"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        onFocus={() => setShowCountrySuggestions(true)}
                    />
                </label>
                <button>{isHome ? 'Find Job' : 'Search'}</button>
            </div>

            {(showJobSuggestions || showCountrySuggestions) && (
                <div className="suggestions__container">
                    {showJobSuggestions && jobSuggestions.length > 0 && (
                        <div className="job__suggestions">
                            {jobSuggestions.map((suggestion) => (
                                <div key={suggestion.id} className="suggestion-item" onClick={() => {
                                    setJobQuery(suggestion.title);
                                    setShowJobSuggestions(false);
                                }}>
                                    {suggestion.title}
                                </div>
                            ))}
                        </div>
                    )}

                    {showCountrySuggestions && countrySuggestions.length > 0 && (
                        <div className="location__suggestions">
                            {countrySuggestions.map((country) => (
                                <div key={country.id} className="suggestion-item" onClick={() => {
                                    setLocationQuery(country.title);
                                    setShowCountrySuggestions(false);
                                }}>
                                    {country.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {(!showJobSuggestions && !showCountrySuggestions) && (
                 <p>
                 Suggestion: UI/UX Designer, Programming, <span>Digital Marketing</span>, Video, Animation.
             </p>
            )}
        </div>
    );
};

export default FindJobInput;
