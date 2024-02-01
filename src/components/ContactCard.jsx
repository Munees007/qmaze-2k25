import React from 'react';
import { IoCall } from "react-icons/io5";
import { PiPhoneDisconnect } from "react-icons/pi";
function ContactCard({contact}){
    return(
        <div className='contactcard-container' data-aos="flip-right" data-aos-duration="600" data-aos-delay="500">
            <div className='contactcard-container-overlay'>
                <h3 className='fw-bold mt-4 text-center px-4'>{contact?.designation}</h3>
                <div className='profile mt-3' style={{background:`url(${contact?.imgUrl})`}}></div>
                <h5 className='aqua mt-3'>{contact?.name}</h5>
                <div className='mt-4 d-flex align-items-center'>
                    <IoCall className='fs-6 aqua'/>
                    <span className='fs-7 aqua ms-2 poppins'>{contact?.phoneNumber}</span>
                </div>
                <a href={`tel:${contact?.phoneNumber}`} className='mt-4 mb-4' style={{textDecoration:"none"}}>
                    <div style={{color:"#00FFF0"}} className='makeacall-btn d-flex align-items-center'>
                        <PiPhoneDisconnect className='fs-4'/>
                        <span className='poppins ms-3'>Make a call</span>
                    </div>
                </a>
            </div>
        </div>
    )
}
export default ContactCard;