import { useState } from "react";
import { Dropdown } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";

interface GenderDropdownButtonComponentProps {
  onSelect: (value: string) => void; // Callback to pass selected value to parent
}

const GenderDropdownButtonComponent: React.FC<
  GenderDropdownButtonComponentProps
> = ({ onSelect }) => {
  const [selectedGender, setSelectedGender] = useState<string>("");

  // Function to handle dropdown item selection

  const handleSelect = (gender: string) => {
    setSelectedGender(gender);
    onSelect(gender); // Pass the selected value to the parent component
    console.log(gender); //Check the result on the console.log
  };

  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating: { target: "w-[98%]" },
  };

  return (
    <div className="w-[98%]">
      {/* Dropdown component from Flowbite */}
      <Dropdown
        label={selectedGender ? selectedGender : "Gender"}
        theme={customTheme}
      >
        <Dropdown.Item onClick={() => handleSelect("Male")}>Male</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect("Female")}>
          Female
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default GenderDropdownButtonComponent;
