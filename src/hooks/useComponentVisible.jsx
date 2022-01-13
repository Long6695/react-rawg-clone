import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const handleHideDropdown = (event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
    };

    const handleCLickInside = (event) => {
      if(ref.current && ref.current.contains(event.target)) {
        setIsOpen(true)
      }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('click', handleCLickInside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('click', handleCLickInside, true);
        };
    });

    return { ref, isOpen};
}