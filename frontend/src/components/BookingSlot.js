import { useState } from 'react';
import '../styles/Booking.css';

function BookingSlot({ dates, onSlotSelect }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedSlot(null); // Reset the selected slot when a new day is selected
  };

  const handleSlotSelect = (day, slot) => {
    setSelectedSlot(slot);
    if (onSlotSelect) {
      onSlotSelect(day, slot);
    }
  };

  return (
    <div className="booking-slot">
      <h3 className="text-lg font-bold mb-4">Chọn lịch khám</h3>
      <div className="days flex gap-4 mb-4">
        {dates.map((doctor) =>
          doctor.time.map((time) => (
            <button
              key={`${doctor.doctorId}-${time.day}`} // Unique key for each day-slot pair
              onClick={() => handleDaySelect(time.day)}
              className={`day-button ${
                selectedDay === time.day ? "selected" : ""
              }`}
            >
              {time.day}
            </button>
          ))
        )}
      </div>
      {selectedDay && (
        <div className="slots grid grid-cols-3 gap-2">
          {dates
            .flatMap((doctor) => doctor.time)
            .find((time) => time.day === selectedDay)
            .slots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotSelect(selectedDay, slot)}
                className={`slot-button ${
                  selectedSlot === slot ? "selected" : ""
                }`}
              >
                {slot}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default BookingSlot;
