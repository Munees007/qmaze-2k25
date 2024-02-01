import React, { useEffect, useState } from 'react';
import { Row, Col,Typography } from 'antd';
import {useSelector} from 'react-redux';
import { LuSchool } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
const{Title,Text}=Typography;
function AdminDash() {
    const [count,setCount]=useState({ugCounts:0,pgCounts:0,participantsCounts:0,collegeCounts:0})
    const data=useSelector((state)=>state?.admin?.data);
    useEffect(()=>{
        let studentCounts=0;
        let ug=data?.teams.filter((team)=>{
            studentCounts+=team.teamMembers.length;
            return team.deptType=="UG"
        }).length;
        let pg=data?.teams.filter((team)=>{
            return team.deptType=="PG"
        }).length;
        let collegeCount=data?Object.keys(data?.collegeWise).length:0;
        setCount({ugCounts:ug,pgCounts:pg,participantsCounts:studentCounts,collegeCounts:collegeCount})
    },[data])
    return (
        <>
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Dashboard</Title>
                    <Text type="secondary" strong>Hello Admin, Have a nice day ahead </Text>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col className='my-2 bg-primary rounded py-4 px-2 d-flex justify-content-evenly align-items-center' xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                    <LuSchool className='fs-1 text-white'/>
                    <div>
                        <Title className='text-white' level={4}>Total Colleges</Title>
                        <Title level={1} className='my-1 text-warning'>{count?.collegeCounts}</Title>                    
                    </div>
                </Col>
                <Col className='my-2 bg-primary rounded py-4 px-2 d-flex justify-content-evenly align-items-center' xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                    <MdGroups className='fs-1 text-white'/>
                    <div>
                        <Title className='text-white' level={4}>Total Teams</Title>
                        <Title level={1} className='my-1 text-warning'>{data?.teams.length}</Title>
                        <Title level={5} className='my-1 text-white'>UG : {count?.ugCounts}  PG : {count?.pgCounts}</Title>                    
                    </div>
                </Col>
                <Col className='my-2 bg-primary rounded py-4 px-2 d-flex justify-content-evenly align-items-center' xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                    <PiStudentFill className='fs-1 text-white'/>
                    <div>
                        <Title className='text-white' level={4}>Total Particpants</Title>
                        <Title level={1} className='my-1 text-warning'>{count?.participantsCounts}</Title>                  
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default AdminDash;