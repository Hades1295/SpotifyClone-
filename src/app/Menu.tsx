// components/Menu.tsx
import React from "react";

interface Props {
  views: string[];
  currentView: string;
  isOpen: boolean;
  onSelect: (view: string) => void;
}

export default function Menu({ views, currentView, isOpen, onSelect }: Props) {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-center 
      ${isOpen ? "block" : "hidden"} lg:flex 
      space-y-2 lg:space-y-0 lg:space-x-4 bg-black lg:bg-transparent p-4 rounded-md`}
    >
      {views.map((viewName) => (
        <button
          key={viewName}
          aria-label={viewName}
          onClick={() => onSelect(viewName)}
          className={`flex items-center justify-center px-4 py-2 rounded-md w-full lg:w-auto transition-all duration-300
            ${currentView === viewName
              ? "bg-[#1DB954] text-black"
              : "text-white bg-black hover:bg-[#1DB954] hover:text-black"
            }`}
        >
          {viewName}
        </button>
      ))}
    </div>
  );
}
