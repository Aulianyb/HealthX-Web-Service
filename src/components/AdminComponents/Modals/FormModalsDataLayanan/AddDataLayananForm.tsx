import React, { useState } from "react";
import { supabase } from "../../../../lib/API";

interface AddDataLayananProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddDataLayananForm: React.FC<AddDataLayananProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string | number>("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceValue = typeof price === "string" ? Number(price) : price;
    const { error } = await supabase.from("Service").insert([
      {
        name,
        price: priceValue,
        duration,
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      onAdd();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[40%] py-4 px-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-bold text-[#24C48E] mb-2 text-center">
          Tambahkan Data Layanan
        </h2>
        <p className="text-lg text-[#313638] text-center mb-4">
          Masukkan data yang dibutuhkan
        </p>
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Nama",
              value: name,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
            },
            {
              label: "Harga",
              value: price,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value),
            },
            {
              label: "Durasi",
              value: duration,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setDuration(e.target.value),
            },
          ].map(({ label, value, onChange }) => (
            <div className="relative mb-4" key={label}>
              <input
                type="text"
                value={value}
                onChange={onChange}
                className="block font-semibold w-full p-5 placeholder-transparent border rounded-xl focus:outline-none focus:ring-0 bg-[#F1F2F5] text-black"
                placeholder={label}
              />
              <label
                className={`absolute top-2 left-4 font-semibold text-black transition-all transform ${
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
              Tambahkan
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

export default AddDataLayananForm;
