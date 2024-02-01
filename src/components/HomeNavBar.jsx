import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import '../styles/homenavbar.css';
import { Modal } from "antd";
import Fade from 'react-reveal/Fade';
import { useNavigate } from "react-router-dom";
import data from '../utils/events.json';
function HomeNavBar({setActiveBtn}) {
    const navigate=useNavigate()
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const[eventSubMenu,setEventSubMenu]=useState(false);
    const[modal,setModal]=useState(false);
    return (
        <>
            <Fade top>
            <header className="w-100 d-flex justify-content-center home-header" onMouseLeave={()=>{setEventSubMenu(false)}}>
                <nav className="d-flex justify-content-center align-items-center">
                    <a href="#home">HOME</a>
                    <a href="#events">
                        <span onClick={()=>{setActiveBtn(1)}}>EVENTS</span>
                        <FaAngleDown className="ms-2 p-relative" onMouseEnter={()=>{setEventSubMenu(true)}}/>
                        <div className="home-events-submenu" style={{visibility:`${eventSubMenu?"visible":"hidden"}`}}>
                            <a href="#events" onClick={()=>{setActiveBtn(2)}}>UG EVENTS</a>
                            <a href="#events" onClick={()=>{setActiveBtn(3)}}>PG EVENTS</a>
                            <a href="#events" onClick={()=>{setActiveBtn(4)}}>ONLINE EVENTS</a>
                        </div>
                    </a>
                    {/*eslint-disable-next-line */}
                    <a href="#" onClick={()=>{navigate('/schedule')}}>SCHEDULE</a>
                    {/*eslint-disable-next-line */}
                    <a href="#" onClick={()=>{setModal(true)}}>INSTRUCTIONS</a>
                    <a href="#gallery">GALLERY</a>
                    <a href="#contactus">CONTACT</a>
                    <HiMenu className="fs-1 home-mobile-menu-btn pointer" style={{ color: "#34B3F1" }} onClick={() => { setOpenMobileMenu(true) }} />
                </nav>
            </header>
            </Fade>
            <div className="home-mobile-menu-container flex-column justify-content-center align-items-center" style={{ visibility: `${openMobileMenu && (window.innerWidth < 1023) ? "visible" : "hidden"}` }}>
                <IoCloseCircleOutline className="home-mobile-close-btn pointer" style={{ color: "#34B3F1", fontSize: "48px" }} onClick={() => {
                    setOpenMobileMenu(false)
                }} />
                <a href="#home" onClick={() => {
                    setOpenMobileMenu(false)
                }}>HOME</a>
                <a href="#events" onClick={() => {
                    setOpenMobileMenu(false)
                    setActiveBtn(1)
                }}>
                    <span>EVENTS</span>
                </a>
                {/*eslint-disable-next-line */}
                <a href="#" onClick={() => {
                    setOpenMobileMenu(false)
                    navigate('/schedule')
                }}>SCHEDULE</a>
                {/*eslint-disable-next-line */}
                <a href="#" onClick={() => {
                    setOpenMobileMenu(false)
                    setModal(true)
                }}>INSTRUCTIONS</a>
                <a href="#gallery" onClick={() => {
                    setOpenMobileMenu(false)
                }}>GALLERY</a>
                <a href="#contactus" onClick={() => {
                    setOpenMobileMenu(false)
                }}>CONTACT</a>
            </div>
            <Modal title="General Instructions" open={modal} onCancel={()=>{setModal(false)}} onOk={()=>{setModal(false)}}>
                <ul>
                    {
                        data?.generalRules.map((rule,index)=>{
                            return(
                                <li className="my-2" key={index}>{rule}</li>
                            )
                        })
                    }
                </ul>
            </Modal>
        </>
    )
}
export default HomeNavBar;