import React from "react";
import { Row, Col } from 'antd';
import logo from '../assets/qmazelogo.png';
import { Helmet } from 'react-helmet';
function NetmazeNotStarted() {
    return (
        <>
            <Helmet>
                <meta name="theme-color" content="#072A51" />
            </Helmet>
            <Row style={{ height: "100vh", background: "linear-gradient(180deg, #072A51 13.84%, #051C35 45.76%, #000 100%)" }}>
                <Col className="d-flex flex-column align-items-center justify-content-center" span={24}>
                    <img className="qmaze-logo" src={logo} alt="qmaze-logo"/>
                    <h3 className="aqua audiowave my-0">Netmaze</h3>
                    <p className="poppins text-white mt-3 fs-6">Event not started... Stay Tuned</p>
                </Col>
            </Row>
        </>
    )
}
export default NetmazeNotStarted;