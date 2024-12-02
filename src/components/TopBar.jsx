import { MdOutlineDarkMode } from 'react-icons/md';
import UserModel from './UserModel';
import DateRangePickerModal from './DateRangePickerModal';
import FullscreenButton from './FullScreenButton';

const TopBar = () => {
  return (
    <header className="bg-white h-14 flex items-center justify-between px-5">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-7">
        <DateRangePickerModal />
        <div className="flex items-center gap-6">
          <FullscreenButton />
          <button>
            <MdOutlineDarkMode className="text-xl text-[#3E4D66]" />
          </button>
          <UserModel />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
