export interface CategoryTranslation {
  locale: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  slug: string;
  parentId?: string;
  translations: CategoryTranslation[];
  icon?: string;
  color?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInput {
  slug: string;
  parentId?: string;
  translations: CategoryTranslation[];
  icon?: string;
  color?: string;
  sortOrder?: number;
}

export interface UpdateCategoryInput {
  slug?: string;
  parentId?: string;
  translations?: CategoryTranslation[];
  icon?: string;
  color?: string;
  sortOrder?: number;
}
