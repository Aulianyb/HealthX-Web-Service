import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../HeathX-Web-Service-FE/styles.css";
import GenderDropdownButton from "./DropdownButton/GenderDropdownButton";
import ServiceDropdownButton from "./DropdownButton/ServiceDropdownButton";
import { supabase } from "../../lib/API";
import SuccessToaster from "../Toaster/SuccessToaster";
import FailedToaster from "../Toaster/FailedToaster";
import WarningToaster from "../Toaster/WarningToaster";

const PatientRegistrationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  // Handle gender selection
  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    console.log("Selected gender:", gender); // You can perform additional actions here
  };

  // Handle service selection
  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    console.log("Selected service:", service); // You can perform additional actions here
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !selectedGender || !selectedService) {
      setToastMessage("Please fill out all fields.");
      setToastType("warning");
      setTimeout(() => setToastMessage(null), 3000); // Remove toast after 3 seconds
      return;
    }
    // Insert data into the "Patient" table
    const { data, error } = await supabase.from("Patient").insert([
      {
        name: name,
        gender: selectedGender,
        telephone: phone,
        date_of_visit: visitDate,
        service: selectedService,
        current_condition: "", // Assigning empty string as it's not provided in the form
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      setToastMessage("Registration failed!");
      setToastType("error");
    } else {
      console.log("Data inserted successfully:", data);
      setToastMessage("Registration successful!");
      setToastType("success");
      // Reset form fields after successful submission
      setName("");
      setPhone("");
      setVisitDate(new Date());
      setSelectedGender("");
      setSelectedService("");
    }
    setTimeout(() => setToastMessage(null), 3000); // Remove toast after 3 seconds
  };

  return (
    <div>
      <div className="max-w-lg p-8 mx-auto mt-8 mb-2 bg-white rounded-lg shadow-lg">
        <p className="text-4xl font-bold text-black ">
          Daftar Layanan{" "}
          <p className="text-4xl font-bold  text-[#24C48E]">Rumah Sakit</p>
        </p>
        <p className="my-4 text-gray-600">
          Masukan informasi pribadi untuk melakukan pendaftaran
        </p>
        <form onSubmit={handleSubmit}>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Nama
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded-xl w-full bg-[#F1F2F5] text-[#ABADB3] py-4 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            required
          />

          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="phone"
          >
            No Telepon
          </label>
          <input
            id="phone"
            type="text"
            placeholder="No Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-xl shadow appearance-none border  w-full py-4 px-3 bg-[#F1F2F5] text-[#ABADB3] mb-2 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <div className="flex justify-center w-full mb-2">
            {/* Gender Dropdown */}
            <GenderDropdownButton onSelect={handleGenderSelect} />

            {/* Service Dropdown */}
            <ServiceDropdownButton onSelect={handleServiceSelect} />
          </div>

          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="visitDate"
          >
            Tanggal berkunjung
          </label>
          <div className="custom-datepicker">
            <DatePicker
              selected={visitDate}
              onChange={(date: Date) => setVisitDate(date)}
              dateFormat="MMMM d, yyyy"
              className="shadow border rounded-xl w-full py-4 px-3 bg-[#F1F2F5] text-[#ABADB3] mb-2 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-4 font-bold text-white transition duration-150 ease-in-out bg-green-500 hover:bg-green-700 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Daftar
          </button>
        </form>
      </div>
      <div className="flex justify-center">
        {toastMessage &&
          (toastType === "success" ? (
            <SuccessToaster message={toastMessage} />
          ) : toastType === "error" ? (
            <FailedToaster message={toastMessage} />
          ) : toastType === "warning" ? (
            <WarningToaster message={toastMessage} />
          ) : null)}
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
