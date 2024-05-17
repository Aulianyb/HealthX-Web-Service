import { supabase } from "../../../lib/API";
import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { BiEditAlt } from "react-icons/bi";

import SuccessToaster from "../../Toaster/SuccessToaster";
import FailedToaster from "../../Toaster/FailedToaster";
import WarningToaster from "../../Toaster/WarningToaster";

//modals
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModals";

import UpdateDataLayananForm from "./../Modals/FormModalsDataLayanan/UpdateDataLayananForm";

type Layanan = {
  id: Int8Array;
  name: string;
  price: number;
  duration: string;
};

const LayananTable = () => {
  const [dataLayanan, setDataLayanan] = useState<Layanan[]>([]);

  //Modal Open
  const [isOpen, setIsOpen] = useState(false);

  //Nampung Data Layanan Yang Dipilih
  const [selectedLayanan, setSelectedLayanan] = useState<Layanan | null>(null);

  //State Modal terbuka atau ngga
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //Toaster
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  useEffect(() => {
    dataDataLayanan();
  }, []);

  const fetchLayanan = () => {
    dataDataLayanan();
  };

  //Load Data Layanan
  const dataDataLayanan = async () => {
    const { data, error } = await supabase.from("Service").select("*");

    if (error) {
      console.error(error);
    } else {
      setDataLayanan(data);
      console.log(data);
    }
  };

  //Delete Data Layanan
  const deleteDataLayanan = async (id: Int8Array) => {
    const { data, error } = await supabase
      .from("Service")
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
      fetchLayanan(); // Refetch the data to include the new data account / refresh page
    }
    setTimeout(() => setToastMessage(null), 3000); // Remove toast after 3 seconds
  };

  //kalau icon delete ditekan
  const handleDelete = (layanan: Layanan) => {
    setSelectedLayanan(layanan);
    setIsOpen(true);
  };

  //kalau button "ya" ditekan untuk menghapus
  const handleConfirmDelete = () => {
    if (selectedLayanan) {
      deleteDataLayanan(selectedLayanan.id);
    }
    setIsOpen(false);
  };

  //kalau icon edit ditekan
  const handleEdit = (layanan: Layanan) => {
    setSelectedLayanan(layanan);
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
            <th className={tableHeadDesign}>Harga</th>
            <th className={tableHeadDesign}>Durasi</th>
          </tr>
        </thead>
        <tbody>
          {dataLayanan.map((data) => (
            <tr className="border-2 border-b-[#ABADB3]">
              <td className={tableDataDesign}>{data.id}</td>
              <td className={tableDataDesign}>{data.name}</td>
              <td className={tableDataDesign}>{data.price}</td>
              <td className={tableDataDesign}>{data.duration}</td>

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
      {selectedLayanan && (
        <UpdateDataLayananForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          layananData={selectedLayanan}
          onUpdate={fetchLayanan}
        />
      )}
    </div>
  );
};

export default LayananTable;
