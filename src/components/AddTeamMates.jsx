import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Input, Button, Tooltip, Form, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateTeamMembers } from '../actions/participantActions';
import { AiFillCloseSquare } from "react-icons/ai";
const { Title, Text } = Typography;

function AddTeamMates() {
    const [teamMembers, setTeamMembers] = useState([]);
    let memberTemplate = { name: "", phoneNumber: "", email: "" };
    const backUp = useSelector((state) => state?.participant?.data?.teamData.teamMembers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (teamMembers.length === 0)
            setTeamMembers([...teamMembers, memberTemplate])
    }, [])
    useEffect(() => {
        if(backUp.length!==0)
            setTeamMembers(backUp)
    }, [backUp])
    function deleteMember(index) {
        if (teamMembers.length > 1) {
            const temp = [...teamMembers];
            temp.splice(index, 1)
            setTeamMembers([...temp])
        }
        else {
            alert("Team must contain atleast one member")
        }
    }
    function resetChange() {
        setTeamMembers([...backUp])
        messageApi.info("Changes reseted")
    }
    function updateName(index, e) {
        let tempArr = [...teamMembers];
        let temp = tempArr[index];
        temp = { ...temp, name: e.target.value.toUpperCase() }
        tempArr.splice(index, 1, temp)
        setTeamMembers(tempArr)
    }
    function updateEmail(index, e) {
        let tempArr = [...teamMembers];
        let temp = tempArr[index];
        temp = { ...temp, email: e.target.value.toLowerCase() }
        tempArr.splice(index, 1, temp)
        setTeamMembers(tempArr)
    }
    function updatePhoneNumber(index, e) {
        let tempArr = [...teamMembers];
        let temp = tempArr[index];
        temp = { ...temp, phoneNumber: e.target.value.toUpperCase() }
        tempArr.splice(index, 1, temp)
        setTeamMembers(tempArr)
    }
    return (
        <>
            {contextHolder}
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Manage Team</Title>
                    <Text type="secondary" strong>Add your team members details.Maximam 8 members per team allowed.</Text>
                </Col>
            </Row>
            <Form onSubmitCapture={(e) => {
                e.preventDefault()
                updateTeamMembers(dispatch, teamMembers, messageApi, navigate)
            }} onReset={resetChange}>
                {
                    teamMembers && teamMembers.map((member, index) => {
                        return (
                            <Row className="py-3 bg-white my-3 mx-3 rounded" key={index}>
                                <Col span={22} offset={1} className="d-flex align-items-center">
                                    <Title level={5} className="my-2">Member {index + 1}</Title>
                                    <Tooltip title="Delete member">
                                        <AiFillCloseSquare className="ms-3 fs-4 text-danger pointer" onClick={() => { deleteMember(index) }} />
                                    </Tooltip>
                                </Col>
                                <Row className="w-100">
                                    <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                                        <Input placeholder="Participant Name" size="large" type="text" required value={member.name} onChange={(e) => {
                                            updateName(index,e)
                                        }} />
                                    </Col>
                                    <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                                        <Input placeholder="Participant Email" size="large" type="text" pattern='^[\w.+\-]+@gmail\.com$' required value={member.email} onChange={(e) => {
                                            updateEmail(index,e)
                                        }} />
                                    </Col>
                                    <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                                        <Input placeholder="Participant Phone Number" size="large" maxLength={10} minLength={10} type="tel" required value={member.phoneNumber} onChange={(e) => {
                                            updatePhoneNumber(index,e)
                                        }} />
                                    </Col>
                                </Row>
                            </Row>
                        )
                    })
                }
                {
                    teamMembers.length < 8 ?
                        <Row>
                            <Col span={22} offset={1} className="d-flex justify-content-end my-3">
                                <Button type="primary" onClick={() => {
                                    if (teamMembers.length < 8) {
                                        setTeamMembers([...teamMembers, memberTemplate])
                                    }
                                }}>Add Member</Button>
                            </Col>
                        </Row>
                        :
                        ""
                }
                <Row>
                    <Col span={22} offset={1} className="d-flex justify-content-center my-5">
                        <button className="btn btn-success" type="submit">Save Changes</button>
                        <button className="btn btn-danger ms-3" type="reset">Cancel Changes</button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default AddTeamMates;