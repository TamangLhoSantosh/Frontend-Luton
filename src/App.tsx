import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import HomeComponent from "./components/Home/HomeComponent";
import FooterComponent from "./components/Footer/FooterComponent";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
