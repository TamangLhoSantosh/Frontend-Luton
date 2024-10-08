import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../hooks/ContextProvider";
import { toast } from "react-toastify";
import apis from "../../config/apis";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // Set user in context
  const { setUser } = useContext(ContextProvider);

  // Handle change
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let response;
      // If email
      if (data.username.includes("@")) {
        response = await apis.login({
          email: data.username,
          password: data.password,
        });
      }
      // If username
      else {
        response = await apis.login(data);
      }
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully");
        setTimeout(() => {
          setUser(response.data.user);
          if (response.data.user.role === "user") navigate("/");
          else navigate("/adminDashboard");
        }, 2000);
      } else {
        toast.error(response.data.message ?? "An unexpected error occurred");
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="background flex justify-center text-black items-center my-20 min-h-screen">
      <div className="bg-sign-in max-w-md w-[90%]  justify-start bg-white flex flex-col gap-5 rounded-lg shadow-lg p-5">
        <div className="flex justify-center flex-col items-center p-4">
          <h1 className="text-customOrange text-3xl font-bold w-full p-3 rounded-b-lg text-center">
            Sign In
          </h1>
          <p className="text-xl text-center  text-customOrange">
            Sign in to stay connected
          </p>
        </div>
        <form
          className="flex flex-col p-3 gap-6 w-full"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            name="username"
            onChange={handleChange}
            className="w-full"
            label="Username or Email"
            variant="outlined"
          />
          <div className="relative w-full">
            <TextField
              id="outlined-password-input"
              label="Password"
              name="password"
              onChange={handleChange}
              type={show ? "text" : "password"}
              className="w-full"
              autoComplete="current-password"
            />

            {show ? (
              <FaEye
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShow(!show)}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShow(!show)}
              />
            )}
          </div>
          {/* <div className="flex justify-between items-center w-full mt-2">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              className="hover:text-customDarkOrange"
            />
            <Link
              to="#"
              className="text-customDarkOrange hover:text-customOrange transition-all"
            >
              Forget password?
            </Link>
          </div> */}
          <button
            type="submit"
            className="w-full self-center md:w-28 bg-customDarkOrange mt-[10px] text-white p-2 rounded-md hover:bg-customOrange"
          >
            Sign In
          </button>
          <Link
            to="/signup"
            className="text-customDarkOrange hover:text-customOrange text-center mt-2"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
