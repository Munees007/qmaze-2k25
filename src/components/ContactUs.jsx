import React from "react";
import {  useSelector } from "react-redux";
import {Row,Col} from 'antd';
import ContactCard from "./ContactCard";
function ContactUs()
{
    const data=useSelector((state)=>state?.general?.data?.general)
    return(
        <Row className="contactus-container py-5 x-hidden" id="contactus">
            <Col span={24}>
                <h1 className="audiowave aqua text-center">Contact Us</h1>
            </Col>
            <Col span={22} offset={1} className="my-5 d-flex flex-wrap justify-content-center gap-5">
                {
                    data?.contact.map((value,index)=>{
                        return(
                            <ContactCard contact={value} key={index}/>
                        )
                    })
                }
            </Col>
        </Row>
    )
}
export default ContactUs;