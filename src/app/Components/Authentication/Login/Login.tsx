"use client"
import React, { useState } from 'react';
import './Login.scss';
import Image from 'next/image';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from "next/link";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebaseAuth";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = await signInWithEmail(email, password);
    if (user) {
      console.log('User logged in:', user);
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log('User logged in with Google:', user);
      router.push('/');
    }
  };

  return (
    <div className="login">
      <div className="loggin__wrapper">
        <div className="login__content">
          <div className="login__form">
            <div className="login__header">
              <h2>Login to your Account</h2>
              <p>Welcome back! Select the below login methods.</p>
            </div>

            <form onSubmit={handleLogin}>
              <label>Email ID / Username</label>
              <input
                type="text"
                placeholder="Enter email id / username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="show-password"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <div className="login__options">
                <Link href="#">Forgot Password?</Link>
              </div>

              {error && <p className="error">{error}</p>}

              <button type="submit" className="login__button">Login</button>
            </form>

            <div className="login__divider">
              <span>or login with</span>
            </div>

            <div className="social-icons">
              <button onClick={handleGoogleLogin}>
                <FaGoogle size={24} color="#DB4437" />
              </button>
              <button>
                <FaFacebookF size={24} color="#1877F2" />
              </button>
              <button>
                <FaLinkedinIn size={24} color="#0A66C2" />
              </button>
            </div>

            <p className="register-link">
              Don&#39;t have an account? <Link href="/signup">Register</Link>
            </p>
          </div>

          <div className="login__illustration">
            <Image src="/loginLogo/loginLogo.svg" alt="Illustration" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
