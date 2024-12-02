import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { metricsService } from '../services';

const MetricsSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [tempSelection, setTempSelection] = useState([]);
  // const dropdownRef = useRef(null);

  // Handle checkbox change
  const handleCheckboxChange = (option) => {
    setTempSelection((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // Apply selection
  const handleApply = () => {
    setSelectedMetrics(tempSelection);
    setIsOpen(false);
  };

  // Cancel changes
  const handleCancel = () => {
    setTempSelection(selectedMetrics); // Reset to previously selected metrics
    setIsOpen(false);
  };

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

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const { result } = await metricsService.getMetricsDropdown();
        setOptions(result);
      } catch (error) {
        console.log('Error fetching dropdown data:', error);
      }
    };
    fetchDropdown();
  }, []);

  return (
    <div className="relative inline-block">
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-[#A7A7A7] px-4 py-2 rounded-md flex items-center gap-3 text-sm"
      >
        Select Metrics
        <span>
          <IoIosArrowDown className="text-lg text-[#8F8F91]" />
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-md z-10 ">
          <div className="px-3 py-2 max-h-60 overflow-auto">
            {options.map((option) => (
              <label
                key={option.code}
                className="flex items-center mb-2 text-[#5F6368] text-sm"
              >
                <input
                  type="checkbox"
                  checked={tempSelection.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2 w-[17px]"
                />
                {option.label}
              </label>
            ))}
          </div>

          {/* Cancel and Apply buttons */}
          <div className="flex justify-between p-2">
            <button
              onClick={handleCancel}
              className="bg-[#F2F2F2] px-3 py-1 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsSelector;
