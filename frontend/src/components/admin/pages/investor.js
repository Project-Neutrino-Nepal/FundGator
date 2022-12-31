import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    title: "Profile",
    dataIndex: "profile",
    key: "profile",
  },
  {
    title: "Legal Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => (text ? text : "N/A"),
    // search in row with name
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search Name`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  },
  {
    title: "Email",
    dataIndex: "function",
    key: "function",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (text) => (text ? text : "N/A"),
  },
  {
    title: "PAN No",
    dataIndex: "pan_No",
    key: "pan_No",
    // if pan_No is not available then show N/A
    render: (text) => (text ? text : "N/A"),
  },
  {
    title: "Member Since",
    key: "employed",
    dataIndex: "employed",
    // first sort by date, then by name
    sorter: (a, b) => a.employed.localeCompare(b.employed),
    // show the date in a readable format
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    // if Active then show green, else show red
    render: (text) =>
      text === "Active" ? (
        <span style={{ color: "green" }}>{text}</span>
      ) : (
        <span style={{ color: "red" }}>{text}</span>
      ),
  },
  {
    title: "Actions",
    key: "action",
    dataIndex: "action",
  },
];

function InvestorAdmin() {
  const [profiles, setProfiles] = useState([]);

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  // fetching Profile data from API and map multiple times to show in table
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile/api/get-profiles", config)
      .then((res) => {
        const profiles = res.data.profiles;
        setProfiles(profiles);
        console.log(profiles)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const configurations = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  // suspend user api

  const suspendUser = (id) => {
    // chaeck if user is admin or not
    const admin = localStorage.getItem("admin");
    if (admin === "true") {
    axios
      .put("http://localhost:5000/users/api/suspend/" + id, configurations)
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    } else {
      toast.error("You are not Authorized to perform this action");
    }
  };

  const activateUser = (id) => {
    // chaeck if user is admin or not
    const admin = localStorage.getItem("admin");
    if (admin === "true") {

    axios
      .put("http://localhost:5000/users/api/activate/" + id, configurations)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    } else {
      toast.error("You are not Authorized to perform this action");
    }
  };

  const data = profiles.map((profile) => {
    return {
      key: profile._id,
      profile: (
        <img
          src={profile.avatar}
          alt="profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
      name: profile.legal_name ? profile.legal_name : profile.name,
      function: profile.email,
      employed: profile.createdAt,
      phone: profile.phone,
      status: profile.user.status === true ? "Active" : "Suspended",
      pan_No: profile.pan_No,
      action:
        // if status is Active then show Deactivate, else show Activate
        profile.user.status === true ? (
          <a
            onClick={() => suspendUser(profile.user._id)}
            style={{ color: "red" }}
          >
            Suspend
          </a>
        ) : (
          <a
            onClick={() => activateUser(profile.user._id)}
            style={{ color: "green" }}
          >
            Activate
          </a>
        ),
    };
  });
  return (
    <>
      <ToastContainer />

      <div className="tabled" id="AdminInvestor">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Investor Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={true}
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

export default InvestorAdmin;
