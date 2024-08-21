import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PageWrapper component={<HomeComponent />} />}
        />
        <Route
          path="/login"
          element={<PageWrapper component={<LoginComponent />} />}
        />
        <Route
          path="/signup"
          element={<PageWrapper component={<SignupComponent />} />}
        />
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
