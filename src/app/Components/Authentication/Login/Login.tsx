import React from 'react';
import './Login.scss';
import Image from 'next/image';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from "next/link";



const Login = () => {
  return (
    <div className="login">
      <div className="loggin__wrapper">
        <div className="login__content">
          <div className="login__form">
            <div className="login__header">
              <h2>Login to your Account</h2>
              <p>Welcome back! Select the below login methods.</p>
            </div>

            <form>
              <label>Email ID / Username</label>
              <input type="text" placeholder="Enter email id / username" />

              <label>Password</label>
              <div className="password-input">
                <input type="password" placeholder="Enter password" />
                <span className="show-password">Show</span>
              </div>

              <div className="login__options">
                <Link href="#">Forgot Password?</Link>
              </div>

              <button type="submit" className="login__button">Login</button>
            </form>

            <div className="login__divider">
              <span>or login with</span>
            </div>

            <div className="social-icons">
            <button>
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
              Don't have an account? <Link href="/signup">Register</Link>
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
