import React from "react";
import logo from '../assets/qmazelogo.png';
import { Row, Col } from 'antd';
import Marquee from "react-fast-marquee";
function YoutubeBanner({videoLink}) {
    return (
        <Row className="x-hidden">
            <Col span={24} className="my-4" >
                <Marquee direction="lr" speed={100} style={{overflowY:"hidden"}}>
                    <h1 className="poppins fw-bold youtube-banner-marquee my-0">{">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}</h1>
                </Marquee>
            </Col>
            <Col span={20} offset={2} className="youtube-banner-container my-2 pointer" onClick={()=>{
                window.open(videoLink,'_blank')
            }}>
                <Row className="py-2">
                    <Col className="d-flex justify-content-center align-items-center" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 2 }} xl={{ span: 10, offset: 2 }} >
                        <img className="qmaze-logo" src={logo} alt="qmaze" style={{ transform: "translateY(16px)" }} />
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center flex-column" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                        <h1 className="aqua audiowave t-shadow-1">QMAZE 2K24</h1>
                        <h4 className="poppins fw-bold text-white mt-2">WATCH NOW</h4>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="72" viewBox="0 0 73 72" fill="none">
                                <path d="M64.374 21.9059C64.0453 20.6679 63.3971 19.5381 62.4943 18.6295C61.5915 17.7209 60.4658 17.0655 59.23 16.7289C54.693 15.5049 36.5 15.5049 36.5 15.5049C36.5 15.5049 18.307 15.5049 13.77 16.7289C12.5342 17.0655 11.4085 17.7209 10.5057 18.6295C9.60293 19.5381 8.95471 20.6679 8.626 21.9059C7.41 26.4719 7.41 35.9999 7.41 35.9999C7.41 35.9999 7.41 45.5279 8.626 50.0949C8.95471 51.3328 9.60293 52.4627 10.5057 53.3713C11.4085 54.2798 12.5342 54.9353 13.77 55.2719C18.307 56.4949 36.5 56.4949 36.5 56.4949C36.5 56.4949 54.693 56.4949 59.23 55.2719C60.4658 54.9353 61.5915 54.2798 62.4943 53.3713C63.3971 52.4627 64.0453 51.3328 64.374 50.0949C65.59 45.5279 65.59 35.9999 65.59 35.9999C65.59 35.9999 65.59 26.4719 64.374 21.9059Z" fill="#EA5A47" />
                                <path d="M30.55 44.6501L45.756 36.0001L30.55 27.3501V44.6501Z" fill="white" />
                                <path d="M64.374 21.9059C64.0453 20.6679 63.3971 19.5381 62.4943 18.6295C61.5915 17.7209 60.4658 17.0655 59.23 16.7289C54.693 15.5049 36.5 15.5049 36.5 15.5049C36.5 15.5049 18.307 15.5049 13.77 16.7289C12.5342 17.0655 11.4085 17.7209 10.5057 18.6295C9.60293 19.5381 8.95471 20.6679 8.626 21.9059C7.41 26.4719 7.41 35.9999 7.41 35.9999C7.41 35.9999 7.41 45.5279 8.626 50.0949C8.95471 51.3328 9.60293 52.4627 10.5057 53.3713C11.4085 54.2798 12.5342 54.9353 13.77 55.2719C18.307 56.4949 36.5 56.4949 36.5 56.4949C36.5 56.4949 54.693 56.4949 59.23 55.2719C60.4658 54.9353 61.5915 54.2798 62.4943 53.3713C63.3971 52.4627 64.0453 51.3328 64.374 50.0949C65.59 45.5279 65.59 35.9999 65.59 35.9999C65.59 35.9999 65.59 26.4719 64.374 21.9059Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
                                <path d="M30.55 44.6501L45.756 36.0001L30.55 27.3501V44.6501Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="poppins text-white ms-2">on YouTube</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span={24} className="my-4" >
                <Marquee speed={100} style={{overflowY:"hidden"}}>
                    <h1 className="poppins fw-bold youtube-banner-marquee">{"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</h1>
                </Marquee>
            </Col>
        </Row>
    )
}
export default YoutubeBanner;