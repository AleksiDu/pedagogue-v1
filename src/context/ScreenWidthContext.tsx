import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ScreenWidthProps = {
  children: ReactNode;
};

const ScreenWidthContext = createContext<number>(0);

export const useScreenWidth = (): number => useContext(ScreenWidthContext);

export const ScreenWidthProvider: React.FC<ScreenWidthProps> = ({
  children,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenWidthContext.Provider value={screenWidth}>
      {children}
    </ScreenWidthContext.Provider>
  );
};
