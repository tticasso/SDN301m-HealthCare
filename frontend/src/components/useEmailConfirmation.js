import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const useEmailConfirmation = () => {
    const [login, setLogin] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`http://localhost:9999/user/${userId}`).then((response) => {
                setLogin(response.data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const handleResendConfirmation = () => {
        const email = localStorage.getItem("email");
        axios.post(`http://localhost:9999/auth/active-account`, { email: email })
            .then(() => {
                Swal.fire({
                    title: 'Gửi email kích hoạt thành công',
                    icon: 'info'
                })

                const userId = localStorage.getItem("userId");
                if (userId) {
                    axios.get(`http://localhost:9999/user/${userId}`).then((response) => {
                        setLogin(response.data);
                    });
                }
            })
            .catch((error) => {
                console.error("Error resending confirmation email:", error);
            });
    };

    const checkEmailConfirmation = (callback) => {
        if (loading) return;
        console.log(login.status)
        if (login.status === false) {
            Swal.fire({
                title: 'Hãy xác thực email để thực hiện thao tác.',
                html: 'Kích hoạt tại đây: <a href="http://localhost:3000/" id="nhan-ma-link">Nhận mã</a>',
                icon: 'warning',
                didRender: () => {
                    // Thêm sự kiện click vào đường link
                    document.getElementById('nhan-ma-link').addEventListener('click', (event) => {
                        event.preventDefault();
                        handleResendConfirmation();
                    });
                }
            })
            navigate('/');
        } else {
            callback();
        }
    };
    
    return checkEmailConfirmation;
};

export default useEmailConfirmation;
