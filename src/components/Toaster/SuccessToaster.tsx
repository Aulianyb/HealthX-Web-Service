//SuccessToaster.tsx
import React from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

interface SuccessToasterProps {
  message: string;
}

const SuccessToaster: React.FC<SuccessToasterProps> = ({ message }) => {
  return (
    <Toast>
      <div className="inline-flex items-center justify-center w-4 h-4 text-green-500 bg-green-100 rounded-lg shrink-0 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="w-5 h-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default SuccessToaster;
