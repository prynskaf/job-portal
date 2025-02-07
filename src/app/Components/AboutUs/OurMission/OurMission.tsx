import React from "react";
import { Globe, Users, Rocket } from "lucide-react"; 
import "./OurMission.scss";

const OurMission = () => {
  return (
    <div className="ourMission">
      <div className="ourMission__wrapper">
        {/* Section Title */}
        <div className="ourMission__header">
          <span className="badge">Our Mission</span>
          <h2>Revolutionizing Career Growth</h2>
          <p>
            We’re transforming how people find their dream jobs and how companies discover
            exceptional talent.
          </p>
        </div>

        {/* Features */}
        <div className="ourMission__features">
          <div className="feature">
            <div className="icon">
              <Rocket />
            </div>
            <h3>Innovation First</h3>
            <p>Leveraging AI and machine learning to create perfect matches</p>
          </div>

          <div className="feature">
            <div className="icon">
              <Users />
            </div>
            <h3>People Focused</h3>
            <p>Building meaningful connections between talent and opportunities</p>
          </div>

          <div className="feature">
            <div className="icon">
              <Globe />
            </div>
            <h3>Global Impact</h3>
            <p>Creating positive change in the global job market</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
