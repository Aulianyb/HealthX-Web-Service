import { supabase } from "../../../lib/API";
import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { BiEditAlt } from "react-icons/bi";

import SuccessToaster from "../../Toaster/SuccessToaster";
import FailedToaster from "../../Toaster/FailedToaster";
import WarningToaster from "../../Toaster/WarningToaster";

//modals
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModals";

import UpdateDataRuanganForm from "./../Modals/FormModalsDataRuangan/UpdateDataRuanganForm";

type Ruangan = {
  id: string;
  room_type: string;
  building: string;
  is_available: boolean;
};

const RuanganTable = () => {
  const [dataRuangan, setDataRuangan] = useState<Ruangan[]>([]);

  //Modal Open
  const [isOpen, setIsOpen] = useState(false);

  //Nampung Data Ruangan Yang Dipilih
  const [selectedRuangan, setSelectedRuangan] = useState<Ruangan | null>(null);

  //State Modal terbuka atau ngga
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //Toaster
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  useEffect(() => {
    dataDataRuangan();
  }, []);

  const fetchRuangan = () => {
    dataDataRuangan();
  };

  //Load Data Ruangan
  const dataDataRuangan = async () => {
    const { data, error } = await supabase.from("Room").select("*");

    if (error) {
      console.error(error);
    } else {
      setDataRuangan(data);
      console.log(data);
    }
  };

  //Delete Data Ruangan
  const deleteDataRuangan = async (id: string) => {
    const { data, error } = await supabase.from("Room").delete().eq("id", id);

    if (error) {
      console.error(error);
      setToastMessage("Gagal Menghapus Data!");
      setToastType("error");
    } else {
      console.log(data);
      setToastMessage("Berhasil Menghapus Data");
      setToastType("success");
      fetchRuangan(); // Refetch the data to include the new data account / refresh page
    }
    setTimeout(() => setToastMessage(null), 3000); // Remove toast after 3 seconds
  };

  //kalau icon delete ditekan
  const handleDelete = (ruangan: Ruangan) => {
    setSelectedRuangan(ruangan);
    setIsOpen(true);
  };

  //kalau button "ya" ditekan untuk menghapus
  const handleConfirmDelete = () => {
    if (selectedRuangan) {
      deleteDataRuangan(selectedRuangan.id);
    }
    setIsOpen(false);
  };

  //kalau icon edit ditekan
  const handleEdit = (ruangan: Ruangan) => {
    setSelectedRuangan(ruangan);
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
            <th className={tableHeadDesign}>Tipe Ruangan</th>
            <th className={tableHeadDesign}>Gedung</th>
            <th className={tableHeadDesign}>Tersedia</th>
          </tr>
        </thead>
        <tbody>
          {dataRuangan.map((data) => (
            <tr className="border-2 border-b-[#ABADB3]">
              <td className={tableDataDesign}>{data.id}</td>
              <td className={tableDataDesign}>{data.room_type}</td>
              <td className={tableDataDesign}>{data.building}</td>
              <td className={tableDataDesign}>
                {data.is_available ? "Tersedia" : "Penuh"}
              </td>

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
      {selectedRuangan && (
        <UpdateDataRuanganForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          ruanganData={selectedRuangan}
          onUpdate={fetchRuangan}
        />
      )}
    </div>
  );
};

export default RuanganTable;
