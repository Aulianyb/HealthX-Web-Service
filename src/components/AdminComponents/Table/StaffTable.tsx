import { supabase } from "../../../lib/API";
import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { BiEditAlt } from "react-icons/bi";

import SuccessToaster from "../../Toaster/SuccessToaster";
import FailedToaster from "../../Toaster/FailedToaster";
import WarningToaster from "../../Toaster/WarningToaster";

//modals
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModals";
import UpdateDataStaffForm from "../Modals/FormModalsDataStaff/UpdateDataStaffForm";

type Staff = {
  id: Int8Array;
  name: string;
  role: string;
  telephone: string;
  department: string;
  shift_day: string;
  shift_hours: string;
};

const StaffTable = () => {
  const [dataStaff, setDataStaff] = useState<Staff[]>([]);

  //Modal Open
  const [isOpen, setIsOpen] = useState(false);

  //Nampung Data Staff Yang Dipilih
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  //State Modal terbuka atau ngga
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //Toaster
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  useEffect(() => {
    dataDataStaff();
  }, []);

  const fetchStaff = () => {
    dataDataStaff();
  };

  //Load Data Staff
  const dataDataStaff = async () => {
    const { data, error } = await supabase.from("Staff").select("*");

    if (error) {
      console.error(error);
    } else {
      setDataStaff(data);
      console.log(data);
    }
  };

  //Delete Data Staff
  const deleteDataStaff = async (id: Int8Array) => {
    const { data, error } = await supabase.from("Staff").delete().eq("id", id);

    if (error) {
      console.error(error);
      setToastMessage("Gagal Menghapus Data!");
      setToastType("error");
    } else {
      console.log(data);
      setToastMessage("Berhasil Menghapus Data");
      setToastType("success");
      fetchStaff(); // Refetch the data to include the new data account / refresh page
    }
    setTimeout(() => setToastMessage(null), 3000); // Remove toast after 3 seconds
  };

  //kalau icon delete ditekan
  const handleDelete = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsOpen(true);
  };

  //kalau button "ya" ditekan untuk menghapus
  const handleConfirmDelete = () => {
    if (selectedStaff) {
      deleteDataStaff(selectedStaff.id);
    }
    setIsOpen(false);
  };

  //kalau icon edit ditekan
  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsUpdateModalOpen(true);
  };

  const tableHeadDesign = "text-center font-bold text-[#313638]  p-2";
  const tableDataDesign = "text-center text-[#313638]  p-4";

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="border border-seperate table-auto border-[#ABADB3] w-[90%] my-4 ">
        <thead className=" bg-[#F1F2F5] ">
          <tr className="border-2 border-b-[#24C48E] ">
            <th className={tableHeadDesign}>ID</th>
            <th className={tableHeadDesign}>Nama</th>
            <th className={tableHeadDesign}>Role</th>
            <th className={tableHeadDesign}>No Telepon</th>
            <th className={tableHeadDesign}>Departemen</th>
            <th className={tableHeadDesign}>Hari Kerja</th>
            <th className={tableHeadDesign}>Jam Kerja</th>
            <th className={tableHeadDesign}></th>
          </tr>
        </thead>
        <tbody>
          {dataStaff.map((data) => (
            <tr className="border-2 border-b-[#ABADB3]">
              <td className={tableDataDesign}>{data.id}</td>
              <td className={tableDataDesign}>{data.name}</td>
              <td className={tableDataDesign}>{data.role}</td>
              <td className={tableDataDesign}>{data.telephone}</td>
              <td className={tableDataDesign}>{data.department}</td>
              <td className={tableDataDesign}>{data.shift_day}</td>
              <td className={tableDataDesign}>{data.shift_hours}</td>
              {/* action icon */}
              <td className="flex justify-center p-4 gap-x-2 ">
                <button type="button" onClick={() => handleDelete(data)}>
                  <HiOutlineTrash />
                </button>
                <button type="button" onClick={() => handleEdit(data)}>
                  <BiEditAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {toastMessage &&
          (toastType === "success" ? (
            <SuccessToaster message={toastMessage} />
          ) : toastType === "error" ? (
            <FailedToaster message={toastMessage} />
          ) : toastType === "warning" ? (
            <WarningToaster message={toastMessage} />
          ) : null)}
      </div>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      {selectedStaff && (
        <UpdateDataStaffForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          staffData={selectedStaff}
          onUpdate={fetchStaff}
        />
      )}
    </div>
  );
};

export default StaffTable;
