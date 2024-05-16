import { useState } from "react";
import NavBar from "../../../components/AdminComponents/NavBarAdmin/NavBarAdmin";
import DoctorTable from "../../../components/AdminComponents/Table/DoctorTable";
import NurseTable from "../../../components/AdminComponents/Table/NurseTabel";
import StaffTable from "../../../components/AdminComponents/Table/StaffTable";
import DropdownButton from "../../../components/AdminComponents/DropdownButtonUserType/DropdownButtonUserType";
import AddDataDoctorForm from "../../../components/AdminComponents/Modals/FormModalsDataStaff/AddDataDoctorForm";
import AddDataNurseForm from "../../../components/AdminComponents/Modals/FormModalsDataStaff/AddDataNurseForm";
import AddDataStaffForm from "../../../components/AdminComponents/Modals/FormModalsDataStaff/AddDataStaffForm";

const DataStaffPage = () => {
  const [selectedStaffType, setSelectedStaffType] = useState("Dokter");
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

  const renderTable = () => {
    switch (selectedStaffType) {
      case "Dokter":
        return <DoctorTable />;
      case "Suster":
        return <NurseTable />;
      case "Staff":
        return <StaffTable />;
      default:
        return null;
    }
  };

  return (
    <div>
      <NavBar />

      <div className="flex items-center justify-between mx-20 mt-12">
        <h1 className="text-5xl font-semibold text-center ">Data Staff</h1>
        <div className="flex flex-row items-center justify-center">
          <DropdownButton onSelect={setSelectedStaffType} />
          <button
            onClick={handleAddButtonClick}
            className="ml-4 py-4 px-6 bg-[#24C48E] text-white font-semibold rounded-xl"
          >
            +
          </button>
        </div>
      </div>
      {renderTable()}
      {selectedStaffType === "Dokter" && (
        <AddDataDoctorForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleAdd}
        />
      )}
      {selectedStaffType === "Suster" && (
        <AddDataNurseForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleAdd}
        />
      )}
      {selectedStaffType === "Staff" && (
        <AddDataStaffForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default DataStaffPage;
