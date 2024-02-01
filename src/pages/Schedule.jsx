import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tag, ConfigProvider } from 'antd';
import {fetchData} from '../actions/generalActions';
import { useDispatch, useSelector } from "react-redux";
import { BiHomeAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import _ from "underscore";
import date from 'date-and-time'
function Schedule() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const generalData=useSelector((state)=>state?.general)
    const data=useSelector((state)=>state?.general?.data?.general)
    const [overallEvents, setOverallEvents] = useState([])
    const [overallUgEvents, setOverallUgEvents] = useState([])
    const [overallPgEvents, setOverallPgEvents] = useState([])
    const[overallOnlineEvents,setOverallOnlineEvents]=useState([])
    useEffect(()=>{
        if(generalData.result===false)
            fetchData(dispatch)
    },[])
    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <span className="poppins">{key + 1}</span>
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (value) => <span className="poppins">{value}</span>
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            render: (value) => <span className="poppins">{value}</span>
        },
        {
            title: 'Type',
            dataIndex: 'eventType',
            key: 'eventType',
            render: (key) => <Tag color="blue">{key}</Tag>
        },
        {
            title: 'Venue',
            dataIndex: 'venue',
            key: 'venue',
            render: (value) => <span className="poppins">{value}</span>
        }
    ];
    const onlineColumns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <span className="poppins">{key + 1}</span>
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (value) => <span className="poppins">{value}</span>
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            render: (value) => <span className="poppins">{value}</span>
        },
        {
            title: 'Type',
            dataIndex: 'eventType',
            key: 'eventType',
            // render: (key) => <Tag color="blue">{key}</Tag>
            render:(_,{eventType})=>(
                <>
                    {
                        eventType?.map((type,index)=>{
                            return <Tag color="blue">{type}</Tag>
                        })
                    }
                </>
            )
        },
        {
            title: 'Venue',
            dataIndex: 'venue',
            key: 'venue',
            render: (value) => <span className="poppins">{value}</span>
        }
    ];
    useEffect(() => {
        let overall = [], temp = []
        temp = data?.events.General.map((value) => {
            overall.push({ ...value, startTime: date.parse(value.time.split(" to ")[0], 'hh:mm A'), eventType: value.type[0] })
            return ""
        })
        temp = data?.events.ugEvents.map((value) => {
            overall.push({ ...value, startTime: date.parse(value.time.split(" to ")[0], 'hh:mm A'), eventType: value.type[0] })
            return ""
        })
        temp = data?.events.pgEvents.map((value) => {
            overall.push({ ...value, startTime: date.parse(value.time.split(" to ")[0], 'hh:mm A'), eventType: value.type[0] })
            return ""
        })
        setOverallOnlineEvents(data?.events.onlineEvents.map((value,index)=>{
            return {key: index+1, time: value.time, event: value.eventName, venue: value.venue, eventType: value.type}
        }))
        overall = _.sortBy(overall, 'startTime')
        setOverallEvents([])
        // eslint-disable-next-line
        temp = setOverallEvents(overall.map((value, index) => {
            return { key: index, time: value.time, event: value.eventName, venue: value.venue, eventType: value.eventType }
        }))
    }, [generalData])
    useEffect(() => {
        let temp = []
        setOverallUgEvents([])
        setOverallPgEvents([])
        // eslint-disable-next-line
        temp = setOverallUgEvents(overallEvents.filter((value) => {
            if (value.eventType === "UG")
                return value
        }))
        // eslint-disable-next-line
        temp = setOverallPgEvents(overallEvents.filter((value) => {
            if (value.eventType === "PG")
                return value
        }))
        console.log(overallEvents)
    }, [overallEvents])
    return (
        <div style={{ backgroundColor: "#000" }}>
            <Helmet>
                <meta name="theme-color" content="#000" />
            </Helmet>
            <Row className="py-5">
                <Col span={20} offset={2} className="d-flex justify-content-between">
                    <h3 className="aqua audiowave my-0">QMAZE 2k24</h3>
                    <div className="d-flex align-items-center pointer">
                        <BiHomeAlt2 className="aqua fs-5" />
                        <span className="ms-1 aqua poppins fs-5" onClick={() => { navigate('/') }}>Home</span>
                    </div>
                </Col>
                <Col span={24} className="mt-5 mb-3">
                    <h2 className="audiowave yellow text-center">QMAZE SCHEDULE</h2>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="text-center">
                    <h5 className="aqua audiowave">OVERALL EVENTS</h5>
                </Col>
                <Col span={22} offset={1} className="mt-3 mb-5">
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    headerBg: "#8000FF",
                                    headerColor: "yellow",
                                    footerColor: "blue"
                                },
                            }
                        }}
                    >
                        <Table columns={columns} dataSource={overallEvents} pagination={false} />
                    </ConfigProvider>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="text-center">
                    <h5 className="aqua audiowave">UG EVENTS</h5>
                </Col>
                <Col span={22} offset={1} className="mt-3 mb-5">
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    headerBg: "#8000FF",
                                    headerColor: "yellow",
                                    footerColor: "blue"
                                },
                            }
                        }}
                    >
                        <Table columns={columns} dataSource={overallUgEvents} pagination={false} />
                    </ConfigProvider>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="text-center">
                    <h5 className="aqua audiowave">PG EVENTS</h5>
                </Col>
                <Col span={22} offset={1} className="mt-3 mb-5">
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    headerBg: "#8000FF",
                                    headerColor: "yellow",
                                    footerColor: "blue"
                                },
                            }
                        }}
                    >
                        <Table columns={columns} dataSource={overallPgEvents} pagination={false} />
                    </ConfigProvider>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="text-center">
                    <h5 className="aqua audiowave">ONLINE EVENTS</h5>
                </Col>
                <Col span={22} offset={1} className="mt-3 mb-5">
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    headerBg: "#8000FF",
                                    headerColor: "yellow",
                                    footerColor: "blue"
                                },
                            }
                        }}
                    >
                        <Table columns={onlineColumns} dataSource={overallOnlineEvents} pagination={false} />
                    </ConfigProvider>
                </Col>
            </Row>
        </div>
    )
}
export default Schedule;