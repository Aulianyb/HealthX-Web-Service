import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-[#313638] flex justify-between items-center py-4 px-12">
      <div>
        <Link to="/" className="">
          <img
            src={"logo-navbar.svg"}
            alt="HealthX Logo"
            className="h-8"
          />
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#24C48E] hover:bg-[#02A26C] text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
