import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import { auth } from '../db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { message, Layout, Menu } from 'antd';
import AdminRegisteredTeams from "../components/AdminRegisteredTeams";
import AdminEventWiseTeams from "../components/AdminEventWise";
import AdminSpotRegisterion from '../components/AdminSpotRegistration';
import AdminDash from "../components/AdminDash";
import ManageNetmazeQuestions from "../components/ManageNetmazeQuestions";
import ManageNetmazeParticipants from "../components/ManageNetmazeParticipants";
import NetmazeDashboard from '../components/NetmazeDashboard';
import ErrorPage from '../pages/ErrorPage';
import { fetchAdminData,logoutAdmin } from '../actions/adminActions';
import {fetchData} from '../actions/generalActions';
import { Helmet } from "react-helmet";
const { Content, Sider } = Layout;
function AdminDashboard() {
    const admin = useSelector((state) => state?.admin);
    const general=useSelector((state)=>state?.general);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const [messageApi, ContextHolder] = message.useMessage();
    const [open, setOpen] = useState("0");
    const items = [
        {
            key: 0,
            label: "Dashboard"
        }, {
            key: 1,
            label: "Manage Teams",
            children: [
                {
                    key: 2,
                    label: "Spot Registration"
                },
                {
                    key: 3,
                    label: "Registered Teams"
                },
                {
                    key: 4,
                    label: "Eventwise Report"
                }
            ]
        },
        {
            key:10,
            label:"Netmaze",
            children:[
                {
                    key:13,
                    label:"Dashboard"
                },
                {
                    key:11,
                    label:"Manage Questions"
                },
                {
                    key:12,
                    label:"Manage Participants"
                }
            ]
        },
        {
            key: 100,
            label: "Logout"
        }
    ]
    useEffect(() => {
        if (!admin.authenticated)
            navigate('/admin')
    }, [admin])
    useEffect(() => {
        if (!admin.authenticated)
            fetchAdminData(user?.email, dispatch, messageApi, navigate)
    }, [user])
    useEffect(()=>{
        if(!general.result)
            fetchData(dispatch);
    },[general])

    function handleMenu(key) {
        if(key==0)
            navigate('/admin/dashboard/')
        else if(key==2)
            navigate('/admin/dashboard/team')
        else if(key==3)
            navigate('/admin/dashboard/teams')
        else if(key==4)
            navigate('/admin/dashboard/eventwise')
        else if(key==11)
            navigate('/admin/dashboard/netmaze/manage-questions')
        else if(key==12)
            navigate('/admin/dashboard/netmaze/manage-participants')
        else if(key==13)
            navigate('/admin/dashboard/netmaze/dashboard')
        else if(key==100)
            logoutAdmin(dispatch,navigate,messageApi)

    }

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Qmaze</title>
                <meta name="theme-color" content="#fff" />
            </Helmet>
            <Layout style={{ height: "100vh" }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    width={240}
                >
                    <h5 className="text-center audiowave aqua my-5">ADMIN</h5>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={open} items={items} onSelect={({ key }) => {
                        setOpen(key)
                        handleMenu(key)
                    }} />
                </Sider>
                <Layout>
                    <Content style={{ overflowY: "scroll" }}>
                        <Routes>
                            <Route exact path="/" element={<AdminDash/>} />
                            <Route path="team" element={<AdminSpotRegisterion/>} />
                            <Route path="teams" element={<AdminRegisteredTeams/>} />
                            <Route path="eventwise" element={<AdminEventWiseTeams/>} />
                            <Route path="netmaze/manage-questions" element={<ManageNetmazeQuestions/>}/>
                            <Route path="netmaze/manage-participants" element={<ManageNetmazeParticipants/>}/>
                            <Route path="netmaze/dashboard" element={<NetmazeDashboard/>}/>
                            <Route path="*" element={<ErrorPage/>} />
                            <Route path="netmaze/*" element={<ErrorPage/>} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default AdminDashboard;