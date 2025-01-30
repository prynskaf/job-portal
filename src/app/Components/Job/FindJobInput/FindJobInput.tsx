'use client'
import React from 'react';
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import './FindJobInput.scss';
import { IoLocationOutline } from 'react-icons/io5';

const FindJobInput = () => {
    const pathname = usePathname(); 
    const isHome = pathname === '/';
    return (
        <div className='find__job__container'>
            <div className="find__job__input">
                <label>
                    <CiSearch />
                    <input type="text" placeholder="Job title, Keyword..." />
                </label>
                <label className='hide__on__mobile'>
                    <IoLocationOutline />
                    <input type="text" placeholder="Location" />
                </label>
                <button>{isHome ? "Find Job" : "Search"}</button>
            </div>
            <p>
                Suggestion: UI/UX Designer, Programming, <span>Digital Marketing</span>, Video, Animation.
            </p>
        </div>
    );
};

export default FindJobInput;
