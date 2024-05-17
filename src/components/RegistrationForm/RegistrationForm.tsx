import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { supabase } from "../../lib/API";
import FailedToaster from "../../components/Toaster/FailedToaster";
import SuccessToaster from "../../components/Toaster/SuccessToaster";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "failed">("failed");

  const navigate = useNavigate();

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password,
    });

    console.log(data, error);

    if (error) {
      setToastType("failed");
      setToastMessage(error.message);
    } else {
      setToastType("success");
      setToastMessage("Registration successful!");
      navigate("/login");
    }
    setShowToast(true);
  };

  return (
    <div className="bg-white p-8 rounded-[20px] shadow-xl max-w-md mx-auto my-2">
      <span className="text-4xl font-bold text-[#24C48E]">
        Create an Account
      </span>
      <p className="my-4 text-black">
        Please fill in the information below to create your account.
      </p>
      <form onSubmit={handleRegister}>
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
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <a href="/login" className="text-[#24C48E]">
          Login here
        </a>
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

export default RegistrationForm;
