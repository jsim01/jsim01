// Template/Favorite type definitions

export interface FavoriteTemplate {
  id: string;
  userId: string;
  label: string;
  icon: string;
  defaultCategory: string | null;
  order: number;
  createdAt: string;  // ISO8601
  updatedAt: string;  // ISO8601
}

export interface TemplateCreate {
  label: string;
  icon: string;
  defaultCategory?: string | null;
}

export interface TemplateUpdate {
  label?: string;
  icon?: string;
  defaultCategory?: string | null;
  order?: number;
}
