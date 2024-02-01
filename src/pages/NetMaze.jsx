import React, { useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Row, Col, Spin, message } from 'antd';
import NetmazeNotStarted from '../components/NetmazeNotStarted';
import NetmazeFinish from '../components/NetmazeFinish';
import NetmazePlay from '../components/NetmazePlay';
import NetmazeLogin from '../components/NetmazeLogin';
import { fetchData } from '../actions/generalActions';
import { fetchNetmazeData, fetchNetmazeResult } from '../actions/netmazeActions';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../db';
import { decryptData } from '../utils/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
function NetMaze() {
    const general = useSelector((state) => state?.general);
    const generalData = useSelector((state) => state?.general?.data?.general)
    const netmaze = useSelector((state) => state?.netmaze);
    const [messageApi, ContextHolder] = message.useMessage();
    const result = useSelector((state) => state?.result);
    const userData = decryptData(useSelector((state) => state?.netmaze?.userData))
    const currentQuestion = decryptData(useSelector((state) => state?.netmaze?.currentQuestion))
    const dispatch = useDispatch()
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!general.result)
            fetchData(dispatch);
    }, [general])
    useEffect(() => {
        if (!netmaze?.isLogin && netmaze?.questions == null)
            fetchNetmazeData(user?.email, dispatch, messageApi)
        if (generalData?.publishNetmazeAnswerKey)
            fetchNetmazeResult(dispatch)
    }, [general,netmaze])
    return (
        <>
            {ContextHolder}
            <Helmet>
                <title>NetMaze | Qmaze</title>
            </Helmet>
            {
                general?.result ?
                    generalData?.isNetmazeStarts ?
                        <>
                            {
                                netmaze?.isLogin ?
                                    <NetmazePlay email={user?.email} messageApi={messageApi} userData={userData} currentQuestion={currentQuestion} />
                                    :
                                    <NetmazeLogin />
                            }
                        </>
                        :
                        <>
                            {
                                generalData?.publishNetmazeAnswerKey ?
                                    <NetmazeFinish result={result} />
                                    :
                                    <NetmazeNotStarted />
                            }
                        </>
                    :
                    <Row>
                        <Col span={24} style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
                            <Spin size="large" />
                        </Col>
                    </Row>
            }
        </>
    )
}
export default NetMaze;