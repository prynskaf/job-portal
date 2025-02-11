'use client'
import React from 'react';
import './ProfileHeader.scss';
import Image from 'next/image';
import CountUp from 'react-countup';

const ProfileHeader = () => {
    return (
        <div className="ProfileHeader">
            <div className="ProfileHeader__wrapper">
                {/* Profile Info */}
                 <div className='header-container'>
                <div className="profile-info">
                    <Image
                        src="/profilePic/profilePic.svg"
                        alt="Profile"
                        className="profile-info__avatar"
                        width={100}
                        height={100}
                    />
                    <div className="profile-info__details">
                        <h2 className="profile-info__name">John Doe</h2>
                        <p className="profile-info__email">Johndoe@gmail.com</p>
                        <p className="profile-info__phone">+32 478 554 20</p>
                    </div>
                </div>

                {/* Job Stats */}
                <div className="job-stats">
                    <div className="job-stats__item">
                        <p>Saved Jobs</p>
                        <h3>
                        <CountUp start={0} end={500} duration={2.5} separator="," />+ 
                        </h3>
                    </div>
                    <div className="job-stats__item">
                        <p>Applied Jobs</p>
                        <h3>
                            <CountUp start={0} end={20} duration={2.5} separator="," />+
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProfileHeader;
