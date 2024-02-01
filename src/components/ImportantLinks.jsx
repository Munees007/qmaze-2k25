import React from "react";
import {Row,Col} from 'antd';
import {useSelector} from 'react-redux';
import Marquee from "react-fast-marquee";
function ImportantLinks(){
    const links=useSelector((state)=>state?.general?.data?.general.importantLinks)
    return(
        <Row className="py-3 bg-black">
            <Col span={24}>
                {
                    links.length>0?
                    <Marquee pauseOnHover={true} speed={50}>
                        {
                            links.map((link,index)=>{
                                return(
                                    <a className="important-links poppins mx-5 fs-6" href={link.url} target="_blank" key={index}>{link.title}</a>
                                )
                            })
                        }
                    </Marquee>
                    :
                    ""
                }
            </Col>
        </Row>
    )
}
export default ImportantLinks;