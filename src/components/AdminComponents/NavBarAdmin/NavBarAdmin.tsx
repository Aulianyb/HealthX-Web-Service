import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-[#313638] flex justify-between items-center pt-2 px-12">
      <div className="flex flex-row space-x-4 items-center">
        <img
          src="../../../public/logo-navbar.svg"
          alt="HealthX Logo"
          className="h-8 mb-2"
        />
        <NavLink
          to="/admin/data-staff"
          className={({ isActive }) =>
            `text-white font-bold py-4 px-4 ${
              isActive ? "border-b-4 border-[#24C48E]" : ""
            }`
          }
        >
          Data Staff
        </NavLink>
        <NavLink
          to="/admin/data-ruangan"
          className={({ isActive }) =>
            `text-white font-bold py-4 px-4 ${
              isActive ? "border-b-4 border-[#24C48E]" : ""
            }`
          }
        >
          Data Ruangan
        </NavLink>
        <NavLink
          to="/admin/data-pasien"
          className={({ isActive }) =>
            `text-white font-bold py-4 px-4 ${
              isActive ? "border-b-4 border-[#24C48E]" : ""
            }`
          }
        >
          Data Pasien
        </NavLink>
        <NavLink
          to="/admin/data-layanan"
          className={({ isActive }) =>
            `text-white font-bold py-4 px-4 ${
              isActive ? "border-b-4 border-[#24C48E]" : ""
            }`
          }
        >
          Data Layanan
        </NavLink>
      </div>
      <div className="flex items-center">
        <NavLink
          to="/login"
          className="bg-[#24C48E] hover:bg-[#02A26C] text-white font-bold py-2 mb-2 px-4 rounded"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
