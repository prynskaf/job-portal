"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "./Navbar.scss";
import { usePathname } from "next/navigation";
import { useClickAway } from 'react-use';
import { auth, logout } from "@/lib/firebaseAuth";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string>('/profilePic/profilePic.png');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.profilePic) {
              setProfilePic(data.profilePic);
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setProfilePic('/profilePic/profilePic.png');
        }
      }
    });

    // Listen for profilePicChanged event
    const handleProfilePicChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setProfilePic(customEvent.detail);
    };
    window.addEventListener('profilePicChanged', handleProfilePicChanged);

    return () => {
      unsubscribe();
      window.removeEventListener('profilePicChanged', handleProfilePicChanged);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useClickAway(menuRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const isActive = (path: string) => {
    // Match exact or start-with logic for dynamic routes
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="navbar">
      {/* Mobile Nav */}
      <div className="navbar__mobile">
        <Link href="/" className="navbar__logo">
          <Image width={30} height={30} src="/logo/logoIcon.svg" alt="Logo"  priority/>
          <span>AlwaysApply</span>
        </Link>
        <button onClick={toggleMenu} className="navbar__toggle">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <div ref={menuRef} className={`navbar__menu ${isOpen ? "navbar__menu--open" : ""}`}>
        <div className="navbar__menu-header">
          <button onClick={toggleMenu} className="navbar__close">
            <X size={24} />
          </button>
        </div>
        <div className="navbar__menu-items">
          <Link
            href="/"
            className={`navbar__menu-link ${
              isActive("/") ? "navbar__menu-link--active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`navbar__menu-link ${
              isActive("/jobs") ? "navbar__menu-link--active" : ""
            }`}
          >
            Find Jobs
          </Link>
          <Link
            href="/about"
            className={`navbar__menu-link ${
              isActive("/about") ? "navbar__menu-link--active" : ""
            }`}
          >
            About Us
          </Link>
          <Link href="/contact" className="navbar__contact">
            Contact Us
          </Link>
          {!user ? (
            <>
              <Link href="/login" className="navbar__login">Login</Link>
              <Link href="/signup" className="navbar__signup">Signup</Link>
            </>
          ) : (
            <button onClick={logout} className="navbar__logout">Logout</button>
          )}
          {user && (
            <div className="profile">
              <Link href='/profile'>
                <Image
                  width={40}
                  height={40}
                  src={profilePic}
                  alt="Profile Picture"
                  className="profile__image"
                  priority
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="navbar__desktop">
        <Link href="/" className="navbar__logo">
          <Image width={30} height={30} src="/logo/logoIcon.svg" alt="Logo" priority />
          <span>AlwaysApply</span>
        </Link>

        <div className="navbar__nav">
          <Link
            href="/"
            className={`navbar__menu-link ${
              isActive("/") ? "navbar__menu-link--active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`navbar__menu-link ${
              isActive("/jobs") ? "navbar__menu-link--active" : ""
            }`}
          >
            Find Jobs
          </Link>
          <Link
            href="/about"
            className={`navbar__menu-link ${
              isActive("/about") ? "navbar__menu-link--active" : ""
            }`}
          >
            About Us
          </Link>
        </div>

        <div className="navbar__buttons">
          <Link href="/contact" className="navbar__contact">
            Contact Us
          </Link>
          {!user ? (
            <>
              <Link href="/login" className="navbar__login">Login</Link>
              <Link href="/signup" className="navbar__signup">Signup</Link>
            </>
          ) : (
            <button onClick={logout} className="navbar__logout">Logout</button>
          )}
          {user && (
            <div className="profile">
              <Link href='/profile'>
                <Image
                  width={40}
                  height={40}
                  src={profilePic}
                  alt="Profile Picture"
                  className="profile__image"
                  priority
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;