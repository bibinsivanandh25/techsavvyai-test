import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { VscDashboard } from 'react-icons/vsc';
import { useState } from 'react';
import mainLogo from '../assets/mainLogo.png';
import { IoSettingsOutline } from 'react-icons/io5';

const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="fixed left-0 top-0 z-10">
      <nav
        className="h-screen bg-white max-w-full flex flex-col items-center w-[80px] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border-b mb-8 py-6 w-full flex justify-center items-center">
          <img src={logo} alt="logo-icon" width={'30px'} />
        </div>
        <div className="flex flex-col justify-between items-center h-screen w-full">
          <div className="bg-[#342885] p-2 rounded-xl">
            <VscDashboard className="text-3xl text-[#D0D5DD]" />
          </div>
          <div className="w-full py-6 flex justify-center items-center border-t">
            <IoSettingsOutline className="text-[#c4c7cd] text-3xl" />
          </div>
        </div>
      </nav>

      {isHovered && (
        <nav
          className="h-screen bg-white flex flex-col items-center w-[270px] absolute top-0 left-0 z-10 border-r shadow-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="border-b mb-8 py-6 w-full flex justify-center items-center">
            <Link to="/main">
              <img src={mainLogo} alt="main-icon" width={'180px'} />
            </Link>
          </div>
          <div className="flex flex-col justify-between h-screen w-full">
            <div className="bg-[#F6F0FF] p-2 rounded-lg text-[#5208A5] flex items-center gap-3 px-5 mx-4">
              <VscDashboard className="text-3xl" />
              <span>Dashboard</span>
            </div>
            <div className="w-full py-6 flex items-center border-t gap-3 px-5">
              <IoSettingsOutline className="text-[#667085] text-3xl font-medium" />
              <span>Settings</span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default SideBar;
