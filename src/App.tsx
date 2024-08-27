import { useContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ContextProvider } from "./hooks/ContextProvider";
import { ToastContainer } from "react-toastify";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import HomeComponent from "./components/Home/HomeComponent";
import FooterComponent from "./components/Footer/FooterComponent";
import LoginComponent from "./components/Login/LoginComponent";
import SignupComponent from "./components/Signup/SignupComponent";
import ContactUsComponent from "./components/ContactUs/ContactUsComponent";
import BookNowComponent from "./components/Booking/BookNowComponent";
import RoomDetails from "./components/Room/RoomDetail";
import AdminComponent from "./components/AdminDashboard/AdminComponent";
import ScrollToTop from "./components/ScrollToTop";

import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(ContextProvider);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PageWrapper component={<HomeComponent />} />}
        />
        {user && user.role ? (
          <></>
        ) : (
          <>
            <Route
              path="/login"
              element={<PageWrapper component={<LoginComponent />} />}
            />
            <Route
              path="/signup"
              element={<PageWrapper component={<SignupComponent />} />}
            />
          </>
        )}
        <Route
          path="/contactus"
          element={<PageWrapper component={<ContactUsComponent />} />}
        />
        <Route
          path="/booknow"
          element={<PageWrapper component={<BookNowComponent />} />}
        />
        <Route
          path="/room/:roomType"
          element={<PageWrapper component={<RoomDetails />} />}
        />
        <Route path="/adminDashboard" element={<AdminComponent />} />
      </Routes>
      <ScrollToTop />
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
    </BrowserRouter>
  );
}

const PageWrapper = ({ component }: { component: JSX.Element }) => {
  const location = useLocation();
  const hideFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <NavbarComponent />
      {component}
      {!hideFooter && <FooterComponent />}
    </>
  );
};

export default App;
