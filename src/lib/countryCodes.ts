export interface Country {
  code: string;       // ISO 2-letter code (e.g. "IN", "US")
  name: string;       // Country display name
  dialCode: string;   // e.g. "+91"
  flag: string;       // Flag emoji
  minLen: number;     // Minimum national number digits
  maxLen: number;     // Maximum national number digits
  placeholder: string;
  formatExample: string;
  pattern?: RegExp;   // Specific national number validation regex
  description?: string;
}

export const COUNTRIES: Country[] = [
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳",
    minLen: 10,
    maxLen: 10,
    placeholder: "98765 43210",
    formatExample: "98765 43210",
    pattern: /^[6-9]\d{9}$/,
    description: "10 digits starting with 6, 7, 8, or 9",
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    minLen: 10,
    maxLen: 10,
    placeholder: "202 555 0123",
    formatExample: "202 555 0123",
    pattern: /^[2-9]\d{2}[2-9]\d{6}$/,
    description: "10-digit US number (valid area code starting 2-9)",
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦",
    minLen: 10,
    maxLen: 10,
    placeholder: "416 555 0123",
    formatExample: "416 555 0123",
    pattern: /^[2-9]\d{2}[2-9]\d{6}$/,
    description: "10-digit Canadian number",
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
    minLen: 10,
    maxLen: 10,
    placeholder: "7911 123456",
    formatExample: "7911 123456",
    pattern: /^7[1-9]\d{8}$/,
    description: "10-digit UK mobile starting with 7",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    flag: "🇦🇪",
    minLen: 9,
    maxLen: 9,
    placeholder: "50 123 4567",
    formatExample: "50 123 4567",
    pattern: /^5[024568]\d{7}$/,
    description: "9 digits starting with 5 (e.g. 50, 52, 54, 55, 56, 58)",
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    flag: "🇸🇬",
    minLen: 8,
    maxLen: 8,
    placeholder: "8123 4567",
    formatExample: "8123 4567",
    pattern: /^[89]\d{7}$/,
    description: "8 digits starting with 8 or 9",
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    flag: "🇦🇺",
    minLen: 9,
    maxLen: 9,
    placeholder: "412 345 678",
    formatExample: "412 345 678",
    pattern: /^4\d{8}$/,
    description: "9 digits starting with 4",
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    flag: "🇳🇿",
    minLen: 8,
    maxLen: 10,
    placeholder: "21 123 4567",
    formatExample: "21 123 4567",
    pattern: /^2\d{7,9}$/,
    description: "8 to 10 digits starting with 2",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦",
    minLen: 9,
    maxLen: 9,
    placeholder: "50 123 4567",
    formatExample: "50 123 4567",
    pattern: /^5\d{8}$/,
    description: "9 digits starting with 5",
  },
  {
    code: "QA",
    name: "Qatar",
    dialCode: "+974",
    flag: "🇶🇦",
    minLen: 8,
    maxLen: 8,
    placeholder: "3312 3456",
    formatExample: "3312 3456",
    pattern: /^[3567]\d{7}$/,
    description: "8 digits starting with 3, 5, 6, or 7",
  },
  {
    code: "KW",
    name: "Kuwait",
    dialCode: "+965",
    flag: "🇰🇼",
    minLen: 8,
    maxLen: 8,
    placeholder: "9123 4567",
    formatExample: "9123 4567",
    pattern: /^[569]\d{7}$/,
    description: "8 digits starting with 5, 6, or 9",
  },
  {
    code: "OM",
    name: "Oman",
    dialCode: "+968",
    flag: "🇴🇲",
    minLen: 8,
    maxLen: 8,
    placeholder: "9123 4567",
    formatExample: "9123 4567",
    pattern: /^[79]\d{7}$/,
    description: "8 digits starting with 7 or 9",
  },
  {
    code: "BH",
    name: "Bahrain",
    dialCode: "+973",
    flag: "🇧🇭",
    minLen: 8,
    maxLen: 8,
    placeholder: "3612 3456",
    formatExample: "3612 3456",
    pattern: /^[36]\d{7}$/,
    description: "8 digits starting with 3 or 6",
  },
  {
    code: "NP",
    name: "Nepal",
    dialCode: "+977",
    flag: "🇳🇵",
    minLen: 10,
    maxLen: 10,
    placeholder: "9841 234567",
    formatExample: "9841 234567",
    pattern: /^9[78]\d{8}$/,
    description: "10 digits starting with 98 or 97",
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "+60",
    flag: "🇲🇾",
    minLen: 9,
    maxLen: 10,
    placeholder: "12 345 6789",
    formatExample: "12 345 6789",
    pattern: /^1[0-9]\d{7,8}$/,
    description: "9 or 10 digits starting with 1",
  },
  {
    code: "MU",
    name: "Mauritius",
    dialCode: "+230",
    flag: "🇲🇺",
    minLen: 8,
    maxLen: 8,
    placeholder: "5251 2345",
    formatExample: "5251 2345",
    pattern: /^5\d{7}$/,
    description: "8 digits starting with 5",
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "+27",
    flag: "🇿🇦",
    minLen: 9,
    maxLen: 9,
    placeholder: "71 123 4567",
    formatExample: "71 123 4567",
    pattern: /^[678]\d{8}$/,
    description: "9 digits starting with 6, 7, or 8",
  },
  {
    code: "LK",
    name: "Sri Lanka",
    dialCode: "+94",
    flag: "🇱🇰",
    minLen: 9,
    maxLen: 9,
    placeholder: "71 234 5678",
    formatExample: "71 234 5678",
    pattern: /^7\d{8}$/,
    description: "9 digits starting with 7",
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪",
    minLen: 10,
    maxLen: 11,
    placeholder: "151 23456789",
    formatExample: "151 23456789",
    pattern: /^1[567]\d{8,9}$/,
    description: "10-11 digits starting with 15, 16, or 17",
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷",
    minLen: 9,
    maxLen: 9,
    placeholder: "6 12 34 56 78",
    formatExample: "6 12 34 56 78",
    pattern: /^[67]\d{8}$/,
    description: "9 digits starting with 6 or 7",
  },
  {
    code: "NL",
    name: "Netherlands",
    dialCode: "+31",
    flag: "🇳🇱",
    minLen: 9,
    maxLen: 9,
    placeholder: "6 12345678",
    formatExample: "6 12345678",
    pattern: /^6\d{8}$/,
    description: "9 digits starting with 6",
  },
  {
    code: "CH",
    name: "Switzerland",
    dialCode: "+41",
    flag: "🇨🇭",
    minLen: 9,
    maxLen: 9,
    placeholder: "78 123 45 67",
    formatExample: "78 123 45 67",
    pattern: /^7[5-9]\d{7}$/,
    description: "9 digits starting with 75-79",
  },
  {
    code: "IE",
    name: "Ireland",
    dialCode: "+353",
    flag: "🇮🇪",
    minLen: 9,
    maxLen: 9,
    placeholder: "85 123 4567",
    formatExample: "85 123 4567",
    pattern: /^8[3-9]\d{7}$/,
    description: "9 digits starting with 83-89",
  },
  {
    code: "IT",
    name: "Italy",
    dialCode: "+39",
    flag: "🇮🇹",
    minLen: 10,
    maxLen: 10,
    placeholder: "320 123 4567",
    formatExample: "320 123 4567",
    pattern: /^3\d{9}$/,
    description: "10 digits starting with 3",
  },
  {
    code: "ES",
    name: "Spain",
    dialCode: "+34",
    flag: "🇪🇸",
    minLen: 9,
    maxLen: 9,
    placeholder: "612 34 56 78",
    formatExample: "612 34 56 78",
    pattern: /^[67]\d{8}$/,
    description: "9 digits starting with 6 or 7",
  },
  {
    code: "SE",
    name: "Sweden",
    dialCode: "+46",
    flag: "🇸🇪",
    minLen: 9,
    maxLen: 9,
    placeholder: "70 123 45 67",
    formatExample: "70 123 45 67",
    pattern: /^7[02369]\d{7}$/,
    description: "9 digits starting with 70, 72, 73, 76, 79",
  },
  {
    code: "NO",
    name: "Norway",
    dialCode: "+47",
    flag: "🇳🇴",
    minLen: 8,
    maxLen: 8,
    placeholder: "412 34 567",
    formatExample: "412 34 567",
    pattern: /^[49]\d{7}$/,
    description: "8 digits starting with 4 or 9",
  },
  {
    code: "DK",
    name: "Denmark",
    dialCode: "+45",
    flag: "🇩🇰",
    minLen: 8,
    maxLen: 8,
    placeholder: "20 12 34 56",
    formatExample: "20 12 34 56",
    pattern: /^[2-9]\d{7}$/,
    description: "8 digits starting with 2-9",
  },
  {
    code: "BE",
    name: "Belgium",
    dialCode: "+32",
    flag: "🇧🇪",
    minLen: 9,
    maxLen: 9,
    placeholder: "470 12 34 56",
    formatExample: "470 12 34 56",
    pattern: /^4[5-9]\d{7}$/,
    description: "9 digits starting with 45-49",
  },
  {
    code: "AT",
    name: "Austria",
    dialCode: "+43",
    flag: "🇦🇹",
    minLen: 10,
    maxLen: 11,
    placeholder: "664 1234567",
    formatExample: "664 1234567",
    pattern: /^6[5-9]\d{8,9}$/,
    description: "10-11 digits starting with 6",
  },
  {
    code: "PL",
    name: "Poland",
    dialCode: "+48",
    flag: "🇵🇱",
    minLen: 9,
    maxLen: 9,
    placeholder: "512 345 678",
    formatExample: "512 345 678",
    pattern: /^[4-8]\d{8}$/,
    description: "9 digits starting with 4-8",
  },
  {
    code: "PT",
    name: "Portugal",
    dialCode: "+351",
    flag: "🇵🇹",
    minLen: 9,
    maxLen: 9,
    placeholder: "912 345 678",
    formatExample: "912 345 678",
    pattern: /^9[1236]\d{7}$/,
    description: "9 digits starting with 91, 92, 93, 96",
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "+81",
    flag: "🇯🇵",
    minLen: 10,
    maxLen: 10,
    placeholder: "90 1234 5678",
    formatExample: "90 1234 5678",
    pattern: /^[789]0\d{8}$/,
    description: "10 digits starting with 70, 80, 90",
  },
  {
    code: "ID",
    name: "Indonesia",
    dialCode: "+62",
    flag: "🇮🇩",
    minLen: 10,
    maxLen: 12,
    placeholder: "812 3456 7890",
    formatExample: "812 3456 7890",
    pattern: /^8[1-9]\d{8,10}$/,
    description: "10 to 12 digits starting with 8",
  },
  {
    code: "TH",
    name: "Thailand",
    dialCode: "+66",
    flag: "🇹🇭",
    minLen: 9,
    maxLen: 9,
    placeholder: "81 234 5678",
    formatExample: "81 234 5678",
    pattern: /^[689]\d{8}$/,
    description: "9 digits starting with 6, 8, or 9",
  },
  {
    code: "PH",
    name: "Philippines",
    dialCode: "+63",
    flag: "🇵🇭",
    minLen: 10,
    maxLen: 10,
    placeholder: "917 123 4567",
    formatExample: "917 123 4567",
    pattern: /^9\d{9}$/,
    description: "10 digits starting with 9",
  },
  {
    code: "BD",
    name: "Bangladesh",
    dialCode: "+880",
    flag: "🇧🇩",
    minLen: 10,
    maxLen: 10,
    placeholder: "1712 345678",
    formatExample: "1712 345678",
    pattern: /^1[3-9]\d{8}$/,
    description: "10 digits starting with 13-19",
  },
  {
    code: "KE",
    name: "Kenya",
    dialCode: "+254",
    flag: "🇰🇪",
    minLen: 9,
    maxLen: 9,
    placeholder: "712 345678",
    formatExample: "712 345678",
    pattern: /^[17]\d{8}$/,
    description: "9 digits starting with 1 or 7",
  },
  {
    code: "HK",
    name: "Hong Kong",
    dialCode: "+852",
    flag: "🇭🇰",
    minLen: 8,
    maxLen: 8,
    placeholder: "9123 4567",
    formatExample: "9123 4567",
    pattern: /^[569]\d{7}$/,
    description: "8 digits starting with 5, 6, or 9",
  },
  {
    code: "TR",
    name: "Turkey",
    dialCode: "+90",
    flag: "🇹🇷",
    minLen: 10,
    maxLen: 10,
    placeholder: "532 123 4567",
    formatExample: "532 123 4567",
    pattern: /^5\d{9}$/,
    description: "10 digits starting with 5",
  },
  {
    code: "IL",
    name: "Israel",
    dialCode: "+972",
    flag: "🇮🇱",
    minLen: 9,
    maxLen: 9,
    placeholder: "50 123 4567",
    formatExample: "50 123 4567",
    pattern: /^5\d{8}$/,
    description: "9 digits starting with 5",
  },
  {
    code: "EG",
    name: "Egypt",
    dialCode: "+20",
    flag: "🇪🇬",
    minLen: 10,
    maxLen: 10,
    placeholder: "10 1234 5678",
    formatExample: "10 1234 5678",
    pattern: /^1[0125]\d{8}$/,
    description: "10 digits starting with 10, 11, 12, or 15",
  },
  {
    code: "NG",
    name: "Nigeria",
    dialCode: "+234",
    flag: "🇳🇬",
    minLen: 10,
    maxLen: 10,
    placeholder: "802 123 4567",
    formatExample: "802 123 4567",
    pattern: /^[789][01]\d{8}$/,
    description: "10 digits starting with 70, 80, 81, 90, 91",
  },
  {
    code: "BR",
    name: "Brazil",
    dialCode: "+55",
    flag: "🇧🇷",
    minLen: 11,
    maxLen: 11,
    placeholder: "11 91234 5678",
    formatExample: "11 91234 5678",
    pattern: /^[1-9]{2}9\d{8}$/,
    description: "11 digits with 2-digit DDD + 9",
  },
  {
    code: "MX",
    name: "Mexico",
    dialCode: "+52",
    flag: "🇲🇽",
    minLen: 10,
    maxLen: 10,
    placeholder: "55 1234 5678",
    formatExample: "55 1234 5678",
    pattern: /^[1-9]\d{9}$/,
    description: "10 digits",
  },
  {
    code: "RU",
    name: "Russia",
    dialCode: "+7",
    flag: "🇷🇺",
    minLen: 10,
    maxLen: 10,
    placeholder: "912 345 67 89",
    formatExample: "912 345 67 89",
    pattern: /^9\d{9}$/,
    description: "10 digits starting with 9",
  },
];

export const DEFAULT_COUNTRY: Country = COUNTRIES[0]; // India (+91)

export function findCountryByDialCode(dialCode: string): Country | undefined {
  const normalized = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
  return COUNTRIES.find((c) => c.dialCode === normalized);
}

export function findCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

/**
 * Checks if a string of digits is characteristic of an Indian mobile number
 * (exactly 10 digits starting with 6, 7, 8, or 9).
 */
export function isLikelyIndianMobileNumber(digits: string, currentCountryCode?: string): boolean {
  const clean = digits.replace(/\D/g, "");
  if (clean.length !== 10) return false;

  // In UK (+44), mobiles start with 7. If it starts with 6, 8, or 9, it's definitely Indian!
  if (currentCountryCode === "GB") {
    return /^[689]\d{9}$/.test(clean);
  }

  // General check for 10-digit Indian mobile prefixes (6, 7, 8, 9)
  return /^[6-9]\d{9}$/.test(clean);
}

/**
 * Parses user input (which may be a raw national number or pasted with full country code).
 * Returns the detected country (if found), cleaned national digits, and complete E.164 phone.
 */
export function parsePhoneInput(
  rawInput: string,
  currentCountry: Country = DEFAULT_COUNTRY
): {
  detectedCountry: Country;
  nationalNumber: string;
  fullE164: string;
} {
  const trimmed = rawInput.trim();

  // Case 1: User pasted full number with leading '+' or '00'
  if (trimmed.startsWith("+") || trimmed.startsWith("00")) {
    const digits = trimmed.replace(/^00/, "").replace(/\D/g, "");

    // Check longest matching dial codes first (e.g. +971 before +9)
    const sortedCountries = [...COUNTRIES].sort(
      (a, b) => b.dialCode.length - a.dialCode.length
    );

    for (const c of sortedCountries) {
      const codeDigits = c.dialCode.replace("+", "");
      if (digits.startsWith(codeDigits)) {
        const national = digits.slice(codeDigits.length);
        return {
          detectedCountry: c,
          nationalNumber: national,
          fullE164: `${c.dialCode}${national}`,
        };
      }
    }
  }

  // Case 2: National number typed with leading '0' (e.g. "09876543210")
  let cleanDigits = trimmed.replace(/\D/g, "");
  if (cleanDigits.startsWith("0") && cleanDigits.length > 9) {
    cleanDigits = cleanDigits.slice(1);
  }

  return {
    detectedCountry: currentCountry,
    nationalNumber: cleanDigits,
    fullE164: `${currentCountry.dialCode}${cleanDigits}`,
  };
}

export interface PhoneValidationResult {
  isValid: boolean;
  error: string | null;
  isLikelyIndian: boolean;
}

/**
 * Thoroughly validates a national number against the selected country's rules.
 * Detects if the user typed an Indian number under a different country code.
 */
export function validatePhoneNumber(
  nationalNumber: string,
  country: Country = DEFAULT_COUNTRY
): PhoneValidationResult {
  const cleanDigits = nationalNumber.replace(/\D/g, "");

  if (!cleanDigits) {
    return {
      isValid: false,
      error: "Please enter your mobile number.",
      isLikelyIndian: false,
    };
  }

  // If selected country is NOT India, check if user typed an Indian mobile number
  if (country.code !== "IN") {
    // For US/CA (+1):
    // If the number starts with 9 or 8 or 7 or 6 and matches Indian mobile format,
    // AND is not a valid US number or the user typed typical Indian 10 digits
    const looksLikeIndian = isLikelyIndianMobileNumber(cleanDigits, country.code);
    if (looksLikeIndian) {
      // If the country pattern does not match OR if it's US/UK/UAE/etc.
      if (!country.pattern || !country.pattern.test(cleanDigits) || country.code === "US" || country.code === "CA") {
        return {
          isValid: false,
          error: `This looks like a 10-digit Indian mobile number. Please select India (+91) or enter a valid ${country.name} number.`,
          isLikelyIndian: true,
        };
      }
    }
  }

  // 1. Length bounds check for selected country
  if (cleanDigits.length < country.minLen) {
    return {
      isValid: false,
      error: `${country.name} numbers require at least ${country.minLen} digits (currently ${cleanDigits.length}).`,
      isLikelyIndian: false,
    };
  }

  if (cleanDigits.length > country.maxLen) {
    return {
      isValid: false,
      error: `${country.name} numbers cannot exceed ${country.maxLen} digits (currently ${cleanDigits.length}).`,
      isLikelyIndian: false,
    };
  }

  // 2. Specific country regex check if available
  if (country.pattern) {
    const matchesPattern = country.pattern.test(cleanDigits);
    if (!matchesPattern) {
      const isIndian = country.code !== "IN" && isLikelyIndianMobileNumber(cleanDigits, country.code);
      if (isIndian) {
        return {
          isValid: false,
          error: `This looks like a 10-digit Indian mobile number. Please select India (+91) or enter a valid ${country.name} number.`,
          isLikelyIndian: true,
        };
      }

      const desc = country.description || `Valid format: e.g. ${country.formatExample}`;
      return {
        isValid: false,
        error: `Invalid number for ${country.name}. ${desc}.`,
        isLikelyIndian: false,
      };
    }
  }

  return {
    isValid: true,
    error: null,
    isLikelyIndian: false,
  };
}

/**
 * Simple boolean validity check helper.
 */
export function isPhoneValid(nationalNumber: string, country: Country = DEFAULT_COUNTRY): boolean {
  return validatePhoneNumber(nationalNumber, country).isValid;
}

/**
 * Formats digits country-wise for clean display in inputs and screens.
 * e.g.,
 * India: 98765 43210
 * US/CA: (202) 555-0123
 * UK: 7911 123456
 * UAE: 50 123 4567
 */
export function formatPhoneNumber(rawDigits: string, country: Country = DEFAULT_COUNTRY): string {
  const digits = rawDigits.replace(/\D/g, "").slice(0, country.maxLen);

  if (!digits) return "";

  // India: 5 - 5 grouping (e.g. 98765 43210)
  if (country.code === "IN") {
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }

  // US & Canada: 3 - 3 - 4 grouping (e.g. 202 555 0123)
  if (country.code === "US" || country.code === "CA") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
  }

  // UK: 4 - 6 grouping (e.g. 7911 123456)
  if (country.code === "GB") {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
  }

  // UAE, Saudi Arabia: 2 - 3 - 4 grouping (e.g. 50 123 4567)
  if (country.code === "AE" || country.code === "SA") {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)}`;
  }

  // Australia: 3 - 3 - 3 grouping (e.g. 412 345 678)
  if (country.code === "AU") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }

  // Singapore, Qatar, Kuwait, Oman, Bahrain: 4 - 4 grouping (e.g. 8123 4567)
  if (["SG", "QA", "KW", "OM", "BH", "HK", "NO", "DK"].includes(country.code)) {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
  }

  // Nepal: 4 - 6 grouping (e.g. 9841 234567)
  if (country.code === "NP") {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
  }

  // France: 1 - 2 - 2 - 2 - 2 (e.g. 6 12 34 56 78)
  if (country.code === "FR") {
    if (digits.length <= 1) return digits;
    const parts = [digits.slice(0, 1)];
    for (let i = 1; i < digits.length; i += 2) {
      parts.push(digits.slice(i, i + 2));
    }
    return parts.join(" ");
  }

  // Germany: 3 - remaining
  if (country.code === "DE") {
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

  // Generic fallback: groups of 3 or 4
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
}
