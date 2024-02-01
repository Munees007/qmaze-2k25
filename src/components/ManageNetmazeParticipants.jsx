import React, { useEffect, useState } from "react";
import { Row, Col, Typography, message, Input, Form, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {generateNetmazeParticipantsTable} from '../utils/utils';
import { addNetMazeParticipant } from '../actions/adminActions';
const { Title } = Typography;
function ManageNetmazeParticipants() {
    const [messageApi, ContextHolder] = message.useMessage();
    const participants=useSelector((state)=>state?.admin?.data?.netmazeParticipants)
    const [currentParticipants, setCurrentParticipants] = useState({ lotNo: "", name: "", email: "", level: 1, isLogin: false, type: "", collegeName: "", currentAttempt: 0, totalAttempt: 0, score: 0 })
    const [collegeList, setCollegeList] = useState([])
    const types = ["UG", "PG", "ALUMNI"]
    const dispatch = useDispatch()
    const colleges = useSelector((state) => state?.general?.data?.colleges)
    useEffect(() => {
        setCollegeList(colleges?.map((college) => {
            return college.collegeName
        }).sort())
    }, [colleges])
    return (
        <>
            {ContextHolder}
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Manage Netmaze Participants</Title>
                </Col>
            </Row>
            <Row className="bg-white rounded py-3 mx-3 mt-4">
                <Col span={22} offset={1}>
                    <Title level={5}>Add New Participants</Title>
                </Col>
                <Form className="w-100" onSubmitCapture={(e) => {
                    e.preventDefault();
                    addNetMazeParticipant(currentParticipants, dispatch, messageApi)
                    setCurrentParticipants({ lotNo: "", name: "", email: "", level: 1, isLogin: false, type: "", collegeName: "", currentAttempt: 0, totalAttempt: 0, score: 0 })
                }}>
                    <Row>
                        <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                            <Input type="number" min={1} placeholder="Lot Number" title="Lot Number" size="large" value={currentParticipants?.lotNo} required onChange={(e) => {
                                setCurrentParticipants({ ...currentParticipants, lotNo:e.target.value })
                            }} />
                        </Col>
                        <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                            <Input type="text" placeholder="Participant Name" title="Participant Name" size="large" value={currentParticipants?.name} required onChange={(e) => {
                                setCurrentParticipants({ ...currentParticipants, name: e.target.value })
                            }} />
                        </Col>
                        <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                            <Input type="email" placeholder="Participant Email" title="Participant Email" size="large" value={currentParticipants?.email} required onChange={(e) => {
                                setCurrentParticipants({ ...currentParticipants, email: e.target.value })
                            }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 7, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                            <Select className="w-100" placeholder="Select Type" options={types?.map((item) => ({
                                label: item,
                                value: item,
                            }))} showSearch size="large" value={currentParticipants?.type} title="Types" onSelect={(value) => {
                                setCurrentParticipants({ ...currentParticipants, type: value })
                            }}
                            />
                        </Col>
                        <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 14, offset: 1 }} lg={{ span: 15, offset: 2 }} xl={{ span: 15, offset: 2 }}>
                            <Select className="w-100" placeholder="Select College Name" options={collegeList?.map((item) => ({
                                label: item,
                                value: item,
                            }))} showSearch size="large" value={currentParticipants?.collegeName} title="College Name" onSelect={(value) => {
                                setCurrentParticipants({ ...currentParticipants, collegeName: value })
                            }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} offset={1} className="d-flex justify-content-end mt-4">
                            <button className="btn btn-primary" type="submit">Add Participant</button>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row className="bg-white rounded py-4 px-1 my-4 mx-3">
                <Col span={22} offset={1}>
                    <Title level={5}>Netmaze Participants</Title>
                    {generateNetmazeParticipantsTable(participants, dispatch, messageApi)}
                </Col>
            </Row>
        </>
    )
}
export default ManageNetmazeParticipants;