import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import '../styles/home.css';
import { Spin, Row, Col } from "antd";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import EventsSection from '../components/EventsSection';
import Gallery from "../components/Gallery";
import YoutubeBanner from "../components/YoutubeBanner";
import ContactUs from "../components/ContactUs";
import CountDown from "../components/CountDown";
import Footer from "../components/Footer";
import ImportantLinks from "../components/ImportantLinks";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from '../actions/generalActions';
import { ImSpinner9 } from "react-icons/im";
function Home() {
    const [activeBtn, setActiveBtn] = useState(1);
    const generalData = useSelector((state) => state?.general)
    const general=useSelector((state)=>state?.general?.data?.general)
    const dispatch = useDispatch()
    useEffect(() => {
        console.clear();
        if (generalData.result === false)
            fetchData(dispatch);
    }, [])
    return (
        <>
            <Helmet>
                <meta name="theme-color" content="#000" />
            </Helmet>
            {
                !generalData?.result ?
                    <Row>
                        <Col span={24} style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
                            <Spin size="large"/>
                        </Col>
                    </Row>
                    :
                    <>
                        <ImportantLinks/>
                        <div style={{ backgroundColor: "#000" }}>
                            <HeroSection setActionBtn={setActiveBtn} />
                            <AboutUs brouchureLink={general?.brouchureLink} />
                            <EventsSection activeBtn={activeBtn} setActiveBtn={setActiveBtn} scheduleLink={general?.scheduleLink} />
                            <Gallery />
                            <YoutubeBanner videoLink={general?.youtubeBannerLink}/>
                            <ContactUs />
                            <CountDown />
                            <Footer />
                        </div>
                    </>
            }

        </>
    )
}
export default Home;