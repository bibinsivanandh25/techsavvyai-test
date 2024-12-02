import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { IoIosArrowDown } from 'react-icons/io';
import { RiCalendarEventLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from '../contexts/AppContext';

const DateRangePickerModal = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const {
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  } = useContext(AppContext);

  const [startDate, setStartDate] = useState(selectedStartDate);
  const [endDate, setEndDate] = useState(selectedEndDate);

  // Previous selected date range
  const [previousStartDate, setPreviousStartDate] = useState(selectedStartDate);
  const [previousEndDate, setPreviousEndDate] = useState(selectedEndDate);

  const handleApply = () => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    setPreviousStartDate(selectedStartDate);
    setPreviousEndDate(selectedEndDate);
    setIsModelOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 border-2 border-[#ebe6e6] rounded-lg py-1 px-2 cursor-pointer"
        onClick={() => setIsModelOpen(!isModelOpen)}
      >
        <RiCalendarEventLine className="text-[#8F8F91] text-xl" />
        <div className="flex flex-col">
          <span className="text-xs">
            <strong>Days</strong>: {selectedStartDate.toLocaleDateString()} -{' '}
            {selectedEndDate.toLocaleDateString()}
          </span>
          <span className="text-[11px] text-[#7C7E81]">
            Compared: {previousStartDate.toLocaleDateString()} -{' '}
            {previousEndDate.toLocaleDateString()}
          </span>
        </div>
        <IoIosArrowDown className="text-[#8F8F91] text-base" />
      </div>

      {/* Date Range Modal */}
      {isModelOpen && (
        <div className="absolute top-16 right-16 w-[300px] bg-white border-2 border-[#ebe6e6] rounded-lg shadow-lg p-4 z-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Start Date"
                className="p-2 border rounded"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select End Date"
                className="p-2 border rounded"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleApply}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Apply
              </button>
              <button
                onClick={() => setIsModelOpen(false)}
                className="bg-[#F2F2F2]  text-black py-2 px-4 rounded hover:bg-[#e1dfdf] "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePickerModal;
