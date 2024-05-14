import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../HeathX-Web-Service-FE/styles.css";
import Select, {
  StylesConfig,
  ControlProps,
  SingleValueProps,
  SingleValue,
  ActionMeta,
} from "react-select";
import { CSSObject } from "@emotion/react";

type OptionType = {
  value: string;
  label: string;
};

const PatientRegistrationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<OptionType | null>(null);
  const [service, setService] = useState<OptionType | null>(null);
  const [visitDate, setVisitDate] = useState(new Date());

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const serviceOptions = [
    { value: "outpatient", label: "Rawat Jalan" },
    { value: "inpatient", label: "Rawat Inap" },
    { value: "laboratory", label: "Laboratorium" },
  ];

  const handleGenderChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setGender(newValue);
  };

  const handleServiceChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setService(newValue);
  };

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base: CSSObject, props: ControlProps<OptionType, false>) => ({
      ...base,
      backgroundColor: "#ABADB3",
      color: "#F1F2F5",
      borderColor: "#ABADB3",
    }),
    singleValue: (
      base: CSSObject,
      props: SingleValueProps<OptionType, false>
    ) => ({
      ...base,
      color: "#F1F2F5",
    }),
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-10">
      <p className="text-4xl font-bold text-black ">
        Daftar Layanan{" "}
        <p className="text-4xl font-bold  text-[#24C48E]">Rumah Sakit</p>
      </p>
      <p className="text-gray-600 my-4">
        Masukan informasi pribadi untuk melakukan pendaftaran
      </p>
      <form>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        ></label>
        <input
          id="name"
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded-xl w-full bg-[#F1F2F5] text-[#ABADB3] py-4 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        ></label>
        <input
          id="phone"
          type="text"
          placeholder="No Telepon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-xl shadow appearance-none border  w-full py-4 px-3 bg-[#F1F2F5] text-[#ABADB3] mb-2 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="flex w-full justify-between">
          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>

            <Select
              id="gender"
              options={genderOptions}
              value={gender}
              onChange={handleGenderChange}
              className="mb-2 bg-[#ABADB3] w-full mr-2 rounded-xl"
              styles={customStyles}
            />
          </div>
          <div className="w-full">
            {" "}
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-2"
              htmlFor="service"
            >
              Service
            </label>
            <Select
              id="service"
              options={serviceOptions}
              value={service}
              onChange={handleServiceChange}
              className="mb-2 bg-[#ABADB3] w-full ml-2 rounded-xl"
              styles={customStyles}
            />
          </div>
        </div>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Daftar
        </button>
      </form>
    </div>
  );
};

export default PatientRegistrationForm;
