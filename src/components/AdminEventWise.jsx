import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Button } from 'antd';
import { useSelector } from 'react-redux'
import {generateEventMembersTable,generateEventReport} from '../utils/utils';
import { BiSolidReport } from "react-icons/bi";
const { Title, Text } = Typography;
function AdminEventWiseTeams() {
    const eventWise = useSelector((state) => state?.admin?.data?.eventWise);
    const [pgEvents,setPgEvents]=useState([])
    const [ugEvents,setUgEvents]=useState([])
    useEffect(()=>{
        setPgEvents(eventWise?.PG)
        setUgEvents(eventWise?.UG)
    },[eventWise])
    return (
        <>
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Eventwise List</Title>
                    <Text type="primary" strong>Participants details by Eventwise</Text>
                </Col>
            </Row>
            <Row className="mt-4 mb-5">
                <Col span={22} offset={1}>
                    <Title level={3} className="fw-bold">PG EVENTS</Title>
                </Col>
            {
                Object.keys(pgEvents)?.length>0?
                Object.keys(pgEvents)&&Object.keys(pgEvents).map((eventName,index)=>{
                    return(
                        <Col className="bg-white mt-4 rounded py-3 px-3 x-hidden" span={22} offset={1} key={index}>
                            <div className="w-100 pb-2">
                                <p className="fw-bold poppins fs-6 my-0">{eventName}</p>
                                <p className="my-2  fs-7">Total Teams : {pgEvents[eventName].length}</p>
                            </div>
                            {generateEventMembersTable(pgEvents[eventName])}
                            <div className="w-100 mt-3 d-flex justify-content-end">
                                <Button icon={<BiSolidReport className="fs-6"/>} type="primary" className="me-3 d-flex justify-content-center align-items-center" onClick={()=>{
                                    generateEventReport(pgEvents[eventName],"PG")
                                }}>Report</Button>
                            </div>
                        </Col>
                    )
                })
                :
                ""
            }
            </Row>
            <Row className="mt-4 mb-5">
                <Col span={22} offset={1}>
                    <Title level={3} className="fw-bold">UG EVENTS</Title>
                </Col>
            {
                Object.keys(ugEvents)?.length>0?
                Object.keys(ugEvents)&&Object.keys(ugEvents).map((eventName,index)=>{
                    return(
                        <Col className="bg-white mt-4 rounded py-3 px-3 x-hidden" span={22} offset={1} key={index}>
                            <div className="w-100 pb-2">
                                <p className="fw-bold poppins fs-6 my-0">{eventName}</p>
                                <p className="my-2  fs-7">Total Teams : {ugEvents[eventName].length}</p>
                            </div>
                            {generateEventMembersTable(ugEvents[eventName])}
                            <div className="w-100 mt-3 d-flex justify-content-end">
                                <Button icon={<BiSolidReport className="fs-6"/>} type="primary" className="me-3 d-flex justify-content-center align-items-center" onClick={()=>{
                                    generateEventReport(ugEvents[eventName],"UG")
                                }}>Report</Button>
                            </div>
                        </Col>
                    )
                })
                :
                ""
            }
            </Row>
        </>
    )
}
export default AdminEventWiseTeams;