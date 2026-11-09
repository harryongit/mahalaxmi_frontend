"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Search, Check, X, AlertCircle, Sparkles } from "lucide-react";
import {
  COUNTRIES,
  Country,
  DEFAULT_COUNTRY,
  parsePhoneInput,
  formatPhoneNumber,
  validatePhoneNumber,
} from "@/src/lib/countryCodes";

interface PhoneInputWithCountryProps {
  country: Country;
  onCountryChange: (country: Country) => void;
  phoneNumber: string;
  onPhoneNumberChange: (val: string) => void;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  id?: string;
  label?: string;
  showCountryLabel?: boolean;
  error?: string | null;
}

export function PhoneInputWithCountry({
  country,
  onCountryChange,
  phoneNumber,
  onPhoneNumberChange,
  disabled = false,
  required = true,
  autoFocus = false,
  id = "phone-input",
  label = "WhatsApp / Mobile Number",
  showCountryLabel = true,
  error = null,
}: PhoneInputWithCountryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        phoneInputRef.current?.focus();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Handle typing or pasting with country-wise formatting
  const handleInputChange = (rawVal: string) => {
    const parsed = parsePhoneInput(rawVal, country);
    let targetCountry = country;

    // Auto-detect if pasted with international code
    if (parsed.detectedCountry.code !== country.code) {
      targetCountry = parsed.detectedCountry;
      onCountryChange(targetCountry);
    }

    // Format display number according to country rules
    const formatted = formatPhoneNumber(parsed.nationalNumber, targetCountry);
    onPhoneNumberChange(formatted);
  };

  const handleCountrySelect = (selected: Country) => {
    onCountryChange(selected);
    setIsOpen(false);
    // Re-format existing digits for the newly selected country
    const cleanDigits = phoneNumber.replace(/\D/g, "");
    if (cleanDigits) {
      const reformatted = formatPhoneNumber(cleanDigits, selected);
      onPhoneNumberChange(reformatted);
    }
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 60);
  };

  const handleSwitchToIndia = () => {
    onCountryChange(DEFAULT_COUNTRY);
    const cleanDigits = phoneNumber.replace(/\D/g, "");
    const reformatted = formatPhoneNumber(cleanDigits, DEFAULT_COUNTRY);
    onPhoneNumberChange(reformatted);
    phoneInputRef.current?.focus();
  };

  // Real-time country-specific validation
  const validation = useMemo(() => {
    return validatePhoneNumber(phoneNumber, country);
  }, [phoneNumber, country]);

  const cleanDigits = phoneNumber.replace(/\D/g, "");
  const hasTypedEnough = cleanDigits.length >= country.minLen;

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div ref={dropdownRef} className="relative w-full text-stone-800 font-sans">
      {/* Top Labels Row */}
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <label htmlFor={id} className="text-xs font-bold text-stone-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {showCountryLabel && (
          <span className="text-xs text-stone-500 font-medium tracking-tight">
            {country.name} ({country.formatExample})
          </span>
        )}
      </div>

      {/* Unified Input Container - Compact, clean, subtle focus border */}
      <div
        className={`relative flex items-center w-full bg-white border rounded-xl transition-colors duration-150 shadow-2xs ${
          error || (cleanDigits.length > 0 && !validation.isValid && hasTypedEnough)
            ? "border-red-400 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-200"
            : isOpen
            ? "border-amber-500 ring-1 ring-amber-400/30"
            : "border-stone-300 hover:border-stone-400 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-500/25"
        } ${disabled ? "opacity-60 bg-stone-100 cursor-not-allowed" : ""}`}
      >
        {/* Country Selector Trigger Button - Compact & Sleek */}
        <button
          type="button"
          id={`${id}-country-btn`}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-label={`Select country code, currently ${country.name} ${country.dialCode}`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-50 hover:bg-amber-50/70 rounded-lg transition-colors cursor-pointer shrink-0 group ml-0.5"
        >
          {/* Flag Image with fallback */}
          <span className="w-4.5 h-3 relative shrink-0 overflow-hidden rounded-2xs border border-stone-200/90 bg-stone-100 flex items-center justify-center">
            <img
              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
              alt={country.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "inline";
              }}
            />
            <span className="hidden text-[8px] font-bold text-stone-700 leading-none">
              {country.code}
            </span>
          </span>

          {/* Dial Code */}
          <span className="font-mono text-xs font-semibold text-stone-900 tracking-tight">
            {country.dialCode}
          </span>

          {/* Chevron */}
          {isOpen ? (
            <ChevronUp size={12} className="text-amber-800" />
          ) : (
            <ChevronDown size={12} className="text-stone-400 group-hover:text-amber-700 transition-colors" />
          )}
        </button>

        {/* Subtle Divider */}
        <div className="h-4.5 w-px bg-stone-200 mx-1 shrink-0" />

        {/* Phone Input with country-wise format - Normal compact height */}
        <input
          ref={phoneInputRef}
          id={id}
          type="tel"
          inputMode="numeric"
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          placeholder={country.placeholder || "Enter mobile number"}
          value={phoneNumber}
          onChange={(e) => handleInputChange(e.target.value)}
          className="flex-1 h-[38px] px-2 bg-transparent border-0 outline-none text-sm font-medium text-stone-900 placeholder:font-normal placeholder:text-stone-400"
        />

        {/* Real-time validity indicator */}
        {validation.isValid && (
          <span className="mr-1 text-emerald-600" title="Valid phone format">
            <Check size={14} className="stroke-[2.5]" />
          </span>
        )}

        {/* Clear input button */}
        {phoneNumber && !disabled && (
          <button
            type="button"
            onClick={() => {
              onPhoneNumberChange("");
              phoneInputRef.current?.focus();
            }}
            className="mr-2 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Clear phone number"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* SMART INDIAN NUMBER PROMPT (If non-Indian code is chosen but Indian number is typed) */}
      {validation.isLikelyIndian && (
        <div className="mt-1.5 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900 shadow-2xs">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-sm">🇮🇳</span>
            <span className="truncate">
              Indian number detected: <strong>+91 {phoneNumber}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleSwitchToIndia}
            className="px-2 py-0.5 bg-[#3C0F1A] hover:bg-[#2B0A12] text-amber-100 font-bold text-[11px] rounded-md transition-colors shrink-0 cursor-pointer ml-2"
          >
            Switch to +91
          </button>
        </div>
      )}

      {/* INLINE VALIDATION WARNING (If invalid format for the selected country) */}
      {!validation.isValid && cleanDigits.length > 0 && !validation.isLikelyIndian && hasTypedEnough && (
        <p className="mt-1 text-[11px] text-red-600 font-medium flex items-center gap-1 px-0.5">
          <AlertCircle size={12} className="shrink-0" />
          <span>{validation.error}</span>
        </p>
      )}

      {/* FLOATING DROPDOWN MENU (Spans full input width, unclipped, z-[150]) */}
      {isOpen && (
        <div
          id={`${id}-country-dropdown`}
          className="absolute top-full left-0 right-0 mt-1.5 z-[150] bg-white rounded-xl border border-amber-300 shadow-xl p-2 font-sans animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Search Bar */}
          <div className="relative flex items-center mb-1.5">
            <Search className="absolute left-2.5 size-3.5 text-stone-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code (e.g. India, +91, US)..."
              className="w-full pl-8 pr-7 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-400/30 outline-none transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 text-stone-400 hover:text-stone-600 p-0.5 rounded cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Scrollable Countries List */}
          <div className="max-h-56 overflow-y-auto divide-y divide-stone-100 pr-0.5 scrollbar-thin">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-stone-500 space-y-1">
                <p className="font-bold text-stone-700">No country found</p>
                <p className="text-[11px] text-stone-400">Try searching by country name or dial code</p>
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.code === country.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountrySelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-xl transition-all cursor-pointer text-xs ${
                      isSelected
                        ? "bg-amber-100/80 text-[#3C0F1A] font-bold border border-amber-300/70 shadow-2xs"
                        : "hover:bg-amber-50/70 text-stone-800"
                    }`}
                  >
                    {/* Flag & Name */}
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-5 h-3.5 relative shrink-0 overflow-hidden rounded-xs border border-stone-200/90 bg-stone-100 flex items-center justify-center shadow-2xs">
                        <img
                          src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "inline";
                          }}
                        />
                        <span className="hidden text-[8px] font-bold text-stone-700 leading-none">
                          {c.code}
                        </span>
                      </span>
                      <span className="truncate">{c.name}</span>
                    </div>

                    {/* Dial Code & Check */}
                    <div className="flex items-center gap-1.5 ml-2 shrink-0">
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-amber-200/80 text-amber-950"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {c.dialCode}
                      </span>
                      {isSelected && (
                        <Check size={14} className="text-[#3C0F1A] stroke-[2.5]" />
                      )}
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
