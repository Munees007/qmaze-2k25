import React from "react";
import { generateAnswerKeyTable, generateNetmazeLeaderboard } from '../utils/utils';
import { Typography, Row, Col } from 'antd'
const { Title } = Typography;
function NetmazeFinish({ result }) {
    return (
        <>
            {
                result?.result ?
                    <>
                        <Row>
                            <Col className="text-center mt-5" span={22} offset={1}>
                                <Title className="poppins fw-bold" level={3}>LEADER BOARD</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={22} offset={1}>
                                <Title className="poppins fw-bold text-primary" level={4}>UG</Title>
                            </Col>
                            <Col span={22} offset={1}>
                                {generateNetmazeLeaderboard(result?.data?.participants?.ug)}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col span={22} offset={1}>
                                <Title className="poppins fw-bold text-primary" level={4}>PG</Title>
                            </Col>
                            <Col span={22} offset={1}>
                                {generateNetmazeLeaderboard(result?.data?.participants?.pg)}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col span={22} offset={1}>
                                <Title className="poppins fw-bold text-primary" level={4}>ALUMNI</Title>
                            </Col>
                            <Col span={22} offset={1}>
                                {generateNetmazeLeaderboard(result?.data?.participants?.alumni)}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center mt-5" span={22} offset={1}>
                                <Title className="poppins fw-bold" level={3}>ANSWER KEY</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={22} offset={1}>
                                <Title className="poppins fw-bold text-primary" level={4}>UG</Title>
                            </Col>
                            <Col span={22} offset={1}>
                                {generateAnswerKeyTable(result?.data?.questions?.ug)}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col span={22} offset={1}>
                                <Title className="poppins fw-bold text-primary" level={4}>PG</Title>
                            </Col>
                            <Col span={22} offset={1}>
                                {generateAnswerKeyTable(result?.data?.questions?.pg)}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col span={22} offset={1}>
                                <Title className="poppins fw-bold text-primary" level={4}>ALUMNI</Title>
                            </Col>
                            <Col span={22} offset={1}>
                                {generateAnswerKeyTable(result?.data?.questions?.alumni)}
                            </Col>
                        </Row>
                    </>
                    :
                    ""
            }
        </>
    )
}
export default NetmazeFinish;