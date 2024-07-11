import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Space,
  Popconfirm,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SyncOutlined, 
  SearchOutlined 
} from '@ant-design/icons';
import Title from "../components/Title";

const { Option } = Select;

const DoctorProfileManagement = () => {
  const [doctorProfiles, setDoctorProfiles] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [specifies, setSpecifies] = useState([]);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctorProfiles();
    fetchHospitals();
    fetchSpecifies();
    fetchUsers();
  }, []);

  const fetchDoctorProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:9999/doctor');
      setDoctorProfiles(response.data);
    } catch (error) {
      console.error('Error fetching doctor profiles:', error);
      notification.error({ message: 'Error fetching doctor profiles', description: error.message });
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9999/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      notification.error({ message: 'Error fetching users', description: error.message });
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingProfile) {
        await axios.put(`http://localhost:9999/doctor/${editingProfile._id}`, values);
        notification.success({ message: 'Doctor profile updated successfully' });
      } else {
        await axios.post('http://localhost:9999/doctor/create', values);
        notification.success({ message: 'Doctor profile created successfully' });
      }
      fetchDoctorProfiles();
      setIsModalVisible(false);
      form.resetFields();
      setEditingProfile(null);
    } catch (error) {
      console.error('Error saving doctor profile:', error);
      notification.error({ message: 'Error saving doctor profile', description: error.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/doctor/${id}`);
      fetchDoctorProfiles();
      notification.success({ message: 'Doctor profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting doctor profile:', error);
      notification.error({ message: 'Error deleting doctor profile', description: error.message });
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...profile,
      doctor: profile.doctor._id
    });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 70,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Bác sĩ',
      dataIndex: ['doctor', 'fullname'],
      key: 'doctorName',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: ['doctor', 'email'],
      key: 'email',
      width: 200,
    },
    {
      title: 'Bằng cấp',
      dataIndex: 'level',
      key: 'level',
      width: 150,
    },
    {
      title: 'Nơi công tác',
      dataIndex: 'place',
      key: 'place',
      width: 200,
      render: (placeId) => {
        const hospital = hospitals.find(h => h._id === placeId);
        return hospital ? hospital.name : '-';
      },
    },
    {
      title: 'Chuyên khoa',
      dataIndex: 'specify',
      key: 'specify',
      width: 200,
      render: (specifyIds) => {
        return specifyIds.map(id => {
          const specify = specifies.find(s => s._id === id);
          return specify ? specify.name : '';
        }).join(', ');
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xóa hồ sơ này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredProfiles = doctorProfiles.filter(profile =>
    profile.doctor.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Title title="Quản lý hồ sơ bác sĩ" />
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Button icon={<SyncOutlined />} onClick={fetchDoctorProfiles}>Làm mới</Button>
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
            Thêm hồ sơ bác sĩ
          </Button>
        </Col>
      </Row>
      <Table 
        columns={columns} 
        dataSource={filteredProfiles} 
        rowKey="_id"
        scroll={{ x: 'max-content' }}
      />
      <Modal
        title={editingProfile ? 'Cập nhật hồ sơ bác sĩ' : 'Thêm hồ sơ bác sĩ'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingProfile(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="doctor"
            label="Bác sĩ"
            rules={[{ required: true, message: 'Vui lòng chọn bác sĩ' }]}
          >
            <Select>
              {users.map(user => (
                <Option key={user._id} value={user._id}>{user.fullname}</Option>
              ))}
            </Select>
          </Form.Item>
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

export default DoctorProfileManagement;