import React from "react";
import { Row, Col, Typography } from 'antd';
import { useSelector } from "react-redux";
import { SlBadge } from "react-icons/sl";
import { MdPaid } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
const { Title, Text } = Typography;
function ParticipantDash() {
    const teamData = useSelector((state) => state?.participant?.data?.teamData);
    return (
        <>
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Dashboard</Title>
                    <Text type="secondary" strong>We are pleasure to welcomes you for Qmaze organized by Softech Association</Text>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="bg-primary rounded mt-4" xs={{ span: 22, offset: 1 }} sm={{ span: 11, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
                    <Title className="text-white mt-3 mx-3 poppins fw-bold" level={5}>LOT NUMBER</Title>
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <span className="poppins fw-bold" style={{ fontSize: "60px", color: "gold" }}>{teamData?.lotNo}</span>
                        <SlBadge className="ms-5" style={{ fontSize: "80px", color: "white" }} />
                    </div>
                </Col>
                <Col className="bg-danger rounded mt-4" xs={{ span: 22, offset: 1 }} sm={{ span: 11, offset: 1 }} md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }} xl={{ span: 10, offset: 2 }}>
                    <Title className="text-white mt-3 mx-3 poppins fw-bold" level={5}>PAYMENT STATUS</Title>
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <span className="poppins fw-bold" style={{ fontSize: "30px", color: "lightgreen" }}>{teamData?.paymentStatus}</span>
                        <MdPaid className="ms-5" style={{ fontSize: "80px", color: "white" }} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="bg-dark rounded my-4 py-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
                    <Title className="aqua mt-3 mx-3 poppins fw-bold d-flex align-items-center" level={5}>About Team <RiTeamFill className="fs-4 ms-2" /></Title>
                    <p className="text-white mx-3 poppins my-3">{teamData?.collegeName}</p>
                    <p className="text-white mx-3 poppins my-3">{teamData?.deptName} [{teamData?.deptType}]</p>
                    <p className="text-white mx-3 poppins my-3">Team Strength : {teamData?.teamMembers.length}</p>
                    <p className="text-white mx-3 poppins my-3">Email : {teamData?.email}</p>
                    <p className="text-white mx-3 poppins my-3">Contact : {teamData?.contactNumber}</p>
                </Col>
                <Col className="bg-white rounded my-4 py-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 11, offset: 1 }} lg={{ span: 11, offset: 1 }} xl={{ span: 11, offset: 1 }}>
                    {
                        teamData?.eventParticipants.length > 0 ?
                            <Row>
                                <Col className="my-2" span={22} offset={1}>
                                    <Title level={4}>Team Squad</Title>
                                </Col>
                                <Col className="bg-white rounded py-3 px-3" span={22} offset={1}>
                                    {
                                        teamData.eventParticipants.map((value, index) => {
                                            return (
                                                <div key={index}>
                                                    <Title level={5}>{index + 1}). {value.eventName}</Title>
                                                    <ul className="ms-5">
                                                        {
                                                            value.members.map((val, i) => {
                                                                return (
                                                                    <li key={i}>{val}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                            :
                            ""
                    }
                </Col>
            </Row>
        </>
    )
}
export default ParticipantDash;