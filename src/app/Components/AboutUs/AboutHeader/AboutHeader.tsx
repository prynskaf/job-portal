"use client"
import React from "react";
import CountUp from "react-countup";
import "./AboutHeader.scss";

const AboutHeader = () => {
    return (
        <div className="AboutHeader">
            <div className="AboutHeader___wrapper">
                {/* Metrics */}
                <div className="metrics">
                    <h1>Empowering careers through innovative job matching</h1>
                    <div className="metrics_cards">
                        <div className="active-users">
                            <p>
                                <CountUp start={0} end={1000000} duration={2.5} separator="," />+
                            </p>
                            <h2>Active Users</h2>
                        </div>
                        <div className="Partner-Companies">
                            <p>
                                <CountUp start={0} end={5000} duration={2.5} separator="," />+
                            </p>
                            <h2>Partner Companies</h2>
                        </div>
                        <div className="Successful-Placements">
                            <p>
                                <CountUp start={0} end={1500} duration={2.5} separator="," />+
                            </p>
                            <h2>Successful Placements</h2>
                        </div>
                    </div>
                </div>

                {/* Graph */}
                <div>graph component</div>
            </div>
        </div>
    );
};

export default AboutHeader;
