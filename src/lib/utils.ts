import { CustomerStatus, OrderStatus } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: Date) {
  const timestampMs = new Date(date).getTime();
  const timestampSeconds = timestampMs / 1000;

  const dateObject = new Date(timestampSeconds * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("fr-FR", options);
  const formattedDate = formatter.format(dateObject);
  return formattedDate;
}

export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function hexToRgba(hex: string, alpha: number): string {
  // Remove the hash (if present)
  hex = hex.replace(/^#/, "");

  // Parse the hex value into separate red, green, and blue values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Validate the alpha value (should be between 0 and 1)
  if (alpha < 0) alpha = 0;
  if (alpha > 1) alpha = 1;

  // Return the RGBA value as a string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export function getColorByStatus(status: string) {
  const foundStatus = OrderStatus.find(
    (item) => item.value === status.toLowerCase()
  );
  return foundStatus ? foundStatus.color : ""; // Return the color or an empty string if not found
}
export function getCustomerColorByStatus(status: string) {
  const foundStatus = CustomerStatus.find(
    (item) => item.value === status.toLowerCase()
  );
  return foundStatus ? foundStatus.color : ""; // Return the color or an empty string if not found
}
