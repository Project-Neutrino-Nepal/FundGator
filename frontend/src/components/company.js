import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
const { Meta } = Card;
const Company = ({ company }) => {
  return (
    <Card
      className="m-2"
      style={{
        width: 300,
      }}
      cover={
        <img alt="example" src={company.company.image} style={{ height: "25em" }} />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={company.company.name} />
    </Card>
  );
};
export default Company;
