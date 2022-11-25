
import { Layout, Row, Col } from "antd";
import {  MoneyCollectTwoTone } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2021, made with
            {< MoneyCollectTwoTone />} by
            <a href="#pablo" className="font-weight-bold" target="_blank">
             FundGator
            </a>
            for a better Investment.
          </div>
        </Col>

      </Row>
    </AntFooter>
  );
}

export default Footer;
