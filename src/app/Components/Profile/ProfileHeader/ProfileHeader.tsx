'use client'
import React, { useState, useEffect } from 'react';
import './ProfileHeader.scss';
import Image from 'next/image';
import CountUp from 'react-countup';
import { FaCamera } from 'react-icons/fa';
import { auth, db, storage } from '@/lib/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProfileHeader = () => {
    const [profilePic, setProfilePic] = useState('/profilePic/profilePic.svg');
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && auth.currentUser) {
            const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error('Upload error:', error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setProfilePic(downloadURL);
                    if (auth.currentUser) {
                        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                            profilePic: downloadURL,
                        });
                    }
                }
            );
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