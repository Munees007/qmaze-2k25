import React from "react";
import HomeNavBar from '../components/HomeNavBar';
import logo from '../assets/qmazelogo.png';
import { Row, Col } from 'antd';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function HeroSection({ setActionBtn }) {
    const navigate = useNavigate()
    return (
        <Row id="home">
            <HomeNavBar setActiveBtn={setActionBtn} />
            <Col span={24} className="home-hero-section" style={{ minHeight: "700px" }}>
                <div className="hero-container mt-5 x-hidden">
                    {/* Zoom-in effect for the logo */}
                    <motion.img
                        className="qmaze-logo"
                        src={logo}
                        alt="qmaze"
                        style={{ marginTop: "80px" }}
                        initial={{ opacity: 0, scale: 0.8 }} // Initial state: invisible and scaled down
                        animate={{ opacity: 1, scale: 1 }}   // Final state: visible and normal size
                        transition={{ duration: 1 }}
                    />

                    {/* Bounce effect for the main title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }} // Initial state: invisible and offset vertically
                        animate={{ opacity: 1, y: 0 }}  // Final state: visible and at its original position
                        transition={{ type: "spring", stiffness: 100, delay: 1 }}
                    >
                        QMAZE - 2K25
                    </motion.h1>

                    {/* Flip effect for the subtitle */}
                    <motion.h2
                        initial={{ opacity: 0, rotateX: -90 }} // Initial state: invisible and rotated along X-axis
                        animate={{ opacity: 1, rotateX: 0 }}   // Final state: visible and no rotation
                        transition={{ duration: 2, delay: 2 }}
                    >
                        # CLASH OF WITS #
                    </motion.h2>

                    {/* Zoom effect for the buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} // Initial state: invisible and scaled down
                        animate={{ opacity: 1, scale: 1 }}   // Final state: visible and normal size
                        transition={{ duration: 1, delay: 3 }}
                    >
                        <button
                            onClick={() => {
                                const section = document.querySelector('#events');
                                setActionBtn(1);
                                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            EVENTS
                        </button>
                        <button onClick={() => navigate('/register')}>REGISTER</button>
                    </motion.div>
                </div>
            </Col>
        </Row>

    )
}
export default HeroSection;