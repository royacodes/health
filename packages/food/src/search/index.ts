import type { Locale } from "../localization";

export interface SearchFilters {
  query?: string;
  locale?: Locale;
  categoryId?: string;
  tagIds?: string[];
  minCalories?: number;
  maxCalories?: number;
  minProtein?: number;
  maxProtein?: number;
  barcode?: string;
  status?: string;
  visibility?: string;
}

export interface SearchOptions {
  page?: number;
  limit?: number;
  sortBy?: "name" | "calories" | "protein" | "createdAt" | "popularity";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function buildSearchQuery(filters: SearchFilters): string {
  const parts: string[] = [];

  if (filters.query) {
    parts.push(filters.query.trim());
  }

  if (filters.barcode) {
    parts.push(filters.barcode);
  }

  return parts.join(" ");
}

export function tokenizeSearch(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

export function fuzzyMatch(text: string, query: string): boolean {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  if (textLower.includes(queryLower)) return true;

  let queryIdx = 0;
  for (let i = 0; i < textLower.length && queryIdx < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIdx]) {
      queryIdx++;
    }
  }

  return queryIdx === queryLower.length;
}

export function calculateRelevance(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  if (textLower === queryLower) return 100;
  if (textLower.startsWith(queryLower)) return 90;
  if (textLower.includes(queryLower)) return 70;

  const tokens = queryLower.split(/\s+/);
  let matchCount = 0;
  for (const token of tokens) {
    if (textLower.includes(token)) matchCount++;
  }
  if (matchCount > 0) return Math.round((matchCount / tokens.length) * 60);

  if (fuzzyMatch(textLower, queryLower)) return 30;

  return 0;
}
