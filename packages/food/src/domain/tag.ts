export interface TagTranslation {
  locale: string;
  name: string;
}

export interface Tag {
  id: string;
  slug: string;
  translations: TagTranslation[];
  color?: string;
  createdAt: Date;
}

export interface CreateTagInput {
  slug: string;
  translations: TagTranslation[];
  color?: string;
}
