import { useState } from "react";
import NavBar from "../../../components/AdminComponents/NavBarAdmin/NavBarAdmin";
import ServiceTable from "../../../components/AdminComponents/Table/ServiceTable";
import AddDataLayananForm from "../../../components/AdminComponents/Modals/FormModalsDataLayanan/AddDataLayananForm";

const DataLayananPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    // Refresh data or perform necessary actions after adding data
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-between mx-20 mt-12">
        <h1 className="text-5xl font-semibold text-center ">Data Layanan</h1>
        <div className="flex flex-row items-center justify-center">
          <button
            onClick={handleAddButtonClick}
            className="ml-4 py-4 px-6 bg-[#24C48E] text-white font-semibold rounded-xl"
          >
            +
          </button>
        </div>
      </div>
      <ServiceTable />
      <AddDataLayananForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default DataLayananPage;
