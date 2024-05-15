// ServiceDropdownButton.tsx
import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { supabase } from "../../../lib/API";
import type { CustomFlowbiteTheme } from "flowbite-react";

interface Service {
  name: string;
}

interface DropdownButtonComponentProps {
  onSelect: (value: string) => void; // Callback to pass selected value to parent
}

const DropdownButtonComponent: React.FC<DropdownButtonComponentProps> = ({
  onSelect,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");

  // Fetch service types from Supabase
  const dataService = async () => {
    const { data, error } = await supabase.from("Service").select("name");
    if (error) {
      console.error(error);
    } else {
      setServices(data as Service[]);
    }
  };

  useEffect(() => {
    dataService();
  }, []);

  // Handle selection of a service type
  const handleSelect = (service: string) => {
    setSelectedService(service);
    onSelect(service); // Pass the selected value to the parent component
    console.log(service); // Check the result on the console.log
  };

  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating: {
      target: "w-[98%]",
    },
  };

  return (
    <div className="w-[98%]">
      <Dropdown
        label={selectedService ? selectedService : "Layanan"}
        theme={customTheme}
        // Conditionally set the background color based on the selected service
        // className={`${selectedService ? "bg-[#24C48E]" : "bg-[#ABADB3]"}`}
      >
        {services.map((service) => (
          <Dropdown.Item
            key={service.name}
            onClick={() => handleSelect(service.name)}
          >
            {service.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default DropdownButtonComponent;
