import { supabase } from "../../../lib/API";
import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { BiEditAlt } from "react-icons/bi";

import SuccessToaster from "../../Toaster/SuccessToaster";
import FailedToaster from "../../Toaster/FailedToaster";
import WarningToaster from "../../Toaster/WarningToaster";

//modals
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModals";
import UpdateDataPasienForm from "../Modals/FormModalsDataPasien/UpdateDataPasienForm";

type Pasien = {
  id: Int8Array;
  name: string;
  gender: string;
  telephone: string;
  date_of_visit: string;
  service: string;
  current_condition: string;
};

const PasienTable = () => {
  const [dataPasien, setDataPasien] = useState<Pasien[]>([]);

  //Modal Open
  const [isOpen, setIsOpen] = useState(false);

  //Nampung Data Pasien Yang Dipilih
  const [selectedPasien, setSelectedPasien] = useState<Pasien | null>(null);

  //State Modal terbuka atau ngga
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //Toaster
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  useEffect(() => {
    dataDataPasien();
  }, []);

  const fetchPasien = () => {
    dataDataPasien();
  };

  //Load Data Pasien
  const dataDataPasien = async () => {
    const { data, error } = await supabase.from("Patient").select("*");

    if (error) {
      console.error(error);
    } else {
      setDataPasien(data);
      console.log(data);
    }
  };

  //Delete Data Pasien
  const deleteDataPasien = async (id: Int8Array) => {
    const { data, error } = await supabase
      .from("Patient")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setToastMessage("Gagal Menghapus Data!");
      setToastType("error");
    } else {
      console.log(data);
      setToastMessage("Berhasil Menghapus Data");
      setToastType("success");
      fetchPasien(); // Refetch the data to include the new data account / refresh page
    }
    setTimeout(() => setToastMessage(null), 3000); // Remove toast after 3 seconds
  };

  //kalau icon delete ditekan
  const handleDelete = (pasien: Pasien) => {
    setSelectedPasien(pasien);
    setIsOpen(true);
  };

  //kalau button "ya" ditekan untuk menghapus
  const handleConfirmDelete = () => {
    if (selectedPasien) {
      deleteDataPasien(selectedPasien.id);
    }
    setIsOpen(false);
  };

  //kalau icon edit ditekan
  const handleEdit = (pasien: Pasien) => {
    setSelectedPasien(pasien);
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
            <th className={tableHeadDesign}>Gender</th>
            <th className={tableHeadDesign}>Tanggal Berkunjung</th>
            <th className={tableHeadDesign}>Layanan</th>
            <th className={tableHeadDesign}>Kondisi</th>

            <th className={tableHeadDesign}></th>
          </tr>
        </thead>
        <tbody>
          {dataPasien.map((data) => (
            <tr className="border-2 border-b-[#ABADB3]">
              <td className={tableDataDesign}>{data.id}</td>
              <td className={tableDataDesign}>{data.name}</td>
              <td className={tableDataDesign}>{data.gender}</td>
              <td className={tableDataDesign}>{data.date_of_visit}</td>
              <td className={tableDataDesign}>{data.service}</td>
              <td className={tableDataDesign}>{data.current_condition}</td>

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
      {selectedPasien && (
        <UpdateDataPasienForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          pasienData={selectedPasien}
          onUpdate={fetchPasien}
        />
      )}
    </div>
  );
};

export default PasienTable;
