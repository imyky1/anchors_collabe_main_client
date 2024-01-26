import { createContext, useContext, useState } from "react";

interface GeneralContextProps {
  Loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GeneralProviderProps {
  children: React.ReactNode;
}

const GeneralContext = createContext<GeneralContextProps | null>(null);

export const useGeneralSettings = () => {
  return useContext(GeneralContext);
};

export const GeneralProvider: React.FC<GeneralProviderProps> = (props) => {
  const [Loading, setLoading] = useState(false);

  return (
    <GeneralContext.Provider value={{ Loading, setLoading }}>
      {props.children}
    </GeneralContext.Provider>
  );
};
