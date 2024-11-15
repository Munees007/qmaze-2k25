import React from "react";
import HomeNavBar from '../components/HomeNavBar';
import logo from '../assets/qmazelogo.png';
import { Zoom, Bounce,Flip } from 'react-reveal';
import { Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
function HeroSection({ setActionBtn }) {
    const navigate=useNavigate()
    return (
        <Row id="home">
            <HomeNavBar setActiveBtn={setActionBtn} />
            <Col span={24} className="home-hero-section" style={{minHeight:"700px"}}>
                <div className="hero-container mt-5 x-hidden">
                    <Zoom cascade>
                        <img className="qmaze-logo" src={logo} alt="qmaze" style={{marginTop:"80px"}}/>
                    </Zoom>
                    <Bounce cascade delay={1000} duration={3000}>
                        <h1>QMAZE - 2K25</h1>
                    </Bounce>
                    <Flip top delay={2000} duration={2000}>
                    <h2># CLASH OF WITS #</h2>
                    </Flip>
                    <Zoom delay={3000}>
                    <div>
                        <button onClick={() => {
                            const section = document.querySelector('#events');
                            setActionBtn(1)
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}>EVENTS</button>
                        <button onClick={()=>{navigate('/register')}}>REGISTER</button>
                    </div>
                    </Zoom>
                </div>
            </Col>
        </Row>

    )
}
export default HeroSection;