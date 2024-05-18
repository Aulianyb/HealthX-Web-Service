import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/API";
import LogoutConfirmationModal from "../../AdminComponents/Modals/LogoutConfirmationModals";

const NavBarAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Successfully logged out");
      navigate("/login");
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    handleModalClose();
  };

  return (
    <nav className="bg-[#313638] flex justify-between items-center pt-2 px-12">
      <div className="flex flex-row items-center space-x-4">
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
        <button
          onClick={handleModalOpen}
          className="bg-[#24C48E] hover:bg-[#02A26C] text-white font-bold py-2 mb-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmLogout}
      />
    </nav>
  );
};

export default NavBarAdmin;
