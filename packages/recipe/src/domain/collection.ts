export type CollectionVisibility = "private" | "public" | "shared";

export interface CollectionTranslation {
  locale: string;
  name: string;
  description: string;
}

export interface Collection {
  id: string;
  userId: string;
  translations: CollectionTranslation[];
  visibility: CollectionVisibility;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCollectionInput {
  translations: CollectionTranslation[];
  visibility?: CollectionVisibility;
  coverImage?: string;
}

export interface UpdateCollectionInput {
  translations?: CollectionTranslation[];
  visibility?: CollectionVisibility;
  coverImage?: string;
}
