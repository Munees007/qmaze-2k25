import React from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import {Row,Col} from 'antd';
import { MdOutlineFileDownload } from "react-icons/md";
import venue from '../assets/venue-icon.png';
import starofqmaze from '../assets/star-of-qmaze.png';
import fee from '../assets/money.png';
function EventsSection({activeBtn,setActiveBtn,scheduleLink}){
    const typeMap={1:"General",2:"ugEvents",3:"pgEvents",4:"onlineEvents"}
    const eventData=useSelector((state)=>state?.general?.data?.general)
    return(
        <div className="event-section-container py-5 x-hidden" id="events"> 
            <Row>
                <Col span={24} offset={0} className="square-blink">
                </Col>
                <Col span={24} className="mt-5 audiowave">
                    <h1 className="text-center aqua">Events of Qmaze</h1>
                </Col>
                <Col span={22} offset={1} className="d-flex justify-content-center gap-4 my-4 flex-wrap">
                    <button className={`${activeBtn===1?"events-section-filtered-btn":"events-section-filter-btn"}`} onClick={()=>{
                        setActiveBtn(1)
                    }}>General</button>
                    <button className={`${activeBtn===2?"events-section-filtered-btn":"events-section-filter-btn"}`} onClick={()=>{
                        setActiveBtn(2)
                    }}>UG Events</button>
                    <button className={`${activeBtn===3?"events-section-filtered-btn":"events-section-filter-btn"}`} onClick={()=>{
                        setActiveBtn(3)
                    }}>PG Events</button>
                    <button className={`${activeBtn===4?"events-section-filtered-btn":"events-section-filter-btn"}`} onClick={()=>{
                        setActiveBtn(4)
                    }}>Online Events</button>
                </Col>
                <Col span={22} offset={1} className="my-5 d-flex flex-wrap gap-5 justify-content-center align-items-center">
                    {
                        eventData?.events[typeMap[activeBtn]].map((data,index)=>{
                            return(
                                <EventCard data={data} key={index} />
                            )
                        })
                    }
                </Col>
                <Col span={22} offset={1} className="d-flex justify-content-center pointer">
                    <div className="d-flex align-items-center my-2 w-auto" onClick={()=>{
                        window.open(scheduleLink,"_blank")
                    }}>
                        <MdOutlineFileDownload className="aqua fs-3"/>
                        <span className="aqua poppins fw-bold ms-2">Download Schedule</span>
                    </div>
                </Col>
                <Col span={22} offset={1} style={{marginTop:"72px"}}>
                    <p className="aqua poppins fs-5 text-center">WE LOOK FORWARD TO YOUR PRESENCE ON THE DAY</p>
                </Col>
                <Col span={22} offset={1} className="d-flex justify-content-center flex-wrap" style={{gap:"84px"}}>
                    <div className="qmaze-info-section-container" data-aos="zoom-in-up" data-aos-duration="1200" data-aos-delay="700">
                        <img src={venue} alt="qmaze" style={{width:"200px"}}/>
                        <h4 className="my-2 fw-bold" style={{color:"yellow"}}>VENUE</h4>
                        <p className="poppins text-white fs-6 my-3">Seminar Hall, C Block</p>
                    </div>
                    <div className="qmaze-info-section-container" data-aos="zoom-in-up" data-aos-duration="1200" data-aos-delay="900">
                        <img src={starofqmaze} alt="qmaze" style={{width:"200px"}}/>
                        <h4 className="my-2 fw-bold" style={{color:"yellow"}}>STAR OF QMAZE</h4>
                        <p className="poppins text-white fs-6 my-3 text-center">Participants will be selected based on their performance (Top 5 Colleges)Tasks will be given on the stage.</p>
                    </div>
                    <div className="qmaze-info-section-container" data-aos="zoom-in-up" data-aos-duration="1200" data-aos-delay="1100">
                        <img src={fee} alt="qmaze" style={{width:"200px"}}/>
                        <h4 className="my-2 fw-bold" style={{color:"yellow"}}>REGISTRATION FEE</h4>
                        <p className="poppins text-white fs-6 my-3">₹200 for per participant</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default EventsSection;