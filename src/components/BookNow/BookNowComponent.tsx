import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

interface BookingFormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomType: string;
  total: string;
}
const BookNowComponent: React.FC = () => {
  const [minCheckInDate, setMinCheckInDate] = useState(new Date());
  const [minCheckOutDate, setMinCheckOutDate] = useState(new Date());

  const formik = useFormik<BookingFormData>({
    initialValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      checkInDate: null,
      checkOutDate: null,
      roomType: "",
      total: "",
    },
    onSubmit: (values) => {
      console.log("Booking data:", values);
    },
  });

  // State to store the per night rate
  const [perNightRate, setPerNightRate] = useState(100);

  // Calculate total amount
  useEffect(() => {
    if (formik.values.checkInDate && formik.values.checkOutDate) {
      const diffTime =
        Math.abs(
          formik.values.checkOutDate.getTime() -
            formik.values.checkInDate.getTime()
        ) /
        (1000 * 60 * 60 * 24);
      const total = diffTime * perNightRate;
      formik.setFieldValue("total", total.toFixed(2));
    }
  }, [formik.values.checkInDate, formik.values.checkOutDate]);

  useEffect(() => {
    // Set the minimum check-in date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setMinCheckInDate(tomorrow);
    setMinCheckOutDate(tomorrow);

    // Update the minimum check-out date based on the check-in date
    if (formik.values.checkInDate) {
      let checkout = new Date(formik.values.checkInDate);
      checkout.setDate(checkout.getDate() + 1);
      setMinCheckOutDate(checkout);
    }
  }, [formik.values.checkInDate]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Book Your Stay</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <TextField
          autoComplete="guestName"
          type="text"
          id="guestName"
          name="guestName"
          label="Full Name"
          value={formik.values.guestName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.guestName && Boolean(formik.errors.guestName)}
          helperText={formik.touched.guestName && formik.errors.guestName}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange"
          required
        />
        <TextField
          type="email"
          id="guestEmail"
          name="guestEmail"
          label="Email"
          value={formik.values.guestEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.guestEmail && Boolean(formik.errors.guestEmail)}
          helperText={formik.touched.guestEmail && formik.errors.guestEmail}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange"
          required
        />
        <TextField
          type="tel"
          id="guestPhone"
          name="guestPhone"
          label="Contact Number"
          value={formik.values.guestPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.guestPhone && Boolean(formik.errors.guestPhone)}
          helperText={formik.touched.guestPhone && formik.errors.guestPhone}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-2">
          <div>
            <label
              htmlFor="checkInDate"
              className="block text-sm font-medium text-gray-700"
            >
              Check-In Date
            </label>
            <DatePicker
              selected={formik.values.checkInDate}
              minDate={minCheckInDate}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange z-50"
              placeholderText="Select check-in date"
              onChange={(date) => formik.setFieldValue("checkInDate", date)}
            />
          </div>
          <div>
            <label
              htmlFor="checkOutDate"
              className="block text-sm font-medium text-gray-700"
            >
              Check-Out Date
            </label>
            <DatePicker
              selected={formik.values.checkOutDate}
              minDate={minCheckOutDate}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange z-50"
              placeholderText="Select check-out date"
              onChange={(date) => formik.setFieldValue("checkOutDate", date)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="roomType"
            className="block text-sm font-medium text-gray-700"
          >
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formik.values.roomType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange"
          >
            <option value="" disabled>
              Select a Room Type
            </option>
            <option value="twin">Twin Room</option>
            <option value="single">Single Room</option>
            <option value="delux">Delux Room</option>
            <option value="suite">Suite Room</option>
          </select>
        </div>
        <TextField
          type="text"
          name="total"
          value={formik.values.total}
          label="Total Amount"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-customOrange z-0"
          disabled
        />
        <button
          type="submit"
          className="w-full md:w-36 bg-gradient-to-r from-customOrange to-customDarkOrange text-white py-3 px-4 rounded-lg shadow-md hover:bg-gradient-to-l"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookNowComponent;
