import React from 'react';
import './Signup.scss';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from "next/link";

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__content">
          <div className="signup__form">
            <h2>Registration form</h2>
            <p>Register to apply for jobs of your choice all over the world</p>

            <form>
              <label>Full name<span>*</span></label>
              <input type="text" placeholder="Enter your full name" />

              <label>Email ID<span>*</span></label>
              <input type="email" placeholder="Enter your email id" />
              <p className="input-note">Job notifications will be sent to this email id</p>

              <label>Password<span>*</span></label>
              <input type="password" placeholder="(Minimum 6 characters)" />
              <Link href="#">Remember your password</Link>

              <label>Mobile number<span>*</span></label>
              <input type="text" placeholder="Enter your mobile number" />
              <p className="input-note">Recruiters will contact you on this number</p>

              <div className="signup__options">
                {/* <input type="checkbox" id="updates" />
                <label htmlFor="updates">
                  Send me important updates & promotions via SMS, email, and <span className="whatsapp">WhatsApp</span>
                </label> */}
              </div>

              <p className="terms">
                By clicking Register, you agree to the <Link href="#">Terms and Conditions</Link> & <a href="#">Privacy Policy</a> of AlwaysApply.com
              </p>

              <button type="submit" className="signup__button">Register now</button>
            </form>

            <div className="signup__social">
              <p className="divider"><span>or signup with</span></p>
              <div className="social-icons">
                <button><FaGoogle size={24} color="#DB4437" /></button>
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
