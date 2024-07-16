import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Spin, notification, Button, Modal, Form, DatePicker, TimePicker, List } from 'antd';
import Title from './Title';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [scheduleData, setScheduleData] = useState([]);
    const [formData, setFormData] = useState({
        day: null,
        slots: [],
        note: ''
    });

    // Fetch doctor profile data
    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/doctor/${id}`);
                const { docProfile, doctor } = response.data;

                const { level, place, specify } = docProfile;
                const { fullname, email } = doctor;

                // Fetch hospital name
                const hospitalResponse = await axios.get(`http://localhost:9999/hospital/${place}`);
                const hospitalName = hospitalResponse.data.name;

                // Fetch all specialties
                const specialtyResponse = await axios.get(`http://localhost:9999/specify`);
                const specialties = specialtyResponse.data;

                // Map specify IDs to specialty names
                const specialtyNames = specify.map(specifyId => {
                    const specialty = specialties.find(spec => spec._id === specifyId);
                    return specialty ? specialty.name : '';
                });

                setDoctorProfile({
                    fullname,
                    email,
                    level,
                    place: hospitalName,
                    specify: specialtyNames.join(', '), // Join specialties with comma
                });
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
                notification.error({
                    message: 'Error fetching doctor profile',
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorProfile();
    }, [id]);

    // Handlers for modal and form
    const handleCreateSchedule = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleOk = async () => {
        try {
            const response = await axios.post('http://localhost:9999/doctor/schedule/create', {
                doctor: id,
                shift: [{
                    day: formData.day.format('YYYY-MM-DD'),
                    slots: formData.slots.map(slot => ({
                        time: slot[0].format('HH:mm') + '-' + slot[1].format('HH:mm'),
                        status: true
                    }))
                }],
                note: formData.note
            });

            const { data } = response;
            setScheduleData(prevData => [...prevData, data]);
            notification.success({
                message: 'Tạo lịch làm việc thành công',
                description: 'Lịch làm việc đã được lưu thành công.'
            });

            setModalVisible(false);
        } catch (error) {
            console.error('Error creating schedule:', error);
            notification.error({
                message: 'Error creating schedule',
                description: error.message
            });
        }
    };

    const handleChangeDay = (date) => {
        setFormData({ ...formData, day: date });
    };

    const handleChangeSlots = (timeSlots) => {
        setFormData({ ...formData, slots: [timeSlots] });
    };

    const handleChangeNote = (e) => {
        setFormData({ ...formData, note: e.target.value });
    };

    if (loading) {
        return <Spin />;
    }

    if (!doctorProfile) {
        return <p>Doctor profile not found</p>;
    }

    return (
        <div style={{ padding: 20 }}>
            <Title title="Hồ sơ bác sĩ" />
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Tên bác sĩ">{doctorProfile.fullname}</Descriptions.Item>
                <Descriptions.Item label="Bằng cấp">{doctorProfile.level}</Descriptions.Item>
                <Descriptions.Item label="Nơi làm việc">{doctorProfile.place}</Descriptions.Item>
                <Descriptions.Item label="Chuyên khoa">{doctorProfile.specify}</Descriptions.Item>
            </Descriptions>

            <Button type="primary" onClick={handleCreateSchedule} style={{ marginTop: 20 }}>
                Tạo lịch làm việc
            </Button>

            {/* Modal for creating schedule */}
            <Modal
                title="Tạo lịch làm việc"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form layout="vertical">
                    <Form.Item label="Ngày">
                        <DatePicker style={{ width: '100%' }} onChange={handleChangeDay} />
                    </Form.Item>
                    <Form.Item label="Thời gian">
                        <TimePicker.RangePicker
                            style={{ width: '100%' }}
                            format="HH:mm"
                            minuteStep={15}
                            onChange={handleChangeSlots}
                        />
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <input type="text" value={formData.note} onChange={handleChangeNote} />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Display existing schedule data */}
            {scheduleData.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h3>Danh sách lịch làm việc:</h3>
                    <List
                        dataSource={scheduleData}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Ngày: ${item.shift && item.shift[0] && item.shift[0].day}`}
                                    description={`Thời gian: ${item.shift && item.shift[0] && item.shift[0].slots.map(slot => slot.time).join(', ')}`}
                                />
                                <div>{item.note}</div>
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default DoctorProfile;
