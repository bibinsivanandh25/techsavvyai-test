import { createContext, useState } from 'react';

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [tempSelection, setTempSelection] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  return (
    <AppContext.Provider
      value={{
        tempSelection,
        setTempSelection,
        selectedStartDate,
        setSelectedEndDate,
        setSelectedStartDate,
        selectedEndDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
