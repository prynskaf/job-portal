import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.scss"; 
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
      <div className="footer-column">
        <div className='logo'>
        <Image  src="/logo/logoIcon.svg" alt="logoicon" width={30} height={30}/>
        <h3> AlwaysApply</h3>
        </div>
      
        <p>Call now: <a href="tel:+32 45895 1210">+32 45895 1210</a></p>
        <p>Rue Toronto street  1030 Schaserbeek 1030 Belgium</p>
      </div>

      <div className="footer-column">
        <h3>Quick Link</h3>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="footer-column">
        <h3>Candidate</h3>
        <Link href="/jobs">Browse Jobs</Link>
        <Link href="/saved-jobs">Saved Jobs</Link>
      </div>

      <div className="footer-column">
        <h3>Employers</h3>
        <Link href="/profile">Profile</Link>
        <Link href="/appliedJobs">Applications</Link>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
        © {new Date().getFullYear()} AlwaysApply - Job Portal. All Rights Reserved.
        </p>
        <div className="social-icons">
          <Link href="https://facebook.com"><FaFacebook size={25} /></Link>
          <Link href="https://instagram.com"><FaInstagram size={25} /></Link>
          <Link href="https://twitter.com"><FaTwitter size={25} /></Link>
        </div>
      </div>
      </div>
    </footer>
  )
};

export default Footer;
