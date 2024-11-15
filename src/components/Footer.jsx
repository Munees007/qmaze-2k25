import React from "react";
import { Row, Col } from 'antd';
import { TiLocation } from "react-icons/ti";
import logo from '../assets/qmazelogo.png';
import { FaFacebook,FaYoutube,FaInstagram } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { UseSelector, useSelector } from "react-redux";
function Footer() {
    const data=useSelector((state)=>state?.general?.data?.general)
    return (
        <>
        <Row style={{ backgroundColor: "#000" }} className="py-3 x-hidden">
            <Col className="footer-container py-3" span={22} offset={1}>
                <Row className="d-flex align-items-center">
                    <Col className="d-flex flex-column align-items-center footer-col" xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }}>
                        <img className="qmaze-logo" src={logo} alt="qmaze" style={{ transform: "translateY(0px)" }} />
                        <h3 className="yellow audiowave" style={{ transform: "translateY(-32px)" }}>QMAZE 2K25</h3>
                    </Col>
                    <Col className="d-flex flex-column footer-col" xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }}>
                        <h5 className="audiowave yellow my-3">VENUE</h5>
                        <p className="poppins text-white my-0">
                            Department of Computer Applications.<br /> C Block, <br />Ayya Nadar Janaki Ammal College, <br />Sivakasi
                        </p>
                        <a className="my-3" href="https://maps.app.goo.gl/mXwWUQ2vsuzKYnVz9" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                            <div className="d-flex align-items-center">
                                <TiLocation className="fs-4" style={{ color: "#00FFF0" }} />
                                <span className="fs-7 poppins ms-2" style={{ color: "#00FFF0" }}>View Map Location</span>
                            </div>
                        </a>
                    </Col>
                    <Col className="d-flex flex-column footer-col" xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }}>
                        <h5 className="audiowave yellow my-3">CONNECT US</h5>
                        <p className="poppins text-white my-0">
                            You should connect social area for Any update
                        </p>
                        <div className="d-flex gap-3 my-3">
                            <span className="social-media-icon-container" onClick={()=>{
                                window.open(data?.socialMediaLinks.facebook,"_blank")
                            }}>
                                <FaFacebook className="fs-3 yellow"/>
                            </span>
                            <span className="social-media-icon-container" onClick={()=>{
                                window.open(data?.socialMediaLinks.youtube,"_blank")
                            }}>
                                <FaYoutube className="fs-3 yellow"/>
                            </span>
                            <span className="social-media-icon-container" onClick={()=>{
                                window.open(data?.socialMediaLinks.mail,"_blank")
                            }}>
                                <MdMail className="fs-3 yellow"/>
                            </span>
                            <span className="social-media-icon-container" onClick={()=>{
                                window.open(data?.socialMediaLinks.instagram,"_blank")
                            }}>
                                <FaInstagram className="fs-3 yellow"/>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span={20} offset={2} className="my-3">
                <p className="text-center yellow poppins">© QMAZE 2K25 POWERED BY DEPT OF COMPUTER APPLICATIONS </p>
            </Col>
        </Row>
        </>
    )
}
export default Footer;