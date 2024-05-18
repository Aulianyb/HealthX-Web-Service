import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { supabase } from "../../lib/API";
import FailedToaster from "../Toaster/FailedToaster";
import SuccessToaster from "../Toaster/SuccessToaster";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "failed">("failed");

  const navigate = useNavigate();

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    console.log(data);

    if (error) {
      setToastType("failed");
      setToastMessage(error.message);
    } else {
      setToastType("success");
      setToastMessage("Login successful!");
      navigate("/admin/data-staff");
    }
    setShowToast(true);
  };

  const handleResetPassword = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        username,
        {
          redirectTo: "http://localhost:5173/reset-password",
        }
      );

      console.log(data, error);
      if (error) {
        throw error;
      } else {
        setToastType("success");
        setToastMessage("Password reset email sent!");
      }
    } catch (error) {
      // Specify the type of the error
      setToastMessage(String(error));
      setToastType("failed");
    } finally {
      setShowToast(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[20px] shadow-xl max-w-md mx-auto my-2">
      <span className="text-4xl font-bold text-[#24C48E]">
        Selamat datang kembali,{" "}
        <span className="text-4xl italic font-bold text-black">admin.</span>
      </span>
      <p className="my-4 text-black">
        Masukan username dan password untuk{" "}
        <span className="text-[#313638] font-bold">login</span>
      </p>
      <form onSubmit={handleLogin}>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-black"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
            placeholder="Password"
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
        <button
          type="submit"
          className="text-white bg-[#24C48E] hover:bg-[#1db078] focus:ring-4 focus:outline-none focus:ring-[#1db078] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-[#24C48E]">
          Sign up here
        </a>
      </p>
      <p className="mt-2 text-sm text-center">
        <button onClick={handleResetPassword} className="text-[#24C48E]">
          Forgot Password?
        </button>
      </p>
      {showToast &&
        (toastType === "failed" ? (
          <FailedToaster message={toastMessage} />
        ) : (
          <SuccessToaster message={toastMessage} />
        ))}
    </div>
  );
};

export default LoginForm;
