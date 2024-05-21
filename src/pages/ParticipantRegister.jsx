import React, { useEffect, useState } from "react";
import { auth } from '../db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchData, addNewCollege, addNewTeam } from '../actions/generalActions';
import { handleSignIn, getParticipantDetails } from '../actions/participantActions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Select, Space, Divider, Input, Button, message, Tag, Typography } from 'antd';
import { FiPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { Helmet } from "react-helmet";
const { Text } = Typography;
function ParticipantRegister() {
    const [teamData, setTeamData] = useState({ collegeName: "", deptName: "", deptType: "", name: "", email: "", contactNumber: "" })
    const generalData = useSelector((state) => state?.general)
    const participantData = useSelector((state) => state.participant);
    const [collegeNames, setCollegeNames] = useState([])
    const [departmentNames, setDepartmemtName] = useState([]);
    const deptType = ["UG", "PG"]
    const [messageApi, contextHolder] = message.useMessage();
    const [newCollege, setNewCollege] = useState("");
    const [user] = useAuthState(auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (generalData.result === false)
            fetchData(dispatch)
        setCollegeNames(generalData?.data?.colleges.map((college) => { return college.collegeName }).sort())
        setDepartmemtName(generalData?.data?.departments.map((dept) => { return dept.deptName }))
    }, [generalData])
    useEffect(() => {
        if (!participantData.authenticated)
            getParticipantDetails(dispatch, user?.email, navigate)
    }, [generalData])
    useEffect(() => {
        if (participantData.authenticated)
            navigate('/dashboard')
    }, [])
    const searchCollege = (text) => {

    }

    const registerTeam = () => {
        if (teamData != {} && teamData?.collegeName != "" && teamData?.deptName != "" && teamData?.deptType != "" && teamData?.name != "" && teamData?.email != "" && teamData?.contactNumber != "") {
            if (teamData?.email.endsWith("@gmail.com"))
                if (teamData?.contactNumber.length == 10)
                    addNewTeam(teamData, messageApi)
                else
                    messageApi.error("Please check your contact number")
            else
                messageApi.error("Please use google account to register")
        }
        else {
            messageApi.error("Please provide all details")
        }
    }
    return (
        <>
            {contextHolder}
            <Helmet>
                <title>Register | Qmaze 2K24</title>
                <meta name="theme-color" content="#0d6efd" />
            </Helmet>
            <div className="w-100 bg-primary d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: "100vh" }}>
                <Row className="w-100">
                    <Col className="bg-light rounded py-2 px-2" xs={{ span: 20, offset: 2 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }} xl={{ span: 16, offset: 4 }}>
                        <Row>
                            <Col span={24}>
                                <h4 className="poppins fw-bold text-center my-3 text-primary">Team Registration</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
                                <Select className="w-100" placeholder="Select your college" options={collegeNames?.map((item) => ({
                                    label: item,
                                    value: item,
                                }))} showSearch size="large" title="College Name" onSelect={(value) => {
                                    setTeamData({ ...teamData, collegeName: value })
                                }}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{
                                                    margin: '8px 0',
                                                }}
                                                plain
                                            >If Name not listed, Add yours</Divider>
                                            <Space
                                                style={{
                                                    padding: '0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="Enter Your College Name"
                                                    onChange={(e) => {
                                                        setNewCollege(e.target.value)
                                                    }}
                                                    value={newCollege}
                                                />
                                                <Button type="text" icon={<FiPlus />} onClick={() => {
                                                    addNewCollege(dispatch, newCollege, messageApi)
                                                    setNewCollege("")
                                                }}>
                                                    Add College
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                />
                            </Col>
                            <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                                <Select className="w-100" placeholder="Select your department" options={departmentNames?.map((item) => ({
                                    label: item,
                                    value: item,
                                }))} showSearch size="large" title="Department Name" onSelect={(value) => {
                                    setTeamData({ ...teamData, deptName: value })
                                }}
                                />
                            </Col>
                            <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                                <Select className="w-100" placeholder="Select department type" options={deptType?.map((item) => ({
                                    label: item,
                                    value: item,
                                }))} showSearch size="large" title="Department Type" onSelect={(value) => {
                                    setTeamData({ ...teamData, deptType: value })
                                }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 7, offset: 1 }}>
                                <Input placeholder="Your Name" size="large" title="Name" onChange={(e) => {
                                    setTeamData({ ...teamData, name: e.target.value.trim() })
                                }} value={teamData?.name} />
                            </Col>
                            <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 1 }}>
                                <Input placeholder="Contact Number" size="large" title="Contact Number" onChange={(e) => {
                                    setTeamData({ ...teamData, contactNumber: e.target.value.trim() })
                                }} value={teamData?.contactNumber} />
                            </Col>
                            <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 6, offset: 2 }} xl={{ span: 7, offset: 1 }}>
                                <Input placeholder="Email" size="large" title="Email Address" type="email" onChange={(e) => {
                                    setTeamData({ ...teamData, email: e.target.value.toLowerCase().trim() })
                                }} value={teamData?.email} />
                                <Tag className="d-flex mt-2" color="processing" bordered={false}>Please use google account to register</Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={22} offset={1}>
                                <Button className="w-100 my-3" size="large" type="primary" onClick={registerTeam}>REGISTER</Button>
                            </Col>
                        </Row>
                        <Divider plain>If already registered</Divider>
                        <Row>
                            <Col span={24} className="d-flex justify-content-center my-2">
                                <button className="btn btn-light d-flex align-items-center" onClick={() => { handleSignIn(dispatch, messageApi, navigate) }}><FcGoogle className="fs-4" /><Text className="ms-2">Login with Google</Text></button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <button className="btn btn-light btn-sm mt-4" onClick={() => {
                    window.open(generalData?.data?.general?.registrationManual)
                }}>registration Manual</button>
                <Text className="d-flex align-items-center text-white mt-3">
                    <TfiHeadphoneAlt />
                    <span className="ms-2 my-0">Tech Support</span></Text>
                <span className="text-white">+91 9025105989 <br /> +91 9626295434</span>
            </div>
        </>

    )
}
export default ParticipantRegister;