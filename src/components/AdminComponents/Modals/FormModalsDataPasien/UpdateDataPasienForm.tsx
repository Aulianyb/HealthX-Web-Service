import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/API";
import DatePicker from "react-datepicker";

type Pasien = {
  id: Int8Array;
  name: string;
  gender: string;
  telephone: string;
  date_of_visit: string;
  service: string;
  current_condition: string;
};

interface Service {
  name: string;
}

interface UpdateDataPasienFormProps {
  isOpen: boolean;
  onClose: () => void;
  pasienData: Pasien; // This should be the type of Pasien data
  onUpdate: () => void;
}

const UpdateDataPasienForm: React.FC<UpdateDataPasienFormProps> = ({
  isOpen,
  onClose,
  pasienData,
  onUpdate,
}) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [telephone, setTelephone] = useState("");
  const [date_of_visit, setDateOfVisit] = useState(new Date());
  const [service, setService] = useState("");
  const [current_condition, setCurrentCondition] = useState("");

  //list of service
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (pasienData) {
      setName(pasienData.name);
      setGender(pasienData.gender);
      setTelephone(pasienData.telephone);
      setDateOfVisit(new Date(pasienData.date_of_visit));
      setService(pasienData.service);
      setCurrentCondition(pasienData.current_condition);
    }
  }, [pasienData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("Patient")
      .update({
        name,
        gender,
        telephone,
        date_of_visit,
        service,
        current_condition,
      })
      .eq("id", pasienData.id);

    if (error) {
      console.error(error);
    } else {
      onUpdate();
      onClose();
    }
  };

  const dataService = async () => {
    const { data, error } = await supabase.from("Service").select("name");
    if (error) {
      console.error(error);
    } else {
      setServices(data as Service[]);
    }
  };

  useEffect(() => {
    dataService();
  }, []);

  const handleSelect = (service: string) => {
    setService(service);

    console.log(service); // Check the result on the console.log
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[40%] py-4 px-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-bold text-[#24C48E] mb-2 text-center">
          Ubah Data Pasien
        </h2>
        <p className="text-lg text-[#313638] text-center mb-4">
          Masukkan data yang dibutuhkan
        </p>
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Nama",
              value: name,
              onChange: setName,
            },
            {
              label: "No Telepon",
              value: telephone,
              onChange: setTelephone,
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
                className={`absolute top-2 left-4 font-semibold text-black transition-all transform ${
                  value && "text-xs top-1"
                }`}
              >
                {label}
              </label>
            </div>
          ))}
          <div className="custom-datepicker">
            <DatePicker
              selected={date_of_visit}
              onChange={(date: Date) => setDateOfVisit(date)}
              dateFormat="MMMM d, yyyy"
              className="shadow border rounded-xl w-full py-4 px-3 bg-[#F1F2F5] text-[#ABADB3] mb-2 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-y-4">
            <div className="flex items-center justify-center w-full gap-x-2">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
              >
                <option value="">Pilih Tipe</option>
                <option value="P">P</option>
                <option value="L">L</option>
              </select>

              <select className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]">
                {services.map((service) => (
                  <option
                    value={service.name}
                    onClick={() => handleSelect(service.name)}
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={status}
              onChange={(e) => setCurrentCondition(e.target.value)}
              className="block w-full p-5 mt-1 border rounded-lg text-[#F1F2F5] bg-[#ABADB3]"
            >
              <option value="">Pilih Status</option>
              <option value="Meninggal Dunia">Meninggal Dunia</option>
              <option value="Stabil">Stabil</option>
              <option value="Kritis">Kritis</option>
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

export default UpdateDataPasienForm;
