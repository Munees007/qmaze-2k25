import React, { useState } from "react";
import { Row, Col, Image } from 'antd';
import g1 from '../assets/g1.JPG';
import g2 from '../assets/g2.JPG';
import g3 from '../assets/g3.JPG';
import g4 from '../assets/g4.JPG';
import g5 from '../assets/g5.JPG';
import g6 from '../assets/g6.JPG';
function Gallery() {
    // eslint-disable-next-line
    const [data,setData]=useState([g1,g2,g3,g4,g5,g6]);
    return (
        <Row style={{ backgroundColor: "black" }} className="py-5 my-3 x-hidden" id="gallery" data-aos="fade-up" data-aos-duration="1200">
            <Col span={24}>
                <h1 className="gallery-section-title fw-bold text-center mb-5">Photo Gallery</h1>
            </Col>
            <Col span={22} offset={1} className="d-flex flex-wrap justify-content-center gap-4">
                <Image.PreviewGroup>
                    {
                        data.map((url,index)=>{
                            return(
                                <Image src={url} width={400} key={index}/>
                            )
                        })
                    }
                </Image.PreviewGroup>
            </Col>
        </Row>
    )
}
export default Gallery;