export type InstitutionType = 'bank' | 'policy' | 'bond';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  balance: number;
  color?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstitutionFormData {
  name: string;
  type: InstitutionType;
  balance: number;
  color?: string;
  description?: string;
}