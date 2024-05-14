// src/pages/Login/LoginPage.tsx
import BackButton from "../../components/BackButton/BackButton";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-[#24C48E] h-[100vh]">
      <BackButton />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
