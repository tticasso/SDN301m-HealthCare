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
        {dates && dates.map((schedule) =>
          schedule.shift.map((shift) => (
            <button
              key={`${schedule._id}-${shift.day}`} // Unique key for each day-slot pair
              onClick={() => handleDaySelect(shift.day)}
              className={`day-button ${
                selectedDay === shift.day ? "selected" : ""
              }`}
            >
              {shift.day}
            </button>
          ))
        )}
      </div>
      {selectedDay && (
        <div className="slots grid grid-cols-3 gap-2">
          {dates
            .flatMap((schedule) => schedule.shift)
            .find((shift) => shift.day === selectedDay)?.slots.map((slot) => (
              <button
                key={slot._id}
                onClick={() => handleSlotSelect(selectedDay, slot.time)}
                className={`slot-button ${
                  selectedSlot === slot.time ? "selected" : ""
                }`}
              >
                {slot.time}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default BookingSlot;
