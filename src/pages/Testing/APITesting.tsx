import { supabase } from "../../lib/API";
import { useState, useEffect } from "react";
import EditModal from "../../components/AdminComponents/APITestingModal/APITestingModal";

interface accountData {
  id?: string;
  username: string;
  password: string;
}
const APITesting = () => {
  const [dataAkun, setDataAkun] = useState<accountData[]>([]);
  const [dataAkun1, setDataAkun1] = useState({
    username: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<accountData | null>(
    null
  );

  useEffect(() => {
    dataUser();
  }, []);

  // Refetch user data when the component is mounted
  const fetchUsers = () => {
    dataUser();
  };

  const dataUser = async () => {
    const { data, error } = await supabase.from("Account").select("*");

    if (error) {
      console.error(error);
    } else {
      setDataAkun(data);
      console.log(data);
    }
  };

  const createAkun = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("Account")
      .insert({ username: dataAkun1.username, password: dataAkun1.password });

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      fetchUsers(); // Refetch the data to include the new account
    }
  };

  //delete akun
  const deleteAkun = async (username: string) => {
    const { data, error } = await supabase
      .from("Account")
      .delete()
      .eq("username", username);

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      fetchUsers(); // Refetch the data to include the new account
    }
  };

  //update Akun
  const updateAkun = async (akun: accountData) => {
    const { data, error } = await supabase
      .from("Account")
      .update({ username: akun.username, password: akun.password })
      .eq("id", akun.id);

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      fetchUsers();
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setDataAkun1({
      ...dataAkun1,
      [name]: value,
    });
  };

  const openModal = (account: accountData) => {
    setSelectedAccount(account);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAccount(null);
  };

  const handleSave = (account: accountData) => {
    updateAkun(account);
    closeModal();
  };

  return (
    <div>
      <p> TESTING </p>
      <table className="ml-4 border border-collapse table-auto border-slate-500">
        <thead>
          <tr>
            <th className="p-4 text-center border border-slate-600">
              username
            </th>
            <th className="p-4 text-center border border-slate-600">
              password
            </th>
            <th className="p-4 text-center border border-slate-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataAkun.map((data) => (
            <tr>
              <td className="p-2 text-center">{data.username}</td>
              <td className="p-2 text-center">{data.password}</td>
              {/* delete button */}
              <td className="p-2 text-center gap-x-2">
                <button
                  type="button"
                  className="p-2 bg-red-600 rounded-xl"
                  onClick={() => {
                    deleteAkun(data.username);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="p-2 bg-blue-600 rounded-xl"
                  onClick={() => openModal(data)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form CreateAkun */}
      <form onSubmit={createAkun}>
        <div>
          <label className="block mb-2 text-sm font-bold">Username</label>
          <input
            type="text"
            name="username"
            value={dataAkun1.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold">Password</label>
          <input
            type="password"
            name="password"
            value={dataAkun1.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Create Account
        </button>
      </form>

      {/* Edit Modal */}
      {selectedAccount && (
        <EditModal
          isOpen={isOpen}
          onClose={closeModal}
          onSave={handleSave}
          account={selectedAccount}
        />
      )}
    </div>
  );
};

export default APITesting;
