// src/pages/ResetPassword/ResetPasswordPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/API"; // Make sure to configure Supabase client
import FailedToaster from "../../components/Toaster/FailedToaster";
import SuccessToaster from "../../components/Toaster/SuccessToaster";

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "failed">("failed");

  const navigate = useNavigate();

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setToastMessage("Passwords do not match");
      setToastType("failed");
      setShowToast(true);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      console.log(data);

      if (error) {
        throw error;
      } else {
        setToastType("success");
        setToastMessage("Password updated successfully!");
        navigate("/login");
      }
    } catch (error) {
      setToastMessage(String(error));
      setToastType("failed");
    } finally {
      setShowToast(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[20px] shadow-xl max-w-md mx-auto my-20">
      <span className="text-4xl font-bold text-[#24C48E]">Reset Password</span>
      <p className="my-4 text-black">Please enter your new password.</p>
      <form onSubmit={handleResetPassword}>
        <label
          htmlFor="new-password"
          className="block mb-2 text-sm font-medium text-black"
        >
          New Password
        </label>
        <input
          type="password"
          id="new-password"
          className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-[#24C48E] hover:bg-[#1db078] focus:ring-4 focus:outline-none focus:ring-[#1db078] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Reset Password
        </button>
      </form>
      {showToast &&
        (toastType === "failed" ? (
          <FailedToaster message={toastMessage} />
        ) : (
          <SuccessToaster message={toastMessage} />
        ))}
    </div>
  );
};

export default ResetPasswordPage;
