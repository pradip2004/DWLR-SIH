import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Coordinate {
  _id: string;
  id: string;
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  lowBattery: boolean;
  anomalyDwlr: boolean;
}

interface DwlrData {
  total: number;
  active: number;
  anomalyDwlr: number;
  lowBattery: number;
  states: string[];
  coordinates: Coordinate[]; // New addition
}

interface DwlrContextType {
  data: DwlrData | null;
  loading: boolean;
  error: string | null;
  setData: (newData: Partial<DwlrData>) => void;
}

const DwlrContext = createContext<DwlrContextType | undefined>(undefined);

const fetchInfo = async (): Promise<Omit<DwlrData, 'states' | 'coordinates'>> => {
  const response = await axios.get<Omit<DwlrData, 'states' | 'coordinates'>>(
    'http://localhost:8000/api/v1/dwlr/info'
  );
  return response.data;
};

const fetchStates = async (): Promise<string[]> => {
  const response = await axios.get<{ states: string[] }>('http://localhost:8000/api/v1/dwlr/states');
  return response.data.states;
};

const fetchCoordinates = async (): Promise<Coordinate[]> => {
  const response = await axios.get<Coordinate[]>('http://localhost:8000/api/v1/dwlr/coordinates-info');
  return response.data;
};

export const DwlrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DwlrData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, states, coordinates] = await Promise.all([
          fetchInfo(),
          fetchStates(),
          fetchCoordinates(),
        ]);
        setData({
          ...info,
          states,
          coordinates,
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
