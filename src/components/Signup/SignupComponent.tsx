import { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { authStoreSchema } from "../../config/AuthFormikSchema";
import { ToastContainer, toast } from "react-toastify";
import apis from "../../config/apis";

const SignupComponent = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const navigate = useNavigate();

  const data = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: { format: (arg0: string) => Date },
    profileImage: "",
  };

  const handleSubmit = async (values: {
    birthDate: { format: (arg0: string) => any };
    profileImage: any;
  }) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : "",
      profileImage: values.profileImage ? values.profileImage : "",
    };
    try {
      const response = await apis.register(formattedValues);
      if (response.status === 201) {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(
          response.data.error ??
            response.data.message ??
            "An unknown error occurred"
        );
      }
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("profileImage", file);
      const fileUrl = URL.createObjectURL(file);
      setAvatarPreview(fileUrl);
    }
  };

  const formik = useFormik({
    initialValues: data,
    validationSchema: authStoreSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="background flex justify-center text-black items-center my-20">
      <div className="bg-sign-up max-w-xl w-[90%] h-auto justify-start bg-white flex flex-col gap-5 rounded-lg shadow-lg p-5">
        <div className="flex justify-center flex-col items-center p-4">
          <h1 className="text-customOrange text-3xl font-bold w-full p-3 rounded-b-lg text-center">
            Sign Up
          </h1>
          <p className="text-xl text-center text-customOrange">
            Discover, Book, Enjoy – Effortlessly
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-2">
          <div className="mt-4 flex justify-center">
            <img
              src={avatarPreview ?? "https://via.placeholder.com/150"}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover rounded-full border border-gray-300"
            />
          </div>
          <div className="w-full">
            <label className="ml-1 text-gray-500" htmlFor="profileImage">
              Avatar
            </label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              className="mt-1 file:mr-3 w-full file:py-2 file:px-4 file:rounded-md file:border-0 text-sm border rounded-md file:bg-black file:text-white shadow-md hover:bg-gray-200"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              id="fullName"
              name="fullName"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              label="Full Name"
              autoComplete="fullName"
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              id="username"
              name="username"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              label="Username"
              variant="outlined"
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoComplete="username"
            />
            <TextField
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
              label="Date of Birth"
              autoComplete="dateOfBirth"
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
            />
            <FormControl required className="w-full">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                label="Gender"
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                autoComplete="gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </div>
              ) : null}
            </FormControl>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              label="Contact Number"
              autoComplete="phoneNumber"
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <TextField
              id="address"
              name="address"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              label="Address"
              autoComplete="address"
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              id="email"
              name="email"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              label="Email"
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
            />
            <TextField
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              label="Password"
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <div
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer"
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                ),
              }}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type={showConPass ? "text" : "password"}
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              label="Confirm Password"
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <div
                    onClick={() => setShowConPass(!showConPass)}
                    className="cursor-pointer"
                  >
                    {showConPass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                ),
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full self-center md:w-28 bg-customDarkOrange mt-[10px] text-white p-2 rounded-md hover:bg-customOrange"
            >
              Sign Up
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-customDarkOrange hover:text-customOrange"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignupComponent;
