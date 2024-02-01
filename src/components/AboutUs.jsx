import React from "react";
import '../styles/home.css';
import { Row, Col, Carousel } from "antd";
import Marquee from "react-fast-marquee";
import g1 from '../assets/g1.JPG';
import g2 from '../assets/g2.JPG';
import g3 from '../assets/g3.JPG';
import g4 from '../assets/g4.JPG';
import g5 from '../assets/g5.JPG';
import g6 from '../assets/g6.JPG';
import { useNavigate } from "react-router-dom";
function AboutUs({brouchureLink}) {
    const navigate=useNavigate()
    return (
        <div className="w-100 aboutus-container x-hidden" id="about">
            <Row>
                <Col span={24} className="my-5">
                    <Marquee speed={200} style={{overflowY:"hidden"}}>
                        <h1 className="home-aboutus-marquee">CLASH OF WITS</h1>
                        <h1 className="home-aboutus-marquee">CLASH OF WITS</h1>
                        <h1 className="home-aboutus-marquee">CLASH OF WITS</h1>
                    </Marquee>
                </Col>
            </Row>
            <Row>
                <Col data-aos="fade-right" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }} className="mt-5 d-flex flex-column justify-content-center">
                    <Carousel autoplay={true}>
                        <img src={g1} alt="qmaze" />
                        <img src={g2} alt="qmaze" />
                        <img src={g3} alt="qmaze" />
                        <img src={g4} alt="qmaze" />
                        <img src={g5} alt="qmaze" />
                        <img src={g6} alt="qmaze" />
                    </Carousel>
                </Col>
                <Col data-aos="fade-left" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }} xl={{ span: 10, offset: 2 }} className="mt-5 aboutus-right">
                    <h3 className="my-3"># QMAZE 2K24</h3>
                    <p className="my-5 text-light">
                        Qmaze is a groundbreaking state level technical symposium conducted by the Department of Computer Applications from 2003. QMAZE and the word innovation are inseparable as the Letter Q represents innovation and Maze is a fascinating puzzle which encompasses intricate Competitions that takes place from morning to evening with Success as its ultimate solution.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col data-aos="fade-in" data-aos-duration="1500" span={20} offset={2} className="d-flex justify-content-center align-items-centers my-4">
                    <div className="aboutus-btn-container">
                        <button onClick={()=>{
                            window.open(brouchureLink,"_blank")
                        }}>BROCHURE</button>
                        <button onClick={()=>{navigate('/schedule')}}>SCHEDULE</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default AboutUs;