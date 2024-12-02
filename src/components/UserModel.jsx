import { useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { MdLogout, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { authService } from '../services';
import { useNavigate } from 'react-router-dom';

const UserModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const dropdownRef = useRef(null);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const { fullName } = JSON.parse(localStorage.getItem('userIdentity'));

  // // Close dropdown if user clicks outside of it
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   // Listen for clicks on the document
  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Clean up the event listener
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative">
      <button className="flex" onClick={() => setIsOpen(!isOpen)}>
        <FiUser className="text-xl" />
        <span>
          <MdOutlineKeyboardArrowDown />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-md z-10 p-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#2A4DD8] rounded-full w-9 h-9 flex items-center justify-center text-white text-base">
              {fullName[0]}
            </span>

            <div>
              <h3 className="font-medium leading-[0.5] text-sm">{fullName}</h3>
              <span className="text-xs mt-[-4px]">Online</span>
            </div>
          </div>
          <button
            className="w-full flex items-center gap-4 text-[#3E4D66] text-sm mt-3 transition duration-300 hover:bg-[#e7e5e5] p-2"
            onClick={handleLogout}
          >
            <span>
              <MdLogout className="text-lg" />
            </span>{' '}
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserModel;
