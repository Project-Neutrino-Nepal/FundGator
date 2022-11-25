
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    message,
    Progress,
    Avatar,
    Typography,
  } from "antd";
  
  import { ToTopOutlined } from "@ant-design/icons";
  import { Link } from "react-router-dom";
  
  // Images
  import ava1 from "../assets/images/logo-shopify.svg";
  import ava2 from "../assets/images/logo-atlassian.svg";
  import ava3 from "../assets/images/logo-slack.svg";
  import ava5 from "../assets/images/logo-jira.svg";
  import ava6 from "../assets/images/logo-invision.svg";
  import pencil from "../assets/images/pencil.svg";
  
  const { Title } = Typography;
  
  const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // project table start
  const project = [
    {
      title: "COMPANIES",
      dataIndex: "name",
      width: "32%",
    },
    {
      title: "BUDGET",
      dataIndex: "age",
    },
    {
      title: "STATUS",
      dataIndex: "address",
    },
    {
      title: "COMPLETION",
      dataIndex: "completion",
    },
  ];
  const dataproject = [
    {
      key: "1",
  
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Spotify Version</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$14,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={30} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "2",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Progress Track</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$3,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={10} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "3",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}> Jira Platform Errors</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">Not Set</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">done</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={100} size="small" format={() => "done"} />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "4",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}> Launch new Mobile App</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$20,600</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">canceled</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress
              percent={50}
              size="small"
              status="exception"
              format={() => "50%"}
            />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "5",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Web Dev</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$4,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={80} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  
    {
      key: "6",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Redesign Online Store</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      age: (
        <>
          <div className="semibold">$2,000</div>
        </>
      ),
      address: (
        <>
          <div className="text-sm">canceled</div>
        </>
      ),
      completion: (
        <>
          <div className="ant-progress-project">
            <Progress percent={0} size="small" />
            <span>
              <Link to="/">
                <img src={pencil} alt="" />
              </Link>
            </span>
          </div>
        </>
      ),
    },
  ];
  
  function CompanyAdmin() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Projects Table"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="all">
                      <Radio.Button value="all">All</Radio.Button>
                      <Radio.Button value="online">ONLINE</Radio.Button>
                      <Radio.Button value="store">STORES</Radio.Button>
                    </Radio.Group>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={project}
                    dataSource={dataproject}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default CompanyAdmin;
  