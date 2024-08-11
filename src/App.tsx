import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import HomeComponent from "./components/Home/HomeComponent";
import FooterComponent from "./components/Footer/FooterComponent";
import LoginComponent from "./components/Login/LoginComponent";
import SignupComponent from "./components/Signup/SignupComponent";
import ContactUsPage from "./components/ContactUs/ContactUsComponent";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/contactus" element={<ContactUsPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
