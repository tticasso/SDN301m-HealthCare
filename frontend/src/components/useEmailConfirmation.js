import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        const userId = localStorage.getItem("userId");
        axios.post(`http://localhost:9999/resend-confirmation`, { userId })
            .then(() => {
                toast.info("Email xác nhận đã được gửi lại. Vui lòng kiểm tra email của bạn.");
            })
            .catch((error) => {
                console.error("Error resending confirmation email:", error);
                toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            });
    };

    const checkEmailConfirmation = (callback) => {
        if (loading) return;

        if (login.status === false) {
            toast.info(<div>
                Vui lòng xác nhận email trước khi tiếp tục!<br />
                <a href="#" >Gửi lại email xác nhận</a>
            </div>);
            navigate('/');
        } else {
            callback();
        }
    };

    return checkEmailConfirmation;
};

export default useEmailConfirmation;
