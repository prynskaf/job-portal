'use client'
import React, { useState, useEffect } from 'react';
import './ProfileHeader.scss';
// import { CldImage } from 'next-cloudinary';
import CountUp from 'react-countup';
import { FaCamera } from 'react-icons/fa';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';

const ProfileHeader = () => {
    // const [profilePic, setProfilePic] = useState('https://res.cloudinary.com/dbbn1ttol/image/upload/v1616161616/sample.jpg');
    const [profilePic, setProfilePic] = useState<string>('/profilePic/profilePic.png'); // Default profile picture
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        savedJobs: 0,
        appliedJobs: 0,
    });

    useEffect(() => {
        const fetchUserData = async (uid: string) => {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserData({
                    fullName: data.fullName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    savedJobs: data.savedJobs.length,
                    appliedJobs: data.appliedJobs.length,
                });
                if (data.profilePic) {
                    setProfilePic(data.profilePic);
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && auth.currentUser) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'job_portal_upload_preset');

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log('Cloudinary response:', data);

                if (data.secure_url) {
                    const downloadURL = data.secure_url;
                    setProfilePic(downloadURL);

                    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                        profilePic: downloadURL,
                    });
                } else {
                    console.error('Upload error: secure_url not found in response');
                }
            } catch (error) {
                console.error('Upload error:', error);
            }
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
                                // crop="fill"
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
                            <h2 className="profile-info__name">{userData.fullName}</h2>
                            <p className="profile-info__email">{userData.email}</p>
                            <p className="profile-info__phone">{userData.phoneNumber}</p>
                        </div>
                    </div>

                    <div className="job-stats">
                        <div className="job-stats__item">
                            <p>Saved Jobs</p>
                            <h3>
                                <CountUp start={0} end={userData.savedJobs} duration={2.5} separator="," />+ 
                            </h3>
                        </div>
                        <div className="job-stats__item">
                            <p>Applied Jobs</p>
                            <h3>
                                <CountUp start={0} end={userData.appliedJobs} duration={2.5} separator="," />+
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;