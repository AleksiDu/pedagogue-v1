import {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo,
} from "react";

interface ImageIdContextType {
  imageId: string | undefined;
  setImageId: Dispatch<SetStateAction<string | undefined>>;
}

type ImageIdProviderProp = {
  children: ReactNode;
};

export const ImageIdContext = createContext<ImageIdContextType>({
  imageId: undefined,
  setImageId: () => {},
});

export const ImageIdProvider: FC<ImageIdProviderProp> = ({ children }) => {
  const [imageId, setImageId] = useState<string | undefined>(undefined);
  const contextValue = useMemo(
    () => ({ imageId, setImageId }),
    [imageId, setImageId]
  );

  return (
    <ImageIdContext.Provider value={contextValue}>
      {children}
    </ImageIdContext.Provider>
  );
};
