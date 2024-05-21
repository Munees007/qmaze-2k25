import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Input, Form, Image, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { imgToBase64, generateNetmazeQuestionsTable } from '../utils/utils';
import { addNetMazeQuestion } from '../actions/adminActions';
import imageCompression from "browser-image-compression";
const { Text, Title } = Typography;
function ManageNetmazeQuestions() {
    const netmazeQuesResponse = useSelector((state) => state?.admin?.data?.netmazeQuestions)
    const [currentQues, setCurrentQues] = useState({ levelNumber: "", questionName: "", questionUrl: "", type: "", clueOne: "", clueTwo: "", answer: "" })
    const [messageApi, ContextHolder] = message.useMessage();
    const types = ["UG", "PG", "ALUMNI"];
    const dispatch = useDispatch();
    return (
        <>
            {ContextHolder}
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Manage Netmaze Questions</Title>
                </Col>
            </Row>
            <Form onSubmitCapture={(e) => {
                e.preventDefault();
                addNetMazeQuestion(currentQues, dispatch, messageApi);
                setCurrentQues({ levelNumber: "", questionName: "", questionUrl: "", type: "", clueOne: "", clueTwo: "", answer: "" })
            }}>
                <Row className="bg-white rounded py-4 px-1 my-4 mx-3">
                    <Col span={22} offset={1}>
                        <Text type="primary" strong className="my-2">Add Question</Text>
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 1 }} xl={{ span: 3, offset: 1 }}>
                        <Input type="number" min={1} placeholder="Level Number" title="Level Number" size="large" value={currentQues?.levelNumber} required onChange={(e) => {
                            setCurrentQues({ ...currentQues, levelNumber: e.target.value })
                        }} />
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                        <Input type="text" placeholder="Question Name" title="Question Name" size="large" required value={currentQues?.questionName} onChange={(e) => {
                            setCurrentQues({ ...currentQues, questionName: e.target.value })
                        }} />
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                        <input className="mb-2" type="file" accept="image/*" onChange={(e) => {
                            const options = {
                                maxSizeMB: 2,
                                maxWidthOrHeight: 500,
                                useWebWorker: true,
                            };
                            imageCompression(e.target.files[0], options).then((img) => {
                                imgToBase64(img, (res) => {
                                    setCurrentQues({ ...currentQues, questionUrl: res })
                                })
                            });
                        }} />
                        {
                            currentQues?.questionUrl ?
                                <Image src={currentQues?.questionUrl} width={200} />
                                : ""
                        }
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 1 }} xl={{ span: 4, offset: 1 }}>
                        <Select className="w-100" placeholder="Select Type" options={types?.map((item) => ({
                            label: item,
                            value: item,
                        }))} showSearch size="large" value={currentQues?.type} title="Types" onSelect={(value) => {
                            setCurrentQues({ ...currentQues, type: value })
                        }}
                        />
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                        <Input type="text" placeholder="Clue 1" title="Clue 1" size="large" required value={currentQues?.clueOne} onChange={(e) => {
                            setCurrentQues({ ...currentQues, clueOne: e.target.value })
                        }} />
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                        <Input type="text" placeholder="Clue 2" title="Clue 2" size="large" required value={currentQues?.clueTwo} onChange={(e) => {
                            setCurrentQues({ ...currentQues, clueTwo: e.target.value })
                        }} />
                    </Col>
                    <Col className="mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                        <Input type="text" placeholder="Answer" title="Answer" size="large" required value={currentQues?.answer} onChange={(e) => {
                            setCurrentQues({ ...currentQues, answer: e.target.value.toLowerCase() })
                        }} />
                    </Col>
                    <Col className="d-flex justify-content-end mt-3" span={22} offset={1}>
                        <button className="btn btn-primary">Add Question</button>
                    </Col>
                </Row>
                <Row className="bg-white rounded py-4 px-1 my-4 mx-3">
                    <Col span={22} offset={1}>
                        <Title level={4}>UG Questions</Title>
                        {generateNetmazeQuestionsTable(netmazeQuesResponse?.ugQuestions, dispatch, messageApi)}
                    </Col>
                </Row>
                <Row className="bg-white rounded py-4 px-1 my-4 mx-3">
                    <Col span={22} offset={1}>
                        <Title level={4}>PG Questions</Title>
                        {generateNetmazeQuestionsTable(netmazeQuesResponse?.pgQuestions, dispatch, messageApi)}
                    </Col>
                </Row>
                <Row className="bg-white rounded py-4 px-1 my-4 mx-3">
                    <Col span={22} offset={1}>
                        <Title level={4}>Alumni Questions</Title>
                        {generateNetmazeQuestionsTable(netmazeQuesResponse?.alumniQuestions, dispatch, messageApi)}
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default ManageNetmazeQuestions;