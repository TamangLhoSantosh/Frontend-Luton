import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";
import apis from "../../config/apis";
import { contactSchema } from "../../config/AuthFormikSchema";

const ContactUsComponent: React.FC = React.memo(() => {
  const data = {
    fullName: "",
    email: "",
    message: "",
  };

  // Handle form submission
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const response = await apis.contactUs(values);
      if (response.status === 201) {
        toast.success("Message sent successfully", response.data.message);
        resetForm();
      } else {
        toast.error(
          response.data.error || "An error occurred. Please try again."
        );
      }
    } catch (e: any) {
      toast.error(
        e.response?.data?.error ||
          "Failed to send message. Please check your connection."
      );
    }
  };

  const formik = useFormik({
    initialValues: data,
    validationSchema: contactSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex justify-center items-center my-20 px-4 font-ubuntu">
      <div className="flex gap-8 w-full max-w-6xl">
        {/* Contact Info Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col gap-6 sm:w-96">
          <h2 className="text-3xl font-bold text-customDarkOrange">
            Contact Info
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 my-4">
              <LocationOnIcon className="text-customOrange text-3xl" />
              <div>
                <p className="text-2xl font-semibold pb-4">Address</p>
                <p className="text-gray-700">Luton Hotel Head Office</p>
              </div>
            </div>
            <div className="flex items-center gap-4 my-4">
              <EmailIcon className="text-customOrange text-3xl" />
              <div>
                <p className="text-2xl font-semibold pb-4">Message Us</p>
                <a href="mailto:info@lutonhotel.com" className="text-gray-700">
                  info@lutonhotel.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 my-4">
              <PhoneIcon className="text-customOrange text-3xl" />
              <div>
                <p className="text-2xl font-semibold pb-4">Call Us</p>
                <p className="text-gray-700">+21 434 344 432</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h1 className="text-3xl font-bold mb-6 text-center">Get In Touch</h1>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <TextField
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              fullWidth
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              variant="outlined"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="message"
              name="message"
              label="Message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
            <button
              type="submit"
              className="w-full md:w-36 bg-customDarkOrange text-white py-2 rounded-md hover:bg-customOrange"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default ContactUsComponent;
