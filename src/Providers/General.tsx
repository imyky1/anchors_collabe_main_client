import { SetStateAction, createContext, useContext, useState } from "react";

interface GeneralContextProps {
  Loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  BuildProfileCompletion: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
  setBuildProfileCompletion: React.Dispatch<
    SetStateAction<{
      one: number;
      two: number;
      three: number;
      four: number;
      five: number;
    }>
  >;
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

  const [BuildProfileCompletion, setBuildProfileCompletion] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });

  return (
    <GeneralContext.Provider
      value={{
        Loading,
        setLoading,
        setBuildProfileCompletion,
        BuildProfileCompletion,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};
