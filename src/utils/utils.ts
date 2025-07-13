import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";
import { UrlString } from "../util.types";

export const getUrlParams = (url: UrlString | null): Record<string, any> => {
  if (!url) return {};

  const urlObj = new URL(url);
  const params: Record<string, any> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fixHtmlFormOptionalFields = <T extends z.ZodObject<any, any>>(
  schema: T,
): T => {
  const entries = Object.entries(schema.shape);

  const transformedEntries = entries.map(([key, value]) => {
    // Only transform optional schemas
    if (value instanceof z.ZodOptional) {
      return [key, z.union([value, z.literal("")])];
    }

    return [key, value];
  });

  return z.object(Object.fromEntries(transformedEntries)) as T;
};

export const removeNullOrBlankFields = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.entries(obj).reduce((acc: Partial<T>, [key, value]) => {
    if (value != null && value !== "" && value !== 0) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};
