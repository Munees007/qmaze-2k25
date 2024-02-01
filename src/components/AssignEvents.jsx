import React, { useEffect, useState } from "react";
import { Typography, Row, Col, message, Button, Image, Select } from 'antd';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {updateEventMembers} from '../actions/participantActions';
const { Title, Text } = Typography;

function AssignEvents() {
    const [messageApi, contextHolder] = message.useMessage();
    const [visible, setVisible] = useState(false);
    const [eventMembers, setEventMembers] = useState([]);
    const backUp = useSelector((state) => state?.participant.data.teamData.eventParticipants);
    const scaleStep = 0.5;
    const temp = ["bala", "hari"]
    const events = useSelector((state) => state?.general?.data.general.events);
    const teamData = useSelector((state) => state?.participant?.data.teamData)
    const conflictMap = useSelector((state) => state?.general?.data.general.events.conflictMap)
    const navigate=useNavigate();
    const dispatch=useDispatch()
    useEffect(() => {
        if (eventMembers.length === 0) {
            let eventsMap = []
            if (teamData.deptType === "UG") {
                events.ugEvents.map((value) => {
                    let members = []
                    let i = 0;
                    while (++i <= value?.noOfMembers) members.push("");
                    eventsMap.push({ eventName: value.eventName, noOfMembers: value.noOfMembers, members })
                })
            }
            if (teamData.deptType === "PG") {
                events.pgEvents.map((value) => {
                    let members = []
                    let i = 0;
                    while (++i <= value?.noOfMembers) members.push("");
                    eventsMap.push({ eventName: value.eventName, noOfMembers: value.noOfMembers, members })
                })
            }
            events.onlineEvents.map((value) => {
                let members = []
                let i = 0;
                while (++i <= value?.noOfMembers) members.push("");
                eventsMap.push({ eventName: value.eventName, noOfMembers: value.noOfMembers, members })
            })
            setEventMembers(eventsMap);
            // updateEventMembers(dispatch,eventsMap,messageApi,navigate)
        }
    }, [])
    useEffect(()=>{
        if(backUp.length!==0)
            setEventMembers(backUp);
        else
            updateEventMembers(dispatch, eventMembers, messageApi, navigate)
    },[backUp])
    const handleSelect = (x, y, value) => {
        let temp=JSON.parse(JSON.stringify(eventMembers))
        temp[x].members[y]=value
        setEventMembers(temp)
    }
    return (
        <>
            {contextHolder}
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>Assign Events</Title>
                    <Text type="secondary" strong>Assign Participants by event wise. Use Conflict Map to avoid event conflict</Text>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="d-flex justify-content-center my-4">
                    <Button type="primary" onClick={() => { setVisible(true) }}>Conflict Map preview</Button>
                </Col>
            </Row>
            <Image
                width={200}
                style={{
                    display: 'none',
                }}
                src={conflictMap}
                preview={{
                    visible,
                    scaleStep,
                    src: conflictMap,
                    onVisibleChange: (value) => {
                        setVisible(value);
                    },
                }}
            />
            {
                eventMembers&& eventMembers?.map((value, index) => {
                    return (
                        <Row className="py-3 bg-white my-3 mx-3 rounded" key={index}>
                            <Col span={22} offset={1} className="d-flex align-items-center">
                                <Title level={5} className="my-2">{value?.eventName}</Title>
                            </Col>
                            {
                                value?.members.map((member, i) => {
                                    return (
                                        <Col className="my-2" span={22} offset={1} key={i}>
                                            <Select className="w-100" placeholder="Select Member" options={teamData?.teamMembers.map((item) => ({
                                                label: item.name,
                                                value: item.name,
                                            }))} showSearch size="large" title="Department Name" value={member} onSelect={(value) => {
                                                handleSelect(index, i, value)
                                            }}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                })
            }
            <Row>
                <Col span={22} offset={1} className="d-flex justify-content-center my-5">
                    <button className="btn btn-success" onClick={()=>{
                        updateEventMembers(dispatch, eventMembers, messageApi, navigate)
                    }}>Save Changes</button>
                    <button className="btn btn-danger ms-3" onClick={()=>{
                        if(backUp.length!==0){
                            setEventMembers(backUp)
                        }
                    }}>Cancel Changes</button>
                </Col>
            </Row>
        </>
    )
}
export default AssignEvents;