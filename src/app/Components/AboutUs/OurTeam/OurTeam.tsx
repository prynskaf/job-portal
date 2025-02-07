import Image from 'next/image';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; // Importing icons
import './OurTeam.scss';

const OurTeam = () => {
  return (
    <div className="ourTeams">
      <div className="ourTeams__wrapper">

        {/* Our Teams Header */}
        <div className="ourTems-header">
          <span className="badge">Our Team</span>
          <h2>Meet the Innovators</h2>
          <p>
            Stay ahead with our comprehensive market insights. We analyze industry trends,
            track in-demand skills, and monitor employment patterns to give you a clear
            view of the job market landscape.
          </p>
        </div>

        {/* Team Members */}
        <div className="team-members">
          {/* Team Member 1 */}
          <div className="team-member">
            <Image src="/Teams/team1.svg" alt="member1" width={300} height={100} />
            <h3>John Doe</h3>
            <p>CEO, Company Inc.</p>
            {/* Social Media Icons */}
            <div className="social-icons">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <Image src="/Teams/team2.svg" alt="member2" width={300} height={100} />
            <h3>Jane Smith</h3>
            <p>CTO, Company Inc.</p>
            <div className="social-icons">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="team-member">
            <Image src="/Teams/team3.svg" alt="member3" width={200} height={100} />
            <h3>Emily Rodriguez</h3>
            <p>Head of Operations</p>
            <div className="social-icons">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurTeam;
