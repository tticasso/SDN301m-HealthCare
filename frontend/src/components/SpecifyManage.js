import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from "../components/Title";
import {
  Table,
  Button,
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
import { PlusOutlined, DeleteOutlined, EditOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const SpecifyManage = () => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingUser) {
        await axios.put(`/user/${editingUser._id}`, values);
        notification.success({ message: 'User updated successfully' });
      } else {
        await axios.post('/user/create', values);
        notification.success({ message: 'User created successfully' });
      }
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      notification.error({ message: 'Error saving user' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/user/${id}`);
      fetchUsers();
      notification.success({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      notification.error({ message: 'Error deleting user' });
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
      title: 'Tên chuyên khoa',
      width: 170,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      width: 150,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'actions',
      fixed: "right",
      align: "center",
      width: 150,
      ellipsis: true,
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user =>
    user.email.includes(searchTerm) ||
    user.fullname.includes(searchTerm)
  );

  return (
    <div style={{ padding: 20 }}>
      <Title title="Quản lý chuyên khoa" />
      <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
        <Col>
          <Space>
            <Button icon={<SyncOutlined />} onClick={fetchUsers} />
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
            Thêm chuyên khoa
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredUsers} scroll={{ x: 'max-content' }} rowKey="_id" />
      <Modal
        title={editingUser ? 'Sửa chuyên khoa' : 'Thêm chuyên khoa'}
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
            name="name"
            label="Tên chuyên khoa"
            rules={[{ required: true, message: 'Vui lòng điền chuyên khoa' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng điền mô tả' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SpecifyManage;
