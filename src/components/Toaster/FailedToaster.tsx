//FailedToaster.tsx
import React from "react";
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

interface FailedToasterProps {
  message: string;
}

const FailedToaster: React.FC<FailedToasterProps> = ({ message }) => {
  return (
    <Toast>
      <div className="inline-flex items-center justify-center w-4 h-4 text-orange-500 bg-orange-100 rounded-lg shrink-0 dark:bg-orange-700 dark:text-orange-200">
        <HiExclamation className="w-5 h-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default FailedToaster;
