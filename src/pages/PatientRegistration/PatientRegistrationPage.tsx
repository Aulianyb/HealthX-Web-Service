// src/pages/PatientRegistration/PatientRegistrationPage.tsx
import BackButton from "../../components/BackButton/BackButton";
import PatientRegistrationForm from "../../components/PatientRegistrationForm/PatientRegistrationForm";

const PatientRegistrationPage = () => {
  return (
    <div className="bg-[#24C48E] h-[100vh]">
      <div className="absolute">
        {" "}
        <BackButton />
      </div>

      <div className="flex justify-center items-center pt-4">
        <PatientRegistrationForm />
      </div>
    </div>
  );
};

export default PatientRegistrationPage;
