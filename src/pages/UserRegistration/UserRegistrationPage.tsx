// src/pages/Login/LoginPage.tsx
import BackButton from "../../components/BackButton/BackButton";
import RegistrationForm from "./../../components/RegistrationForm/RegistrationForm";

const LoginPage = () => {
  return (
    <div className="bg-[#24C48E] h-[100vh]">
      <BackButton />
      <RegistrationForm />
    </div>
  );
};

export default LoginPage;
