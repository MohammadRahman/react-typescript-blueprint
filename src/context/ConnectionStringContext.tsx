import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
type Database = {
  databaseName: string;
  username: string;
  port: string | number;
  password: string;
  host: string;
};

interface SourceTypeContextProps {
  type: number;
  database: Database;
  setConnectionString: (type: number, database: Database) => void;
}

// Create the context
const SourceTypeContext = createContext<SourceTypeContextProps | undefined>(undefined);

// Provider component
export const SourceTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [type, setType] = useState<number>(0);
  const [database, setDatabase] = useState<Database>({
    databaseName: "",
    username: "",
    port: "",
    password: "",
    host: "",
  });

  // Method to set the connection string
  const setConnectionString = (newType: number, newDatabase: Database) => {
    setType(newType);
    setDatabase(newDatabase);
  };

  return (
    <SourceTypeContext.Provider value={{ type, database, setConnectionString }}>
      {children}
    </SourceTypeContext.Provider>
  );
};

// Custom hook to use the context
export const useSourceType = (): SourceTypeContextProps => {
  const context = useContext(SourceTypeContext);
  if (!context) {
    throw new Error("useSourceType must be used within a SourceTypeProvider");
  }
  return context;
};

interface ConnectionStrContextProps {
  connectionStr: string;
  setConnectionString: (str: string) => void;
}

// Create the context
const ConnectionStrContext = createContext<ConnectionStrContextProps | undefined>(undefined);

// Provider component
export const ConnectionStrProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connectionStr, setConnectionStr] = useState<string>("");

  // Method to set the connection string
  const setConnectionString = (str: string) => {
    setConnectionStr(str);
  };

  return (
    <ConnectionStrContext.Provider value={{ connectionStr, setConnectionString }}>
      {children}
    </ConnectionStrContext.Provider>
  );
};

// Custom hook to use the context
export const useConnectionStr = (): ConnectionStrContextProps => {
  const context = useContext(ConnectionStrContext);
  if (!context) {
    throw new Error("useConnectionStr must be used within a ConnecStrProvider");
  }
  return context;
};
