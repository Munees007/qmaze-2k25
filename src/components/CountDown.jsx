import React, { useState } from "react";
import { Row, Col } from 'antd';
import Marquee from "react-fast-marquee";
import date from 'date-and-time';
function CountDown() {
    // eslint-disable-next-line
    const [day, setDay] = useState(date.subtract(new Date("2024-2-27"), new Date()).toDays());
    return (
        <Row className="countdown-section pb-5 pt-3">
            <Col span={24}>
                <Marquee direction="rl" speed={150}>
                    <div className="coutdown-animation">
                        <span style={{ opacity: ".4" }}></span>
                        <span style={{ opacity: ".6" }}></span>
                        <span style={{ opacity: ".8" }}></span>
                        <span style={{ opacity: "1" }}></span>
                    </div>
                </Marquee>
            </Col>
            <Col span={20} offset={2} className="d-flex flex-column align-items-center my-3">
                <div className="mt-3">
                    {
                        day > 0 ?
                            <>
                                <span className="countdown-days">{Math.ceil(day)}</span>
                                <span className="poppins text-white ms-2 fs-6">DAYS TO GO</span></>
                            :
                            <h1 className="audiowave aqua">EVENT LIVE NOW</h1>
                    }
                </div>
                <h1 className="countdown-qmaze-title mt-4">QMAZE 2K24</h1>
                <p className="my-4 yellow poppins fw-bold text-center fs-5">AYYA NADAR JANAKI AMMAL COLLEGE</p>
                <p className="countdown-date mt-2">27-02-2024</p>
            </Col>
        </Row>
    )
}
export default CountDown;