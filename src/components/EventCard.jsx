import React, { useState } from "react";
import { Modal, ConfigProvider } from 'antd';
import { IoTimeOutline } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { HiLocationMarker } from "react-icons/hi";
import '../styles/home.css';
function EventCard({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="event-card-container" data-aos="fade-up" data-aos-duration="800">
                <div className="event-card-container-overlay">
                    <div className="events-card-tag-container my-4">
                        {
                            data?.type.map((val, index) => {
                                return (
                                    <span className="bg-aqua cyan poppins" key={index}>{val}</span>
                                )
                            })
                        }
                    </div>
                    <img src={data?.imgUrl} alt="qmaze 2k24" style={{ width: "200px" }} />
                    <h5 className="aqua poppins fw-bold my-0">{data?.eventName}</h5>
                    <div className="mt-4 d-flex align-items-center">
                        <IoTimeOutline className="fs-5" style={{ color: "yellow" }} />
                        <span className="aqua poppins my-0 ms-2">{data?.time}</span>
                    </div>
                    <div className="mt-3 d-flex align-items-center">
                        <HiLocationMarker className="fs-5" style={{ color: "yellow" }} />
                        <span className="aqua poppins my-0 ms-2">{data?.venue}</span>
                    </div>
                    {
                        data?.rules && data.rules.length > 0 ?
                            <div className="mt-4 d-flex align-items-center pointer" onClick={() => { setIsModalOpen(true) }}>
                                <VscEye className="fs-5" style={{ color: "yellow" }} />
                                <span className="poppins my-0 ms-2" style={{ color: "yellow" }}>View Rules</span>
                            </div> :
                            ""
                    }

                </div>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleColor: "#072A51",
                            titleLineHeight: "3"
                        },
                    },
                }}
            >
                <Modal title={`${data?.eventName} (${data?.alias})`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    {
                        data?.topics ?
                            <div>
                                <h6>Topics</h6>
                                <ul>
                                    {
                                        data?.topics.map((val, index) => {
                                            return (
                                                <li key={index} className="my-2">{val}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            ""
                    }
                    {
                        data?.rules ?
                            <div>
                                <h6>Rules</h6>
                                <ul>
                                    {
                                        data?.rules.map((val, index) => {
                                            return (
                                                <li key={index} className="my-2">{val}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            ""
                    }
                </Modal>
            </ConfigProvider>
        </>
    )
}
export default EventCard;