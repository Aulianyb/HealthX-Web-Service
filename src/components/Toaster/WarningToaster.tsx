//WarningToaster.tsx
import React from "react";
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

interface WarningToasterProps {
  message: string;
}

const WarningToaster: React.FC<WarningToasterProps> = ({ message }) => {
  return (
    <Toast>
      <div className="inline-flex items-center justify-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg shrink-0 dark:bg-orange-700 dark:text-orange-200">
        <HiExclamation className="w-5 h-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default WarningToaster;
