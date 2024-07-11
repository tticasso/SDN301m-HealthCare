import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Spin, notification } from 'antd';
import Title from './Title';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/doctor/${id}`);
                const { docProfile, doctor } = response.data;

                // Lấy thông tin từ docProfile và doctor
                const { level, place, specify } = docProfile;
                const { fullname, email } = doctor;

                // Cập nhật state để hiển thị thông tin
                setDoctorProfile({
                    fullname,
                    email,
                    level,
                    place,
                    specify,
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
        </div>
    );
};

export default DoctorProfile;
