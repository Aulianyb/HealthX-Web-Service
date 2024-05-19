// src/pages/Landing/LandingPage.tsx
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex flex-grow bg-[#f9f9f9] ">
        {/* left side */}
        <div className="flex flex-col justify-center ml-16 gap-y-6 w-[50%]">
          <span className="">
            <span className="text-[#24C48E] font-bold text-8xl mr-4">
              Daftar layanan kesehatan
            </span>{" "}
            <span className="text-black text-7xl"> dalam satu klik saja.</span>
          </span>
          <p className="text-black text-3xl">
            Dengan HealthX, sekarang kamu bisa mendaftarkan diri untuk layanan
            kesehatan dari mana saja, hanya dengan beberapa klik.
          </p>
          <div className="flex justify-start gap-x-6">
            <Link
              to="/register"
              className="bg-[#24C48E] hover:bg-[#02A26C] text-white font-bold w-[30%] text-xl py-4 text-center items-center px-4 rounded-lg"
            >
              Daftar Sekarang
            </Link>
            <Link
              to="/about"
              className="bg-[#f9f9f9] hover:bg-[#02A26C] text-[#24C48E] border-4 hover:border-[#02A26C] border-[#24C48E] font-bold w-[30%] text-xl py-4 text-center rounded-lg px-4 "
            >
              Tentang Kami
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="w-[45%] ">
          <img
            src="public\doctor-landing page.svg"
            alt="logo doctor landing page"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
