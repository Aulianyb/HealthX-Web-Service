import React, { useState, FormEvent } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("/api/login", { username, password }); // Perform the login via axios
      console.log("Login successful:", response.data); // Logging the response on successful login
      // Further actions such as redirecting the user or storing login tokens can be added here
    } catch (error) {
      console.error("Login failed:", error); // Handle errors in case the login fails
    }
  };

  return (
    <div className="bg-white p-8 rounded-[20px] shadow-xl max-w-md mx-auto my-20">
      <span className="text-4xl font-bold text-[#24C48E] ">
        Selamat datang kembali,{" "}
        <span className="text-4xl italic font-bold text-black">admin.</span>
      </span>
      <p className="text-black my-4">
        Masukan username dan password untuk{" "}
        <span className="text-[#313638] font-bold">login</span>
      </p>
      <form onSubmit={handleLogin}>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-black"
        ></label>
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
        ></label>
        <input
          type="password"
          id="password"
          className="bg-[#F1F2F5] border-[#ABADB3] text-black text-sm rounded-lg focus:ring-[#24C48E] focus:border-[#24C48E] block w-full p-2.5 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-[#24C48E] hover:bg-[#1db078] focus:ring-4 focus:outline-none focus:ring-[#1db078] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
