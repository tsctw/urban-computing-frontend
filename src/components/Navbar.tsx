import React, { useState } from "react";
import { Link } from "react-scroll";

export type Section = {
  id: string;
  label: string;
  color: string;
};

interface NavbarProps {
  sections: Section[];
}

const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="mx-auto flex justify-between items-center py-5 px-10">
        {/* Logo */}
        <h1 className="text-lg font-bold">Urban Computing App</h1>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          {sections.map((s) => (
            <Link
              key={s.id}
              to={s.id}
              smooth={true}
              duration={600}
              className="cursor-pointer text-gray-700 hover:text-blue-600"
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col space-y-2 py-2">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={s.id}
                  smooth={true}
                  duration={600}
                  offset={-60}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)} // 點擊後自動關閉選單
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
