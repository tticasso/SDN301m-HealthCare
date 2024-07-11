const PrescriptionPopup = ({ onClose, selectedBooking }) => {
    const [prescriptionData, setPrescriptionData] = useState({
        medication_details: '',
        dosage: '',
        duration: '',
        issue_date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        setPrescriptionData({ ...prescriptionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                appointment: selectedBooking._id,
                doctor: selectedBooking.doctor_id[0][0],
                patient: selectedBooking.patient_id[0][0],
                ...prescriptionData
            };
            
            console.log('Data being sent:', dataToSend); // Thêm log này để kiểm tra

            const response = await axios.post('http://localhost:9999/prescription/create', dataToSend);
            
            console.log('dataToSend:', dataToSend);
            onClose();
            alert('Đơn thuốc đã được tạo thành công!');
        } catch (error) {
            console.error('Error creating prescription:', error);
            alert('Có lỗi xảy ra khi tạo đơn thuốc.');
        }
    };

  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Tạo đơn thuốc</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Chi tiết thuốc:</label>
              <textarea
                name="medication_details"
                value={prescriptionData.medication_details}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Liều lượng:</label>
              <input
                type="text"
                name="dosage"
                value={prescriptionData.dosage}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Thời gian sử dụng:</label>
              <input
                type="text"
                name="duration"
                value={prescriptionData.duration}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Ngày kê đơn:</label>
              <input
                type="date"
                name="issue_date"
                value={prescriptionData.issue_date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
