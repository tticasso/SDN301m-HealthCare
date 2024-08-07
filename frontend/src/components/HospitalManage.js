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
    Tooltip,
    notification,
    Space,
    Popconfirm,
    Row,
    Col
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const HospitalManage = () => {
    const [hospitals, setHospital] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingHospital, setEditingHospital] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [specifies, setSpecifies] = useState([]);

    useEffect(() => {
        fetchHospitals();
        fetchSpecifies()

    }, []);

    const fetchHospitals = async () => {
        try {
            const response = await axios.get('http://localhost:9999/hospital');
            // Kết hợp dữ liệu bệnh viện với tên chuyên khoa
            const hospitalsWithSpecifies = await Promise.all(
                response.data.map(async hospital => {
                    const specifiesResponse = await axios.get('http://localhost:9999/specify');
                    const specifyNames = hospital.specify.map(specifyId => {
                        const specify = specifiesResponse.data.find(spec => spec._id === specifyId);
                        return specify ? specify.name : '';
                    });
                    return { ...hospital, specifyNames };
                })
            );
            setHospital(hospitalsWithSpecifies);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
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
            if (editingHospital) {
                await axios.put(`http://localhost:9999/hospital/${editingHospital._id}`, values);
                notification.success({ message: 'Hospital updated successfully' });
            } else {
                await axios.post('http://localhost:9999/hospital/create', values);
                notification.success({ message: 'Hospital created successfully' });
            }
            fetchHospitals();
            setIsModalVisible(false);
            form.resetFields();
            setEditingHospital(null);
        } catch (error) {
            console.error('Error saving hospital:', error);
            notification.error({ message: 'Error saving hospital' });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/hospital/${id}`);
            fetchHospitals();
            notification.success({ message: 'Hospital deleted successfully' });
        } catch (error) {
            console.error('Error deleting hospital:', error);
            notification.error({ message: 'Error deleting hospital' });
        }
    };

    const handleEdit = (hospital) => {
        setEditingHospital(hospital);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...hospital,
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
            title: 'Tên bệnh viện',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Điện thoại (+84)',
            width: 120,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            width: 200,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Slogan',
            width: 150,
            dataIndex: 'slogan',
            key: 'slogan',
        },
        {
            title: 'Thông tin',
            width: 150,
            dataIndex: 'info',
            key: 'info',
            ellipsis: true,
            render: (text) => {
                const limit = 27; // Giới hạn số ký tự
                if (text.length <= limit) return text;
                const truncatedText = text.slice(0, limit) + '...';
                return (
                    <Tooltip title={text}>
                        {truncatedText}
                    </Tooltip>
                );
            },
        },
        {
            title: 'Giờ làm việc',
            width: 150,
            render: (_, record) => `${record.startTime} - ${record.endTime}`,
        },
        {
            title: 'Chuyên khoa',
            width: 150,
            dataIndex: 'specifyNames',
            key: 'specifyNames',
            render: (specifyNames) => specifyNames.join(', '),
        },
        {
            title: 'Hình ảnh',
            width: 150,
            dataIndex: 'image',
            key: 'image',
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
                        title="Are you sure to delete this hospital?"
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

    const filteredHospital = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Title title="Quản lý bệnh viện" />
            <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchHospitals} />
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
                        Thêm bệnh viện
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={filteredHospital} scroll={{ x: 'max-content' }} rowKey="_id" />
            <Modal
                title={editingHospital ? 'Edit Hospital' : 'Add Hospital'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingHospital(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="name"
                        label="Tên bệnh viện"
                        rules={[{ required: true, message: 'Please enter a hospital name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="(+84) Số điện thoại"
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Please enter the address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="slogan"
                        label="Slogan"
                        rules={[{ required: true, message: 'Please enter slogan' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="info"
                        label="Giới thiệu"
                        rules={[{ required: true, message: 'Please enter the description' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="startTime"
                        label="Giờ bắt đầu"
                        rules={[{ required: true, message: 'Please enter start time' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="endTime"
                        label="Giờ kết thúc"
                        rules={[{ required: true, message: 'Please enter end time' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Hình ảnh"
                        rules={[{ required: true, message: 'Please enter link image' }]}
                    >
                        <Input />
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


export default HospitalManage;

