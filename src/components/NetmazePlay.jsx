import React, { useEffect, useState } from "react";
import { Button, Row, Col, Typography, Tooltip, Image, Form, Input, Modal } from 'antd';
import { useDispatch } from "react-redux";
import { logoutNetmazeParticipants, levelUpgrade, updateCurrentAttempt } from '../actions/netmazeActions';
import { IoMdLogOut } from "react-icons/io";
const { Title, Text } = Typography

function NetmazePlay({ email, messageApi, userData, currentQuestion }) {
    const [userAnswer, setUserAnswer] = useState("");
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        setOpen(true)
    },[])
    return (
        <>
            <Row className="bg-dark py-3">
                <Col className="d-flex justify-content-between align-items-center" span={22} offset={1}>
                    <Title className="audiowave aqua my-0 mx-2" level={4}>NETMAZE</Title>
                    <Tooltip title="Logout">
                        <Button type="primary" className="d-flex justify-content-center align-items-center px-2 py-2" size="large" icon={<IoMdLogOut className="fs-5" />} shape="circle" onClick={() => {
                            logoutNetmazeParticipants(email, dispatch, messageApi)
                        }}></Button>
                    </Tooltip>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col span={22} offset={1}>
                    <Text type="secondary" strong>Hello {userData?.name} [ {userData?.collegeName} ]</Text>
                    <Title className="my-1" level={4}>Your Lot Number : {userData?.lotNo}</Title>
                </Col>
                <Col className="text-center" span={22} offset={1}>
                    <Title level={5}>LEVEL : {userData?.level}</Title>
                </Col>
            </Row>
            <Row >
                <Col className="bg-primary rounded px-2 py-2 text-center my-2" xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 4, offset: 1 }}>
                    <Title level={5} className="poppins my-0 text-white">Score : {userData?.score}</Title>
                </Col>
                <Col className="bg-primary rounded px-2 py-2 text-center my-2" xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 2 }} lg={{ span: 6, offset: 11 }} xl={{ span: 4, offset: 13 }}>
                    <Title level={5} className="poppins my-0 text-white">Attempt : {userData?.currentAttempt}</Title>
                </Col>
            </Row>
            <Row className="pb-5">
                <Col className="border rounded py-4 mt-3" span={22} offset={1}>
                    {
                        currentQuestion ?
                            <Form className="d-flex flex-column align-items-center" onSubmitCapture={(e) => {
                                e.preventDefault();
                                updateCurrentAttempt(dispatch, messageApi)
                                if (userAnswer === currentQuestion?.answer) {
                                    levelUpgrade(dispatch, messageApi)
                                }
                                else
                                    messageApi.error("Wrong Answer")
                                setUserAnswer("")
                            }}>
                                <Title className="my-2 mb-3" level={4}>{currentQuestion?.questionName}</Title>
                                <Image src={currentQuestion?.questionUrl} width={280} />
                                {
                                    userData?.currentAttempt >= 100 ?
                                        <span className="poppins mt-3">Clue 1 : {currentQuestion?.clueOne}</span>
                                        :
                                        ""
                                }
                                {
                                    userData?.currentAttempt >= 200 ?
                                        <span className="poppins mt-3">Clue 2 : {currentQuestion?.clueTwo}</span>
                                        :
                                        ""
                                }
                                <Input className="mt-4" size="large" style={{ width: "280px" }} type="text" placeholder="Enter your answer" value={userAnswer} onChange={(e) => {
                                    setUserAnswer(e.target.value.toLowerCase().trim())
                                }} required />
                                <Button className="mt-4" size="large" style={{ width: "280px" }} htmlType="submit" type="primary">Submit</Button>
                            </Form>
                            :
                            <div className="d-flex flex-column align-items-center">
                                <Title className="mx-3 text-center" level={5}>Please be patience till the question updated.</Title>
                            </div>
                    }
                </Col>
            </Row>
            <Modal title="General Instructions" open={open} onCancel={()=>{setOpen(false)}} onOk={()=>{setOpen(false)}}>
                <ul>
                    <li>Don't refresh the window during playing.</li>
                    <li>Submit your answer without whitespace.</li>
                    <li>First clue will be revealed after 100th attempt and second clue will be revealed at 200th attempt.</li>
                    <li>Event will be open from 15th Feb to 25th Feb 2024.</li>
                    <li>Answer key and Leaderboard will be displayed here once the event was closed.</li>
                </ul>
            </Modal>
        </>
    )
}
export default NetmazePlay;