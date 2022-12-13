import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
const { Meta } = Card;
const Company = (
    { company }
) => {
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={<img alt="example" src={company.image} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={company.name}
        description={company.short_pitch}
      />
    </Card>
  );
};
export default Company;
