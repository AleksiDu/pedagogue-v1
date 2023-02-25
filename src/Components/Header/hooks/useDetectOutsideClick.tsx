import { useState, useEffect, RefObject } from "react";

type UseDetectOutsideClickReturn = [
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
];

type Handler = (event: MouseEvent) => void;

/**
 * Hook for handling closing when clicking outside of an element
 * @param el RefObject to the element to be observed for outside clicks
 * @param initialState Initial state of the isActive flag
 */
const useDetectOutsideClick = (
  el: RefObject<HTMLElement>,
  initialState: boolean
): UseDetectOutsideClickReturn => {
  const [isActive, setIsActive] = useState(initialState);

  // TODO outside click not works
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (el.current && !el.current.contains(e.target as Node)) {
        // setIsActive((prevIsActive) => !prevIsActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [el, isActive]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
