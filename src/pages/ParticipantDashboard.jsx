import React, { useEffect, useState } from "react";
import { Layout, Menu,message } from 'antd';
import AddTeamMates from "../components/AddTeamMates";
import AssignEvents from "../components/AssignEvents";
import ParticipantDash from "../components/ParticipantDash";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { auth } from '../db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getParticipantDetails,logoutParticipant } from '../actions/participantActions';
import { Helmet } from "react-helmet";

import { BiSolidDashboard } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
const { Content, Sider } = Layout;


function ParticipantDashboard() {
    const participantData = useSelector((state) => state?.participant);
    const [messageApi, contextHolder] = message.useMessage();
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!participantData.authenticated)
            navigate('/register')
    }, [participantData])
    useEffect(() => {
        if (!participantData.authenticated)
            getParticipantDetails(dispatch, user?.email, navigate);
    }, [user])

    const items = [{ key: "0",icon:<BiSolidDashboard/>, label: "Dashboard" }, { key: "1",icon:<IoMdPersonAdd/>, label: "Manage Team" }, { key: "2",icon:<MdOutlineAssignmentInd/>, label: "Assign Event" }, { key: "3",icon:<IoMdLogOut/>, label: "Logout" }]
    const [open, setOpen] = useState("0");

    return (
        <>
            {contextHolder}
            <Helmet>
                <title>Participant Dashboard | Qmaze</title>
                <meta name="theme-color" content="#fff" />
            </Helmet>
            <Layout style={{ height: "100vh" }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    width={240}
                >
                    <h5 className="text-center audiowave aqua my-5">QMAZE</h5>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={open} items={items} onSelect={({ key }) => {
                        if(key==="3"){
                            logoutParticipant(dispatch,navigate,messageApi)
                        }
                        setOpen(key)
                    }} />
                </Sider>
                <Layout>
                    <Content style={{overflowY:"scroll"}}>
                        {
                            open==="0"?
                            <ParticipantDash/>
                            :
                            open==="1"?
                            <AddTeamMates/>
                            :
                            open==="2"?
                            <AssignEvents/>
                            :
                            ""
                        }
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default ParticipantDashboard;