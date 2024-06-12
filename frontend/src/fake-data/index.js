import React, { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullname: '',
        dob: '',
        gender: '',
        phone: '',
        address: '',
        img: '',
        status: '1',
        roleId: 1,
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onloadend = async () => {
            const updatedFormData = { ...formData, img: reader.result };

            try {
                const response = await fetch('http://localhost:9999/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedFormData),
                });

                if (response.ok) {
                    alert('User registered successfully!');
                } else {
                    alert('Failed to register user.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while registering the user.');
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />

            <label>Full Name:</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required /><br /><br />

            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required /><br /><br />

            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select><br /><br />

            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /><br /><br />

            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required /><br /><br />

            <label>Profile Image:</label>
            <input type="file" name="img" onChange={handleFileChange} required /><br /><br />

            <label>Status:</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select><br /><br />

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
