// src/components/UpdateDataNurseForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/API";

// src/types/Nurse.ts
interface Nurse {
  id: Int8Array; // Use the appropriate type for your ID (e.g., number, string, etc.)
  name: string;
  gender: string;
  telephone: string;
  department: string;
  shift_day: string;
  shift_hours: string;
}

interface UpdateDataNurseFormProps {
  isOpen: boolean;
  onClose: () => void;
  nurseData: Nurse; // This should be the type of Nurse data
  onUpdate: () => void;
}

const UpdateDataNurseForm: React.FC<UpdateDataNurseFormProps> = ({
  isOpen,
  onClose,
  nurseData,
  onUpdate,
}) => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [shiftDay, setShiftDay] = useState("");
  const [shiftHours, setShiftHours] = useState("");

  useEffect(() => {
    if (nurseData) {
      setName(nurseData.name);
      setTelephone(nurseData.telephone);
      setGender(nurseData.gender);
      setDepartment(nurseData.department);
      setShiftDay(nurseData.shift_day);
      setShiftHours(nurseData.shift_hours);
    }
  }, [nurseData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("Nurse")
      .update({
        name,
        telephone,
        gender,
        department,
        shift_day: shiftDay,
        shift_hours: shiftHours,
      })
      .eq("id", nurseData.id);

    if (error) {
      console.error(error);
    } else {
      onUpdate();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[40%] py-4 px-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-bold text-[#24C48E] mb-2 text-center">
          Mengubah Data Suster
        </h2>
        <p className="text-lg text-[#313638] text-center mb-4">
          Masukkan data yang dibutuhkan
        </p>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Nama", value: name, onChange: setName },
            { label: "No Telepon", value: telephone, onChange: setTelephone },
          ].map(({ label, value, onChange }) => (
            <div className="relative mb-4" key={label}>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full p-5 placeholder-transparent border rounded-xl focus:outline-none focus:ring-0 bg-[#F1F2F5] text-black font-semibold"
                placeholder={label}
              />
              <label
                className={`absolute top-2 left-4 text-black transition-all transform font-semibold ${
                  value && "text-xs top-1"
                }`}
              >
                {label}
              </label>
            </div>
          ))}
          <div className="flex items-center justify-center gap-x-2">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
            >
              <option value="">Pilih Gender</option>
              <option value="P">P</option>
              <option value="L">L</option>
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
            >
              <option value="">Pilih Departemen</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {[
            { label: "Hari Kerja", value: shiftDay, onChange: setShiftDay },
            { label: "Jam Kerja", value: shiftHours, onChange: setShiftHours },
          ].map(({ label, value, onChange }) => (
            <div className="relative my-4" key={label}>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full p-5 placeholder-transparent border rounded-xl focus:outline-none focus:ring-0 bg-[#F1F2F5] text-black font-semibold"
                placeholder={label}
              />
              <label
                className={`absolute top-2 left-4 text-black font-semibold transition-all transform ${
                  value && "text-xs top-1"
                }`}
              >
                {label}
              </label>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center mt-4 gap-y-4">
            <button
              type="submit"
              className="w-full px-4 py-4 text-white bg-[#24C48E] rounded-xl"
            >
              Ubah
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-4 text-[#24C48E] bg-white border border-[#24C48E] rounded-xl"
            >
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDataNurseForm;
