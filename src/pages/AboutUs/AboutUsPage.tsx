// src/pages/AboutUs/AboutUsPage.tsx
import NavBar from "../../components/NavBar/NavBar";

const AboutUsPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="bg-[#24C48E] flex justify-center h-[50vh] items-start">
        <img
          src="../../../public/logo-about us.svg"
          alt="health-x logo"
          className="w-[30%] mt-8"
        ></img>
      </div>
      <div className="bg-[#f9f9f9] relative">
        <div className="rounded-[40px] bg-[#FFFFFF] w-[60%] h-[55vh] shadow-xl absolute left-0 right-0 mx-auto top-[-150px]">
          <div className="flex flex-col p-8 gap-y-8">
            <p className="text-black font-bold text-5xl">Tentang Kami</p>
            <p className="text-lg">
              HealthX adalah layanan medis yang mengintegrasikan teknologi{" "}
              <i>web service, IoT, API, blockchain</i> dan{" "}
              <i>mobile application</i> untuk memberikan layanan kesehatan yang
              cepat, aman dan praktis untuk pengguna kami.
              <br />
              <br /> HealthX menyediakan cara bagi pasien untuk mendapatkan
              layanan kesehatan dengan mudah, menggunakan <i>
                web service
              </i>{" "}
              sebagai sarana pasien melakukan <i>self-registration</i>. <br />
              <br /> Tidak hanya pada sisi pasien tapi HealthX juga menyediakan
              cara bagi anggota <i>staff</i> rumah sakit untuk melakukan
              manajemen data rumah sakit dengan integrasi <i>database</i> dan{" "}
              <i>API</i> .{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
