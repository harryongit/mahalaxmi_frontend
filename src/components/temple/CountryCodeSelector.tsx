"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { COUNTRIES, Country } from "@/src/lib/countryCodes";

interface CountryCodeSelectorProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  disabled?: boolean;
}

export function CountryCodeSelector({
  selectedCountry,
  onSelectCountry,
  disabled = false,
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filtered = COUNTRIES.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="country-code-trigger-btn"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            setSearch("");
          }
        }}
        className="flex items-center gap-1.5 px-3 py-2.5 h-[42px] bg-stone-100 hover:bg-stone-200/80 active:bg-stone-200 text-stone-900 border border-stone-300 rounded-l-xl font-bold text-xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="font-mono text-xs">{selectedCountry.dialCode}</span>
        <ChevronDown
          size={14}
          className={`text-stone-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="country-code-dropdown-menu"
          className="absolute left-0 top-full mt-1.5 w-72 sm:w-80 bg-white border border-amber-300/80 rounded-2xl shadow-2xl z-50 overflow-hidden font-sans"
          style={{
            boxShadow: "0 12px 30px -4px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Search Box */}
          <div className="p-2.5 border-b border-stone-200 bg-stone-50">
            <div className="relative flex items-center">
              <Search size={14} className="absolute left-3 text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 p-1">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-xs text-stone-500">
                No matching country found
              </div>
            ) : (
              filtered.map((country) => {
                const isSelected = country.code === selectedCountry.code;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onSelectCountry(country);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors cursor-pointer text-xs ${
                      isSelected
                        ? "bg-amber-100/70 text-[#3C0F1A] font-bold"
                        : "hover:bg-stone-100 text-stone-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2 shrink-0">
                      <span className="font-mono text-stone-500 text-[11px] font-semibold">
                        {country.dialCode}
                      </span>
                      {isSelected && <Check size={13} className="text-amber-800" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
