import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div className="flex flex-start p-8">
      <Link
        to="/"
        className="bg-[#313638] hover:bg-[#101416] text-[#f9f9f9] hover:font-bold py-2 px-6 text-xl rounded-xl"
      >
        Kembali
      </Link>
    </div>
  );
};

export default BackButton;
