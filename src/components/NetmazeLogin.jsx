import React, { useEffect, useState } from "react";
import { Row, Col, Button, message,Tag } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {handleNetmazeLogin,fetchNetmazeData } from '../actions/netmazeActions';
import {useAuthState} from 'react-firebase-hooks/auth';
import { FcGoogle } from "react-icons/fc";
import {auth} from '../db';
import logo from '../assets/qmazelogo.png';
function NetmazeLogin(){
    const netmaze = useSelector((state) => state?.netmaze);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, ContextHolder] = message.useMessage();
    return(
        <>
            {ContextHolder}
            <Helmet>
                <title>Netmaze | Qmaze</title>
            </Helmet>
            <Row className="d-flex align-items-center" style={{ height: "100vh", backgroundColor: "navy" }}>
                <Col className="bg-white rounded py-4 d-flex flex-column align-items-center" xs={{ span: 22, offset: 1 }} sm={{ span: 16, offset: 4 }} md={{ span: 16, offset: 4 }} lg={{ span: 10, offset: 7 }} xl={{ span: 10, offset: 7 }}>
                    <img src={logo} alt="qmaze-logo" style={{ width: "150px" }} />
                    <p className="audiowave fs-5 text-primary">NETMAZE LOGIN</p>
                    <Button className="d-flex align-items-center my-4" size="large" onClick={()=>{
                        handleNetmazeLogin(dispatch,messageApi)
                    }}><FcGoogle className="fs-4"/><span className="ms-3">Continue with Google</span></Button>
                    <Tag color="blue">Please Login with netmaze participant's google account.</Tag>
                    <Tag className="mt-3" color="red">Only One device allowed to play at a time.</Tag>
                </Col>
            </Row>
        </>
    )
}
export default NetmazeLogin;