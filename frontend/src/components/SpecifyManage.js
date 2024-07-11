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
  const [specialties, setSpecialties] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get('http://localhost:9999/specify');
      setSpecialties(response.data);
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingSpecialty) {
        await axios.put(`http://localhost:9999/specify/${editingSpecialty._id}`, values);
        notification.success({ message: 'Specialty updated successfully' });
      } else {
        await axios.post('http://localhost:9999/specify/create', values);
        notification.success({ message: 'Specialty created successfully' });
      }
      fetchSpecialties();
      setIsModalVisible(false);
      form.resetFields();
      setEditingSpecialty(null);
    } catch (error) {
      console.error('Error saving specialty:', error);
      notification.error({ message: 'Error saving specialty' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/specify/${id}`);
      fetchSpecialties();
      notification.success({ message: 'Specialty deleted successfully' });
    } catch (error) {
      console.error('Error deleting specialty:', error);
      notification.error({ message: 'Error deleting specialty' });
    }
  };

  const handleEdit = (specialty) => {
    setEditingSpecialty(specialty);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...specialty,
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
          </Button>
          <Popconfirm
            title="Are you sure to delete this specialty?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Title title="Quản lý chuyên khoa" />
      <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
        <Col>
          <Space>
            <Button icon={<SyncOutlined />} onClick={fetchSpecialties} />
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
      <Table columns={columns} dataSource={filteredSpecialties} scroll={{ x: 'max-content' }} rowKey="_id" />
      <Modal
        title={editingSpecialty ? 'Sửa chuyên khoa' : 'Thêm chuyên khoa'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingSpecialty(null);
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

