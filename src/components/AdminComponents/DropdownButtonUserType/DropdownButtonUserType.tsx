import { Dropdown, DropdownItem } from "flowbite-react";

const Component = () => {
  return (
    <Dropdown label="Dropdown button" dismissOnClick={false} className="">
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
};

export default Component;
