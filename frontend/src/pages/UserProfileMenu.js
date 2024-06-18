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


const { Content, Sider } = Layout;

const items2 = [
  { key: "lichKham", icon: <EyeOutlined />, label: "Lịch khám" },
  { key: "lichSuThanhToan", icon: <PayCircleOutlined />, label: "Lịch sử thanh toán" },
  { key: "hoSo", icon: <UserOutlined />, label: "Hồ sơ" },
  { key: "taiKhoan", icon: <ProfileOutlined />, label: "Tài khoản" },
  { key: "dangXuat", icon: <LogoutOutlined />, label: "Đăng xuất" },
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
        return <div>lich kham</div>;
      case "lichSuThanhToan":
        return <div>lich su thanh toan</div>;
      case "hoSo":
        return <div>ho so</div>;
      case "taiKhoan":
        return <UserProfile />;
      case "dangXuat":
        return <div>Đăng xuất</div>;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <div className="w-screen h-screen">
      <Headers />
      <Content style={{ padding: "0 48px", marginTop: "20px" }}>
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
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {renderContent()}
          </Content>
        </Layout>
      </Content>
    </div>
  );
};

export default UserProfileMenu;
