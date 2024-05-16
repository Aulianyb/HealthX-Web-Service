import { useState } from "react";
import NavBar from "../../../components/AdminComponents/NavBarAdmin/NavBarAdmin";
import RoomTable from "../../../components/AdminComponents/Table/RoomTable";
import AddDataRuanganForm from "../../../components/AdminComponents/Modals/FormModalsDataRuangan/AddDataRuanganForm";

const DataRuanganPage = () => {
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
        <h1 className="text-5xl font-semibold text-center ">Data Staff</h1>
        <div className="flex flex-row items-center justify-center">
          <button
            onClick={handleAddButtonClick}
            className="ml-4 py-4 px-6 bg-[#24C48E] text-white font-semibold rounded-xl"
          >
            +
          </button>
        </div>
      </div>
      <RoomTable />
      <AddDataRuanganForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default DataRuanganPage;
