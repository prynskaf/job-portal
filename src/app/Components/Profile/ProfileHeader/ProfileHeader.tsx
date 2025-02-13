'use client'
import React, { useState } from 'react';
import './ProfileHeader.scss';
import Image from 'next/image';
import CountUp from 'react-countup';
import { FaCamera } from 'react-icons/fa';

const ProfileHeader = () => {
    const [profilePic, setProfilePic] = useState('/profilePic/profilePic.svg');

    const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };

    return (
        <div className="ProfileHeader">
            <div className="ProfileHeader__wrapper">
                <div className='header-container'>
                    <div className="profile-info">
                        <div className="profile-info__avatar-container">
                            <Image
                                src={profilePic}
                                alt="Profile"
                                className="profile-info__avatar"
                                width={100}
                                height={100}
                            />
                            <label className="camera-icon">
                                <FaCamera />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <div className="profile-info__details">
                            <h2 className="profile-info__name">John Doe</h2>
                            <p className="profile-info__email">Johndoe@gmail.com</p>
                            <p className="profile-info__phone">+32 478 554 20</p>
                        </div>
                    </div>

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
