import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface DwlrData {
  total: number,
  active: number,
  anomalyDwlr: number,
  lowBattery: number,
  states: string[],
}

interface DwlrContextType {
  data: DwlrData | any;
  loading: boolean;
  error: string | any;
  setData: (newData: DwlrData) => void;
}

const DwlrContext = createContext<DwlrContextType | undefined>(undefined);

const fetchInfo = async (): Promise<Omit<DwlrData, 'states'>> => {
  const response = await axios.get<Omit<DwlrData, 'states'>>('http://localhost:8000/api/v1/dwlr/info');
  return response.data;
};

// API function to fetch states
const fetchStates = async (): Promise<string[]> => {
  const response = await axios.get<{ states: string[] }>('http://localhost:8000/api/v1/dwlr/states');
  return response.data.states;
};

export const DwlrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DwlrData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, states] = await Promise.all([fetchInfo(), fetchStates()]);
        setData({
          ...info,
          states,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DwlrContext.Provider value={{ data, loading, error, setData }}>
      {children}
    </DwlrContext.Provider>
  );
};

// Custom hook to use the DwlrContext
export const useDwlrContext = (): DwlrContextType => {
  const context = useContext(DwlrContext);
  if (!context) {
    throw new Error('useDwlrContext must be used within a DwlrProvider');
  }
  return context;
};
