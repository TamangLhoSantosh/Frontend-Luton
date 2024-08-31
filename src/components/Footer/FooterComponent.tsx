import { FormEventHandler, useState } from "react";
import Logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import apis from "../../config/apis";

const FooterComponent = () => {
  const [email, setEmail] = useState("");

  // Validate email
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    try {
      const response = await apis.subscribe(email);
      console.log(response.status);
      if (response.status === 201) {
        toast.success("Subscribed Successfully");
        setEmail("");
      } else {
        toast.error(response.data.error);
      }
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-black text-white pb-5 pt-10 font-ubuntu">
      <div className="p-10 pb-20">
        <img src={Logo} alt="Logo" className="h-56" />
        <p className="ps-5 text-2xl font-semibold">Luton Hotel Head Office</p>
        <p className="ps-5 text-2xl">+21 434 344 432</p>
        <p className="ps-5 text-2xl">info@lutonhotel.com</p>
      </div>
      <ul className="p-10 pb-20 space-y-6">
        <li className="text-2xl">Our Hotels</li>
        <li className="text-2xl">Our Conferencing</li>
        <li className="text-2xl">Our Company</li>
        <li className="text-2xl">Hotel Design</li>
        <li className="text-2xl">Careers</li>
      </ul>
      <div className="p-10 pb-20 space-y-6">
        <p className="text-3xl">Subscribe For Offers</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="email1"
            id="email1"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-11/12 h-20 ps-5 text-2xl rounded-lg text-gray-400"
          />
          <br />
          <button
            type="submit"
            className="w-11/12 h-20 text-2xl rounded-lg bg-customOrange"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default FooterComponent;
