"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">LocaFlow</div>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#proprietaire" className="hover:text-blue-600">Propriétaire</a>
          <a href="#locataire" className="hover:text-blue-600">Locataire</a>
          <a href="#annonces" className="hover:text-blue-600">Annonces</a>
          <a href="#faq" className="hover:text-blue-600">FAQ</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>

        {/* Burger icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-3 space-y-3 text-sm">
          <a href="#proprietaire" className="block hover:text-blue-600">Propriétaire</a>
          <a href="#locataire" className="block hover:text-blue-600">Locataire</a>
          <a href="#annonces" className="block hover:text-blue-600">Annonces</a>
          <a href="#faq" className="block hover:text-blue-600">FAQ</a>
          <a href="#contact" className="block hover:text-blue-600">Contact</a>
        </nav>
      )}
    </header>
  );
}
