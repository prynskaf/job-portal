"use client"
import React, { useState } from 'react';
import './Signup.scss';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from "next/link";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebaseAuth";
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!validatePhoneNumber(mobileNumber)) {
      setError('Invalid phone number');
      return;
    }
    setError('');
    const user = await signUpWithEmail(email, password, fullName, mobileNumber);
    if (user) {
      console.log('User signed up:', user);
      router.push('/');
    }
  };

  const handleGoogleSignup = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log('User signed up with Google:', user);
      router.push('/');
    }
  };

  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__content">
          <div className="signup__form">
            <h2>Registration form</h2>
            <p>Register to apply for jobs of your choice all over the world</p>

            <form onSubmit={handleSignup}>
              <label>Full name<span>*</span></label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <label>Email ID<span>*</span></label>
              <input
                type="email"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="input-note">Job notifications will be sent to this email id</p>

              <label>Password<span>*</span></label>
              <input
                type="password"
                placeholder="(Minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Mobile number<span>*</span></label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <p className="input-note">Recruiters will contact you on this number</p>

              {error && <p className="error">{error}</p>}

              <p className="terms">
                By clicking Register, you agree to the <Link href="#">Terms and Conditions</Link> & <a href="#">Privacy Policy</a> of AlwaysApply.com
              </p>

              <button type="submit" className="signup__button">Register now</button>
            </form>

            <div className="signup__social">
              <p className="divider"><span>or signup with</span></p>
              <div className="social-icons">
                <button onClick={handleGoogleSignup}><FaGoogle size={24} color="#DB4437" /></button>
                <button><FaFacebookF size={24} color="#1877F2" /></button>
                <button><FaLinkedinIn size={24} color="#0A66C2" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
