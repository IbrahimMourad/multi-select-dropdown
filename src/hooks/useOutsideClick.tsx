import { useEffect, useRef, useState } from "react";

export const useOutsideClick = () => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const handleDisplay = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDropdownDisplayed((prev) => !prev);
  };
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.target !== ref.current) setIsDropdownDisplayed(false);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return [isDropdownDisplayed, handleDisplay, ref];
};
