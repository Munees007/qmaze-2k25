import React, { useEffect, useState } from "react";
import { Row, Col, Select, Space, Divider, Input, Button, message, Tag, Typography, Form, Tooltip,Modal } from 'antd';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addNewCollege } from '../actions/generalActions';
import {updateTeamDetails,addSpotRegistration} from '../actions/adminActions';
import { FiPlus } from "react-icons/fi";
import { AiFillCloseSquare } from "react-icons/ai";
const { Title, Text } = Typography;
function AdminSpotRegistration() {
    const [searchParams] = useSearchParams()
    const teams = useSelector((state) => state?.admin?.data?.teams)
    const generalData = useSelector((state) => state?.general);
    const [collegeNames, setCollegeNames] = useState([])
    const [departmentNames, setDepartmemtName] = useState([]);
    const [teamData, setTeamData] = useState({ collegeName: "", deptName: "", deptType: "", name: "", email: "", contactNumber: "", teamMembers: [], paymentStatus: "", paymentType: "offline", paymentProof: "", eventParticipants: {} })
    const [newCollege, setNewCollege] = useState("");
    const [eventMembers, setEventMembers] = useState([]);
    const events = useSelector((state) => state?.general?.data?.general.events);
    const deptType = ["UG", "PG"]
    const paymentOption = ["Pending", "Paid"]
    const [messageApi, contextHolder] = message.useMessage();

    const [flag,setFlag]=useState(true);

    const [teamMembers, setTeamMembers] = useState([]);
    let memberTemplate = { name: "", phoneNumber: "", email: "" };

    const navigate=useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        let eventsMap = []
        if (teamData.deptType === "UG") {
            events?.ugEvents.map((value) => {
                let members = []
                let i = 0;
                while (++i <= value?.noOfMembers) members.push("");
                eventsMap.push({ eventName: value.eventName, noOfMembers: value.noOfMembers, members })
            })
        }
        if (teamData.deptType === "PG") {
            events?.pgEvents.map((value) => {
                let members = []
                let i = 0;
                while (++i <= value?.noOfMembers) members.push("");
                eventsMap.push({ eventName: value.eventName, noOfMembers: value.noOfMembers, members })
            })
        }
        events?.onlineEvents.map((value) => {
            let members = []
            let i = 0;
            while (++i <= value?.noOfMembers) members.push("");
            eventsMap.push({ eventName: value.eventName, noOfMembers: value.noOfMembers, members })
        })
        setEventMembers(eventsMap);
    }, [events,flag])
    useEffect(() => {
        const currentTeam = teams?.filter((team) => {
            return team.lotNo == searchParams.get('lotno')
        })[0];
        if (currentTeam) {
            setTeamData(currentTeam)
            setTeamMembers(currentTeam?.teamMembers)
            setEventMembers(currentTeam?.eventParticipants)
        }
    }, [teams])
    useEffect(() => {
        setCollegeNames(generalData?.data?.colleges.map((college) => { return college.collegeName }).sort())
        setDepartmemtName(generalData?.data?.departments.map((dept) => { return dept.deptName }))
    }, [generalData])
    useEffect(() => {
        console.log(teamData)
    }, [teamData])
    useEffect(() => {
        console.log(eventMembers)
    }, [eventMembers])
    const searchCollege = (text) => {

    }
    function deleteMember(index) {
        if (teamMembers.length > 1) {
            const temp = [...teamMembers];
            temp.splice(index, 1)
            setTeamMembers([...temp])
        }
        else {
            alert("Team must contain atleast one member")
        }
    }
    function updateName(index, e) {
        let tempArr = [...teamMembers];
        let temp = tempArr[index];
        temp = { ...temp, name: e.target.value.toUpperCase() }
        tempArr.splice(index, 1, temp)
        setTeamMembers(tempArr)
    }
    function updateEmail(index, e) {
        let tempArr = [...teamMembers];
        let temp = tempArr[index];
        temp = { ...temp, email: e.target.value.toLowerCase() }
        tempArr.splice(index, 1, temp)
        setTeamMembers(tempArr)
    }
    function updatePhoneNumber(index, e) {
        let tempArr = [...teamMembers];
        let temp = tempArr[index];
        temp = { ...temp, phoneNumber: e.target.value.toUpperCase() }
        tempArr.splice(index, 1, temp)
        setTeamMembers(tempArr)
    }
    const handleSelect = (x, y, value) => {
        let temp = JSON.parse(JSON.stringify(eventMembers))
        temp[x].members[y] = value
        setEventMembers(temp)
    }
    return (
        <>
            {
                contextHolder
            }
            <Row className="mt-5">
                <Col span={22} offset={1} className="mt-3">
                    <Title level={4}>
                        {
                            searchParams.get("lotno") ?
                                `Edit Team : ${searchParams.get('lotno')}` :
                                "Spot Registration"
                        }
                    </Title>
                    <Text></Text>
                </Col>
            </Row>
            <Row>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 10, offset: 1 }}>
                    <Select className="w-100" placeholder="Select your college" options={collegeNames?.map((item) => ({
                        label: item,
                        value: item,
                    }))} showSearch size="large" title="College Name" value={teamData?.collegeName} onSelect={(value) => {
                        setTeamData({ ...teamData, collegeName: value })
                        // console.log(value)
                    }}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                    plain
                                >If Name not listed, Add yours</Divider>
                                <Space
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input
                                        placeholder="Enter Your College Name"
                                        onChange={(e) => {
                                            setNewCollege(e.target.value)
                                        }}
                                        value={newCollege}
                                    />
                                    <Button type="text" icon={<FiPlus />} onClick={() => {
                                        addNewCollege(dispatch, newCollege, messageApi)
                                        setNewCollege("")
                                    }}>
                                        Add College
                                    </Button>
                                </Space>
                            </>
                        )}
                    />
                </Col>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                    <Select className="w-100" placeholder="Select your department" options={departmentNames?.map((item) => ({
                        label: item,
                        value: item,
                    }))} showSearch size="large" title="Department Name" value={teamData?.deptName} onSelect={(value) => {
                        setTeamData({ ...teamData, deptName: value })
                        // console.log(value)
                    }}
                    />
                </Col>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                    <Select className="w-100" placeholder="Select department type" options={deptType?.map((item) => ({
                        label: item,
                        value: item,
                    }))} showSearch size="large" title="Department Type" value={teamData?.deptType} onSelect={(value) => {
                        setTeamData({ ...teamData, deptType: value })
                        // console.log(value)
                    }}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                    <Input placeholder="Your Name" size="large" title="Name" onChange={(e) => {
                        setTeamData({ ...teamData, name: e.target.value.trim() })
                    }} value={teamData?.name} />
                </Col>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                    <Input placeholder="Contact Number" size="large" title="Contact Number" onChange={(e) => {
                        setTeamData({ ...teamData, contactNumber: e.target.value.trim() })
                    }} value={teamData?.contactNumber} />
                </Col>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 5, offset: 1 }} xl={{ span: 5, offset: 1 }}>
                    <Input placeholder="Email" size="large" title="Email Address" type="email" onChange={(e) => {
                        setTeamData({ ...teamData, email: e.target.value.trim() })
                    }} value={teamData?.email} />
                    <Tag className="d-flex mt-2" color="processing" bordered={false}>The above email will be used for further login</Tag>
                </Col>
                <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 4, offset: 1 }} xl={{ span: 4, offset: 1 }}>
                    <Select className="w-100" placeholder="Select payment status" options={paymentOption?.map((item) => ({
                        label: item,
                        value: item,
                    }))} showSearch size="large" title="Payment Status" value={teamData?.paymentStatus} onSelect={(value) => {
                        setTeamData({ ...teamData, paymentStatus: value })
                        // console.log(value)
                    }}
                    />
                </Col>
            </Row>
            <Title className="ms-3 mt-5" level={4}>Add Members</Title>
            <Form onSubmitCapture={(e) => {
                e.preventDefault()
                setTeamData({ ...teamData, teamMembers: teamMembers })
                setFlag(!flag)
                message.success("Team members updated")
            }}>
                {
                    teamMembers && teamMembers.map((member, index) => {
                        return (
                            <Row className="py-3 bg-white my-3 mx-3 rounded" key={index}>
                                <Col span={22} offset={1} className="d-flex align-items-center">
                                    <Title level={5} className="my-2">Member {index + 1}</Title>
                                    <Tooltip title="Delete member">
                                        <AiFillCloseSquare className="ms-3 fs-4 text-danger pointer" onClick={() => { deleteMember(index) }} />
                                    </Tooltip>
                                </Col>
                                <Row className="w-100">
                                    <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                                        <Input placeholder="Participant Name" size="large" type="text" required value={member.name} onChange={(e) => {
                                            updateName(index, e)
                                        }} />
                                    </Col>
                                    <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                                        <Input placeholder="Participant Email" size="large" type="text" required value={member.email} onChange={(e) => {
                                            updateEmail(index, e)
                                        }} />
                                    </Col>
                                    <Col className="my-2" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
                                        <Input placeholder="Participant Phone Number" size="large" type="tel" required value={member.phoneNumber} onChange={(e) => {
                                            updatePhoneNumber(index, e)
                                        }} />
                                    </Col>
                                </Row>
                            </Row>
                        )
                    })
                }
                {
                    teamMembers.length < 8 ?
                        <Row>
                            <Col span={22} offset={1} className="d-flex justify-content-end my-3">
                                <Button type="primary" onClick={() => {
                                    if (teamMembers.length < 8) {
                                        setTeamMembers([...teamMembers, memberTemplate])
                                    }
                                }}>Add Member</Button>
                            </Col>
                        </Row>
                        :
                        ""
                }

                <Row>
                    <Col span={22} offset={1} className="d-flex justify-content-end my-5">
                        <button className="btn btn-success" type="submit">Save Team Members</button>
                    </Col>
                </Row>

            </Form>
            <Title className="ms-3 mt-5" level={4}>Assign Events</Title>
            {
                eventMembers && eventMembers.map((value, index) => {
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
                    {
                        !searchParams.get("lotno")?
                        <button className="btn btn-success" onClick={() => {
                            addSpotRegistration({...teamData,teamMembers,eventParticipants:eventMembers},Modal)
                        }}>Register Team</button>:
                        <button className="btn btn-success" onClick={() => {
                            updateTeamDetails({...teamData,teamMembers,eventParticipants:eventMembers},teamData?.lotNo)
                        }}>Update Team</button>
                    }
                    <button className="btn btn-danger ms-3" onClick={() => {
                            navigate('/admin/dashboard/')
                        }}>Cancel</button>
                </Col>
            </Row>
        </>
    )
}
export default AdminSpotRegistration;