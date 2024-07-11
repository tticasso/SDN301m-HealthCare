import React, { useState, useEffect } from 'react';
import Headers from "../components/Header";
import {
  UserOutlined,
  PayCircleOutlined,
  ProfileOutlined,
  LogoutOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import UserProfile from './UserProfile';
import BookingHistory from '../components/BookingHistory';
import PrescriptionDetail from '../components/PrescriptionDetail';


const { Content, Sider } = Layout;

const items2 = [
  { key: "lichKham", icon: <EyeOutlined />, label: "Lịch khám" },
  { key: "lichSuThanhToan", icon: <PayCircleOutlined />, label: "Lịch sử thanh toán" },
  { key: "taiKhoan", icon: <ProfileOutlined />, label: "Tài khoản" },
];

const UserProfileMenu: React.FC = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(location.state?.selectedTab || "lichKham");

  useEffect(() => {
    if (location.state?.selectedTab) {
      setSelectedMenu(location.state.selectedTab);
    }
  }, [location.state]);

  const renderContent = () => {
    switch (selectedMenu) {
      case "lichKham":
        return <BookingHistory />;
      case "lichSuThanhToan":
        return <PrescriptionDetail/>;
      case "taiKhoan":
        return <UserProfile />;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <div className="w-screen h-screen">
      <Headers />
      <Content style={{ padding: "0 48px", marginTop: "20px"}}>
        <Layout
          style={{
            padding: "24px 0",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Sider style={{ background: "#f0f2f5" }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedMenu]}
              selectedKeys={[selectedMenu]}
              style={{ height: "100%" }}
              items={items2}
              onClick={(e) => setSelectedMenu(e.key)}
            />
          </Sider>
          <Content style={{ minHeight: 280 }}>
            {renderContent()}
          </Content>
        </Layout>
      </Content>
    </div>
  );
};

export default UserProfileMenu;
