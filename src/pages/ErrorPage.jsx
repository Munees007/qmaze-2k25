import React from "react";
import { Result, Row,Col } from 'antd';
import { Helmet } from "react-helmet";
function ErrorPage() {
    return (
        <Row>
            <Helmet>
                <title>Page not found 🥺</title>
            </Helmet>
            <Col span={24}>
                <Result
                    status="404"
                    title="Oops.."
                    subTitle="The Resource you are looking not found."
                />
            </Col>
        </Row>
    )
}
export default ErrorPage;