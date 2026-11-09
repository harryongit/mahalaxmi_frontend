export interface CountryItem {
  code: string;       // e.g. "+91"
  name: string;       // e.g. "India"
  flag: string;       // e.g. "🇮🇳"
  iso: string;        // e.g. "IN"
}

export const COUNTRIES: CountryItem[] = [
  { code: "+91", name: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+1", name: "United States / Canada", flag: "🇺🇸", iso: "US" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "+61", name: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+65", name: "Singapore", flag: "🇸🇬", iso: "SG" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "+977", name: "Nepal", flag: "🇳🇵", iso: "NP" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰", iso: "LK" },
  { code: "+968", name: "Oman", flag: "🇴🇲", iso: "OM" },
  { code: "+974", name: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼", iso: "KW" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭", iso: "BH" },
  { code: "+49", name: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+33", name: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+27", name: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺", iso: "MU" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩", iso: "ID" },
  { code: "+66", name: "Thailand", flag: "🇹🇭", iso: "TH" },
  { code: "+81", name: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", iso: "BD" },
  { code: "+975", name: "Bhutan", flag: "🇧🇹", iso: "BT" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+39", name: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+34", name: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+46", name: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+47", name: "Norway", flag: "🇳🇴", iso: "NO" },
  { code: "+45", name: "Denmark", flag: "🇩🇰", iso: "DK" },
  { code: "+353", name: "Ireland", flag: "🇮🇪", iso: "IE" },
  { code: "+48", name: "Poland", flag: "🇵🇱", iso: "PL" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", iso: "BR" },
  { code: "+254", name: "Kenya", flag: "🇰🇪", iso: "KE" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿", iso: "TZ" },
  { code: "+256", name: "Uganda", flag: "🇺🇬", iso: "UG" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "+592", name: "Guyana", flag: "🇬🇾", iso: "GY" },
  { code: "+597", name: "Suriname", flag: "🇸🇷", iso: "SR" },
  { code: "+1868", name: "Trinidad & Tobago", flag: "🇹🇹", iso: "TT" },
  { code: "+679", name: "Fiji", flag: "🇫🇯", iso: "FJ" },
];

export const DEFAULT_COUNTRY: CountryItem = COUNTRIES[0]; // India (+91)

/**
 * Normalizes full international phone number with country code.
 * Ensures the result starts with '+' followed by country dial digits and national digits.
 */
export function formatFullPhoneNumber(countryCode: string, nationalNumber: string): string {
  const cleanDial = countryCode.replace(/[^\d+]/g, "");
  const cleanDigits = nationalNumber.replace(/\D/g, "");
  const dial = cleanDial.startsWith("+") ? cleanDial : `+${cleanDial}`;
  return `${dial}${cleanDigits}`;
}
