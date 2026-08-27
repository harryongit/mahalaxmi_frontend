import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getISTDate(dateString: string | Date | number): Date {
  const d = new Date(dateString);
  // Avoid modifying if it's already a clean string without time info
  if (typeof dateString === 'string' && dateString.length <= 10 && !dateString.includes('T')) {
    return d; // It's just a date like 2024-08-27
  }
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * 5.5));
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "";
  const d = getISTDate(dateString);
  if (isNaN(d.getTime())) return "";
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatTime(dateString: string | Date | null | undefined): string {
  if (!dateString) return "";
  const d = getISTDate(dateString);
  if (isNaN(d.getTime())) return "";
  
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  return `${hours}:${minutes} ${ampm}`;
}

export function formatDateTime(dateString: string | Date | null | undefined): string {
  if (!dateString) return "";
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
}
