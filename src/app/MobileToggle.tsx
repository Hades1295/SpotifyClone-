// components/MobileToggle.tsx
import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileToggle({ isOpen, toggleMenu }: Props) {
  return (
    <div className="lg:hidden flex justify-end">
      <button
        className="text-white text-2xl p-2 focus:outline-none"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </div>
  );
}
