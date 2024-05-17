interface LogoutConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 bg-white shadow-lg rounded-xl w-[35%] h-[40%] flex flex-col justify-center items-center">
          <p className="text-3xl font-bold text-[#24C48E] mb-4 text-center">
          Apakah anda yakin ingin logout dari website?
          </p>
          <div className="flex flex-col items-center justify-center w-full gap-y-2">
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-[#24C48E] rounded-xl w-full"
            >
              Ya
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-[#24C48E] bg-white border border-[#24C48E] rounded-xl w-full"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoutConfirmationModal;
  