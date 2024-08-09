import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CheckAvailability = () => {
  // State to store the minimum check-in and check-out date
  const [minCheckInDate, setMinCheckInDate] = useState(new Date());
  const [minCheckOutDate, setMinCheckOutDate] = useState(new Date());

  // State to store the form data
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "",
  });

  // Handle change for form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle date change
  const handleDateChange = (
    date: Date | null,
    type: "checkIn" | "checkOut"
  ) => {
    setFormData({
      ...formData,
      [type]: date ? date.toISOString().split("T")[0] : "",
    });
  };

  // Validate form
  const validate = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomType) {
      alert("Please fill in all the fields");
      return false;
    } else if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      alert("Check-out date must be greater than check-in date");
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
  };

  useEffect(() => {
    // Set the minimum check-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setMinCheckInDate(tomorrow);
    setMinCheckOutDate(tomorrow);

    // Update the minimum check-out date based on the check-in date
    if (formData.checkIn) {
      let chekout = new Date(formData.checkIn);
      chekout.setDate(chekout.getDate() + 1);
      setMinCheckOutDate(chekout);
    }
  }, [formData.checkIn]);

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex justify-center items-center bg-black h-32 p-4 shadow-lg space-x-4"
    >
      <DatePicker
        selected={formData.checkIn ? new Date(formData.checkIn) : null}
        minDate={minCheckInDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholderText="Check In"
        onChange={(date) => handleDateChange(date, "checkIn")}
      />
      <DatePicker
        selected={formData.checkOut ? new Date(formData.checkOut) : null}
        minDate={minCheckOutDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholderText="Check Out"
        onChange={(date) => handleDateChange(date, "checkOut")}
      />
      <select
        name="roomType"
        value={formData.roomType}
        onChange={handleChange}
        className="text-lg px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
      >
        <option value="" disabled>
          Select Room
        </option>
        <option value="twin">Twin Room</option>
        <option value="single">Single Room</option>
        <option value="delux">Delux Room</option>
        <option value="suite">Suite Room</option>
      </select>
      <button
        type="submit"
        className="text-xl px-4 py-2 h-16 bg-customOrange text-white rounded-lg hover:bg-customDarkOrange"
      >
        Check Availability
      </button>
    </form>
  );
};

export default CheckAvailability;
