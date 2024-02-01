import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from 'antd';
import {useSelector} from 'react-redux'
import {generateTeamsTable} from '../utils/utils';
const { Title, Text } = Typography;
function AdminRegisteredTeams() {
    const admin=useSelector((state)=>state?.admin?.data)
    const [collegeWise,setCollegeWise]=useState({});
    const[teams,setTeams]=useState([])
    useEffect(()=>{
        setCollegeWise(admin?.collegeWise);
        setTeams(admin?.teams)
    },[admin])
    return (
        <>
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Registered Teams</Title>
                    <Text type="primary" strong>Total Colleges : <Text type="primary" className="me-3" strong={false}>{Object.keys(collegeWise).length}</Text> Total teams <Text type="primary" className="me-3" strong={false}>{teams?.length}</Text></Text>
                </Col>
            </Row>
            <Row className="mt-4 mb-5">
            {
                Object.keys(collegeWise)&&Object.keys(collegeWise).map((collegeName,index)=>{
                    return(
                        <Col className="bg-white mt-4 rounded py-3 px-3 x-hidden" span={22} offset={1} key={index}>
                            <div className="w-100 pb-2">
                                <p className="fw-bold poppins fs-6 my-0">{collegeName}</p>
                                <p className="my-2  fs-7">Total Teams : {collegeWise[collegeName].length}</p>
                            </div>
                            {generateTeamsTable(collegeWise[collegeName])}
                        </Col>
                    )
                })
            }
            </Row>
        </>
    )
}
export default AdminRegisteredTeams;