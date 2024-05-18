// src/pages/Login/LoginPage.tsx
import BackButton from "../../components/BackButton/BackButton";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="bg-[#24C48E] h-[100vh]">
      <BackButton />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
