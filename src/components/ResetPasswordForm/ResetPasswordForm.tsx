import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { supabase } from "../../lib/API";
import FailedToaster from "../../components/Toaster/FailedToaster";
import SuccessToaster from "../../components/Toaster/SuccessToaster";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "failed">("failed");
  const navigate = useNavigate();

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match");
      setToastType("failed");
      setShowToast(true);
      return;
    }

    if (!hash) {
      setToastMessage("Invalid token");
      setToastType("failed");
      setShowToast(true);
      return;
    }

    const hashParams = new URLSearchParams(hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const type = hashParams.get("type");

    if (type !== "recovery" || !accessToken) {
      setToastMessage("Invalid access token or type");
      setToastType("failed");
      setShowToast(true);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      } else {
        setToastType("success");
        setToastMessage("Password changed successfully!");
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
    <div className="bg-white p-8 rounded-[20px] shadow-xl max-w-md mx-auto my-2">
      <span className="text-4xl font-bold text-[#24C48E]">Reset Password</span>
      <p className="my-4 text-black">Please enter your new password.</p>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="new-password"
          className="block mb-2 text-sm font-medium text-black"
        >
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="new-password"
            className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </div>
        </div>
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
          </div>
        </div>
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
