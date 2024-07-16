import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Title from "../components/Title";
import {
  Tag,
  Tooltip,
  Table,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  notification,
  Space,
  Popconfirm,
  Row,
  Col
} from 'antd';

import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  SyncOutlined,
  SearchOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [docProfileForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDocProfileModalVisible, setIsDocProfileModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [specifies, setSpecifies] = useState([]);

  const navigate = useNavigate();

  const handleViewProfile = (doctorId) => {
    navigate(`/admin/doctor-profile/${doctorId}`);
};

  useEffect(() => {
    fetchUsers();
    fetchHospitals();
    fetchSpecifies();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9999/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      notification.error({ message: 'Error fetching users', description: error.message });
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:9999/hospital');
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      notification.error({ message: 'Error fetching hospitals', description: error.message });
    }
  };

  const fetchSpecifies = async () => {
    try {
      const response = await axios.get('http://localhost:9999/specify');
      setSpecifies(response.data);
    } catch (error) {
      console.error('Error fetching specifies:', error);
      notification.error({ message: 'Error fetching specifies', description: error.message });
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingUser) {
        await axios.put(`http://localhost:9999/user/${editingUser._id}`, values);
        notification.success({ message: 'User updated successfully' });
      } else {
        await axios.post('http://localhost:9999/user/create', values);
        notification.success({ message: 'User created successfully' });
      }
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      notification.error({ message: 'Error saving user', description: error.message });
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:9999/user/${id}`);
  //     fetchUsers();
  //     notification.success({ message: 'User deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     notification.error({ message: 'Error deleting user', description: error.message });
  //   }
  // };

  const handleChangeStatus = async (id) => {
    try {
      await axios.put(`http://localhost:9999/user/status/${id}`);
      fetchUsers(); // Giả sử bạn có hàm này để lấy lại danh sách người dùng sau khi thay đổi
      notification.success({ message: 'User status updated successfully' });
    } catch (error) {
      console.error('Error updating user status:', error);
      notification.error({ message: 'Error updating user status', description: error.message });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...user,
      dob: dayjs(user.dob),
    });
  };

  const handleCreateDocProfile = (user) => {
    setEditingUser(user);
    setIsDocProfileModalVisible(true);
    docProfileForm.resetFields();
  };

  const handleDocProfileFormSubmit = async (values) => {
    try {
      // Lấy thông tin doctorProfile dựa trên ID của user
      const response = await axios.get(`http://localhost:9999/doctor/${editingUser._id}`);
      const doctorProfile = response.data.docProfile;

      if (!doctorProfile || !doctorProfile._id) {
        throw new Error('Doctor profile not found or missing _id');
      }

      // Sử dụng ID của doctorProfile trong URL của request PUT
      await axios.put(`http://localhost:9999/doctor/${doctorProfile._id}`, {
        ...values,
        doctor: editingUser._id
      });

      notification.success({ message: 'Doctor profile updated successfully' });
      setIsDocProfileModalVisible(false);
      docProfileForm.resetFields();
    } catch (error) {
      console.error('Error updating doctor profile:', error);
      notification.error({ message: 'Error updating doctor profile', description: error.message });
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: "index",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Họ Tên',
      width: 170,
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      width: 170,
      key: 'dob',
      render: (dob) => (
        <Typography.Text>
          {dayjs(dob).format("DD/MM/YYYY")} - {" "}
          {dayjs().diff(dob, "year")} tuổi
        </Typography.Text>
      )
    },
    {
      title: 'Giới tính',
      width: 90,
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Điện thoại',
      width: 120,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      width: 150,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      filters: [
        { text: 'ADMIN', value: 'ADMIN' },
        { text: 'MANAGER', value: 'MANAGER' },
        { text: 'DOCTOR', value: 'DOCTOR' },
        { text: 'PATIENT', value: 'PATIENT' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color = 'default';
        switch (role) {
          case 'ADMIN':
            color = 'red';
            break;
          case 'DOCTOR':
            color = 'green';
            break;
          case 'PATIENT':
            color = 'purple';
            break;
          case 'MANAGER':
            color = 'blue';
            break;
        }
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Đang hoạt động' : 'Dừng hoạt động'}
        </Tag>
      ),
      filters: [
        { text: 'Đang hoạt động', value: true },
        { text: 'Dừng hoạt động', value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Hành động',
      fixed: "right",
      align: "center",
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Tooltip
            title={
              record?.status ? "Bạn muốn khóa ?" : "Bạn muốn mở khóa?"
            }
          >
            <Popconfirm
              title={
                record?.status ? "Khóa tài khoản này?" : " Mở khóa tài khoản này?"
              }
              onConfirm={() => handleChangeStatus(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                icon={
                  record?.status ? <UnlockOutlined /> : <LockOutlined />
                }
              ></Button>
            </Popconfirm>
          </Tooltip>
          {record.role === 'DOCTOR' && (
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => handleCreateDocProfile(record)}
            />
          )}
          {record.role === 'DOCTOR' && (
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewProfile(record._id)}
            />
          )}
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Title title="Quản lý người dùng" />
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Button icon={<SyncOutlined />} onClick={fetchUsers}>Làm mới</Button>
            <Input
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
              prefix={<SearchOutlined />}
            />
          </Space>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Thêm người dùng
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        scroll={{ x: 'max-content' }}
        rowKey="_id"
      />
      <Modal
        title={editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng điền đúng format email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Họ tên"
            rules={[{ required: true, message: 'Vui lòng điền họ tên' }]}
          >
            <Input />
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          {editingUser && (
            <>
              <Form.Item name="dob" label="Ngày sinh">
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item name="gender" label="Giới tính">
                <Select>
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại">
                <Input />
              </Form.Item>
              <Form.Item name="address" label="Địa chỉ">
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Vui lòng chọn role' }]}
          >
            <Select disabled={editingUser}>
              <Option value="MANAGER">MANAGER</Option>
              <Option value="DOCTOR">DOCTOR</Option>
              <Option value="PATIENT">PATIENT</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tạo hồ sơ bác sĩ"
        visible={isDocProfileModalVisible}
        onCancel={() => {
          setIsDocProfileModalVisible(false);
          docProfileForm.resetFields();
        }}
        onOk={() => docProfileForm.submit()}
      >
        <Form form={docProfileForm} layout="vertical" onFinish={handleDocProfileFormSubmit}>
          <Form.Item
            name="level"
            label="Bằng cấp"
            rules={[{ required: true, message: 'Vui lòng điền bằng cấp' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="place"
            label="Nơi công tác"
            rules={[{ required: true, message: 'Vui lòng chọn nơi công tác' }]}
          >
            <Select>
              {hospitals.map(hospital => (
                <Option key={hospital._id} value={hospital._id}>{hospital.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="specify"
            label="Chuyên khoa"
            rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}
          >
            <Select mode="multiple">
              {specifies.map(specify => (
                <Option key={specify._id} value={specify._id}>{specify.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
