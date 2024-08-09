import { useEffect, useState } from "react";

const CheckAvailability = () => {
  // State to store the minimum check-in date
  const [minCheckInDate, setMinCheckInDate] = useState("");
  const [minCheckOutDate, setMinCheckOutDate] = useState("");

  // State to store the form data
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "",
  });

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    // Set the minimum check-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinCheckInDate(tomorrow.toISOString().split("T")[0]);
    setMinCheckOutDate(tomorrow.toISOString().split("T")[0]);

    // Update the minimum check-out date based on the check-in date
    if (formData.checkIn) {
      setMinCheckOutDate(formData.checkIn);
    }
  }, [formData.checkIn]);

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex justify-center items-center bg-black h-32 p-4 shadow-lg space-x-4"
    >
      <input
        type="date"
        name="checkIn"
        placeholder="Check In"
        value={formData.checkIn}
        onChange={handleChange}
        min={minCheckInDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
      />
      <input
        type="date"
        name="checkOut"
        placeholder="Check Out"
        value={formData.checkOut}
        onChange={handleChange}
        min={minCheckOutDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-customOrange"
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
