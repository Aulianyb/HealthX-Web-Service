import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/API";

type Ruangan = {
  id: string;
  room_type: string;
  building: string;
  is_available: boolean;
};

interface UpdateDataRuanganFormProps {
  isOpen: boolean;
  onClose: () => void;
  ruanganData: Ruangan; // This should be the type of Ruangan data
  onUpdate: () => void;
}

const UpdateDataRuanganForm: React.FC<UpdateDataRuanganFormProps> = ({
  isOpen,
  onClose,
  ruanganData,
  onUpdate,
}) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [building, setBuilding] = useState("");
  const [status, setStatus] = useState<boolean>(false); // or true, depending on your initial value

  useEffect(() => {
    if (ruanganData) {
      setRoomNumber(ruanganData.id);
      setRoomType(ruanganData.room_type);
      setBuilding(ruanganData.building);
      setStatus(ruanganData.is_available);
    }
  }, [ruanganData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("Room")
      .update({
        id: roomNumber,
        room_type: roomType,
        building,
        is_available: status,
      })
      .eq("id", ruanganData.id);

    if (error) {
      console.error(error);
    } else {
      onUpdate();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[40%] py-4 px-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-bold text-[#24C48E] mb-2 text-center">
          Tambahkan Data Ruangan
        </h2>
        <p className="text-lg text-[#313638] text-center mb-4">
          Masukkan data yang dibutuhkan
        </p>
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "No Ruangan",
              value: roomNumber,
              onChange: setRoomNumber,
            },
          ].map(({ label, value, onChange }) => (
            <div className="relative mb-4" key={label}>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block font-semibold w-full p-5 placeholder-transparent border rounded-xl focus:outline-none focus:ring-0 bg-[#F1F2F5] text-black"
                placeholder={label}
              />
              <label
                className={`absolute top-4 left-4 font-semibold text-black transition-all transform ${
                  value && "text-xs top-1"
                }`}
              >
                {label}
              </label>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center w-full gap-y-4">
            <div className="flex items-center justify-center w-full gap-x-2">
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
              >
                <option value="">Pilih Tipe</option>
                <option value="ICU">ICU</option>
                <option value="IGD">IGD</option>
                <option value="Executive">Executive</option>
              </select>

              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
              >
                <option value="">Pilih Gedung</option>
                <option value="Mawar">Mawar</option>
                <option value="Melati">Melati</option>
              </select>
            </div>
            <select
              value={status ? "true" : "false"}
              onChange={(e) => setStatus(e.target.value === "true")}
              className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
            >
              <option value="">Pilih Status</option>
              <option value="false">Penuh</option>
              <option value="true">Tersedia</option>
            </select>
          </div>

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

export default UpdateDataRuanganForm;
