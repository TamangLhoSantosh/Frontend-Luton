import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const CheckAvailability = () => {
  // State to store the minimum check-in and check-out date
  const [minCheckInDate, setMinCheckInDate] = useState(new Date());
  const [minCheckOutDate, setMinCheckOutDate] = useState(new Date());

  // State to store the form data
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
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
    type: "checkInDate" | "checkOutDate"
  ) => {
    setFormData({
      ...formData,
      [type]: date ? date.toISOString().split("T")[0] : "",
    });
  };

  // Validate form
  const validate = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !formData.roomType) {
      alert("Please fill in all the fields");
      return false;
    } else if (
      new Date(formData.checkInDate) >= new Date(formData.checkOutDate)
    ) {
      alert("Check-out date must be greater than check-in date");
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form data:", formData);
  };

  useEffect(() => {
    // Set the minimum check-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setMinCheckInDate(tomorrow);
    setMinCheckOutDate(tomorrow);

    // Update the minimum check-out date based on the check-in date
    if (formData.checkInDate) {
      let chekout = new Date(formData.checkInDate);
      chekout.setDate(chekout.getDate() + 1);
      setMinCheckOutDate(chekout);
    }
  }, [formData.checkInDate]);

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex justify-center items-center bg-black h-32 p-4 shadow-lg space-x-4 font-ubuntu"
    >
      <DatePicker
        selected={formData.checkInDate ? new Date(formData.checkInDate) : null}
        minDate={minCheckInDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholderText="Check In"
        onChange={(date) => handleDateChange(date, "checkInDate")}
      />
      <DatePicker
        selected={
          formData.checkOutDate ? new Date(formData.checkOutDate) : null
        }
        minDate={minCheckOutDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholderText="Check Out"
        onChange={(date) => handleDateChange(date, "checkOutDate")}
      />
      <select
        name="roomType"
        value={formData.roomType}
        onChange={handleChange}
        className="text-gray-400 px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
      >
        <option value="" disabled>
          Select Room Type
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
