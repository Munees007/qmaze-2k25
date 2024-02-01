import React, { useEffect } from "react";
import { Row, Col, Button, message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { handleAdminSignIn ,fetchAdminData} from '../actions/adminActions';
import {useAuthState} from 'react-firebase-hooks/auth';
import { FcGoogle } from "react-icons/fc";
import {auth} from '../db';
import logo from '../assets/qmazelogo.png';
function AdminLogin() {
    const admin = useSelector((state) => state?.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[user]=useAuthState(auth);
    const [messageApi, ContextHolder] = message.useMessage()
    useEffect(() => {
        if (admin?.authenticated)
            navigate('/admin/dashboard')
    }, [])
    useEffect(()=>{
        if(!admin?.authenticated)
            fetchAdminData(user?.email,dispatch,messageApi,navigate)
    },[user])
    return (
        <>
            {ContextHolder}
            <Helmet>
                <title>Admin Login | Qmaze</title>
            </Helmet>
            <Row className="d-flex align-items-center" style={{ height: "100vh", backgroundColor: "navy" }}>
                <Col className="bg-white rounded py-4 d-flex flex-column align-items-center" xs={{ span: 22, offset: 1 }} sm={{ span: 16, offset: 4 }} md={{ span: 16, offset: 4 }} lg={{ span: 10, offset: 7 }} xl={{ span: 10, offset: 7 }}>
                    <img src={logo} alt="qmaze-logo" style={{ width: "150px" }} />
                    <p className="audiowave fs-5 text-primary">ADMIN PANEL</p>
                    <Button className="d-flex align-items-center my-4" size="large" onClick={()=>{
                        handleAdminSignIn(dispatch,navigate,messageApi)
                    }}><FcGoogle className="fs-4"/><span className="ms-3">Continue with Google</span></Button>
                </Col>
            </Row>
        </>
    )
}
export default AdminLogin;