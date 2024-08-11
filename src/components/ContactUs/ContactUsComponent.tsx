import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { contactSchema } from "../../config/AuthFormikSchema";

const ContactUsComponent: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      try {
        // Mock API call
        console.log("Form submitted:", values);
        setSubmissionStatus("Your message has been sent successfully!");
      } catch (error) {
        setSubmissionStatus(
          "There was an error sending your message. Please try again."
        );
      }
    },
  });

  return (
    <div className="background flex justify-center text-black items-center my-20">
      <div className="bg-sign-in max-w-md w-[90%] justify-start bg-white flex flex-col gap-5 rounded-lg shadow-lg p-5">
        <div className="flex justify-center flex-col items-center p-4">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
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
              className="w-full md:w-28 bg-customDarkOrange text-white p-2 rounded-md hover:bg-customOrange"
            >
              Submit
            </button>

            {submissionStatus && (
              <div className="mt-4">
                <Alert
                  severity={
                    submissionStatus.includes("error") ? "error" : "success"
                  }
                >
                  {submissionStatus}
                </Alert>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
