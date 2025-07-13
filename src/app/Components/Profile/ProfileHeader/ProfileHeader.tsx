'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ProfileHeader.scss';
import CountUp from 'react-countup';
import { FaCamera } from 'react-icons/fa';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import { toast } from 'sonner';

const ProfileHeader = () => {
  const [profilePic, setProfilePic] = useState<string>('/profilePic/profilePic.png');
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    savedJobs: 0,
    appliedJobs: 0,
  });

  const currentUserUidRef = useRef<string | null>(null); // ✅ ref to persist uid

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          savedJobs: data.savedJobs?.length || 0,
          appliedJobs: data.appliedJobs?.length || 0,
        });

        if (data.profilePic) {
          setProfilePic(data.profilePic);
        }
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUserUidRef.current = user.uid;
        fetchUserData(user.uid);
      }
    });

    const handleSavedJobsChange = () => {
      if (currentUserUidRef.current) {
        fetchUserData(currentUserUidRef.current);
      }
    };

    window.addEventListener('savedJobsChanged', handleSavedJobsChange);

    return () => {
      unsubscribeAuth();
      window.removeEventListener('savedJobsChanged', handleSavedJobsChange);
    };
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && auth.currentUser) {
      if (!file.type.match('image.*')) {
        toast.error('Only image files are allowed');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File is too large. Maximum size is 5MB');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'job_portal_upload_preset');

      const loadingToastId = toast.loading('Uploading...');

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
          const downloadURL = data.secure_url;

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            profilePic: downloadURL,
          });

          setProfilePic(downloadURL);
          window.dispatchEvent(new CustomEvent('profilePicChanged', { detail: downloadURL }));
          toast.success('Image uploaded successfully');
        } else {
          console.error('Upload error: secure_url not found in response', data);
          throw new Error('Failed to process uploaded image. Please try again.');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Upload failed. Please try again.');
      } finally {
        toast.dismiss(loadingToastId);
      }
    }
  };

  return (
    <div className="ProfileHeader">
      <div className="ProfileHeader__wrapper">
        <div className="header-container">
          <div className="profile-info">
            <div className="profile-info__avatar-container">
              <Image
                src={profilePic}
                alt="Profile"
                className="profile-info__avatar"
                width={100}
                height={100}
                priority
              />
              <label className="camera-icon">
                <FaCamera />
                <input type="file" accept="image/*" onChange={handleImageChange} />
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
