import React, { useEffect, useState } from "react";
import { Row, Col, Typography, message, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {generateNetmazeLeaderboard} from '../utils/utils';
const { Title, Text } = Typography;
function NetmazeDashboard() {
    const [messageApi, ContextHolder] = message.useMessage();
    const general = useSelector((state) => state?.general?.data?.general)
    const netmazeParticipants = useSelector((state) => state?.admin?.data?.netmazeParticipants);
    const [ug, setUg] = useState([]);
    const [pg, setPg] = useState([]);
    const [alumni, setAlumni] = useState([]);
    useEffect(() => {
        let ugp = [], pgp = [], ap = []
        netmazeParticipants?.forEach(participant => {
            if (participant?.type == "UG")
                ugp.push(participant)
            if (participant?.type == "PG")
                pgp.push(participant)
            if (participant?.type == "ALUMNI")
                ap.push(participant)
        });
        setUg(ugp)
        setPg(pgp)
        setAlumni(ap);
    }, [netmazeParticipants])
    return (
        <>
            {ContextHolder}
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Netmaze Dashboard</Title>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="bg-white rounded py-3 px-3 my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                    <Title level={5}>Start Netmaze</Title>
                    <Switch className="my-2" value={general?.isNetmazeStarts} />
                    <Text className="d-block my-2" type="secondary" strong>Turn on to start netmaze event.</Text>
                </Col>
                <Col className="bg-white rounded py-3 px-3 my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                    <Title level={5}>Publish Answer Key</Title>
                    <Switch className="my-2" value={general?.publishNetmazeAnswerKey} />
                    <Text className="d-block my-2" type="secondary" strong>Turn on to publish answer key.</Text>
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Netmaze Leaderboard</Title>
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1} className="mt-3">
                    <Title level={5}>UG</Title>
                    {generateNetmazeLeaderboard(ug)}
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1} className="mt-3">
                    <Title level={5}>PG</Title>
                    {generateNetmazeLeaderboard(pg)}
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1} className="mt-3">
                    <Title level={5}>ALUMNI</Title>
                    {generateNetmazeLeaderboard(alumni)}
                </Col>
            </Row>
        </>
    )
}
export default NetmazeDashboard;