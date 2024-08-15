import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import apis from "../../config/apis";

interface FormData {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomType: string;
}

const CheckAvailability = () => {
  // State to store the minimum check-in and check-out date
  const [minCheckInDate, setMinCheckInDate] = useState(new Date());
  const [minCheckOutDate, setMinCheckOutDate] = useState(new Date());

  const [roomTypes, setRoomTypes] = useState([]);

  const formData: FormData = {
    checkInDate: null,
    checkOutDate: null,
    roomType: "",
  };

  const formik = useFormik<FormData>({
    initialValues: formData,
    onSubmit: async (values) => {
      try {
        const response = await apis.checkAvailability(values);
        toast.success(response.data.message);
      } catch (e: any) {
        toast.error(e.response.data.error);
      }
    },
  });

  // Get Room Types
  const getRoomTypes = async () => {
    try {
      const response = await apis.getRoomTypes();
      setRoomTypes(response.data);
    } catch (e: any) {}
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

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
      onSubmit={formik.handleSubmit}
      className="flex justify-center items-center bg-black h-32 p-4 shadow-lg space-x-4 font-ubuntu"
    >
      <DatePicker
        selected={formik.values.checkInDate}
        minDate={minCheckInDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholderText="Check In"
        onChange={(date) => formik.setFieldValue("checkInDate", date)}
      />
      <DatePicker
        selected={formik.values.checkOutDate}
        minDate={minCheckOutDate}
        className="text-xl px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholderText="Check Out"
        onChange={(date) => formik.setFieldValue("checkOutDate", date)}
      />
      <select
        name="roomType"
        value={formik.values.roomType}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="text-gray-400 px-4 py-2 border h-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-customOrange"
      >
        <option value="" disabled>
          Select Room Type
        </option>
        {roomTypes.map((roomType: any) => (
          <option key={roomType._id} value={roomType._id}>
            {roomType.roomType}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="text-xl px-4 py-2 h-16 bg-customOrange text-white rounded-lg hover:bg-customDarkOrange"
      >
        Check Availability
      </button>
      <ToastContainer />
    </form>
  );
};

export default CheckAvailability;
