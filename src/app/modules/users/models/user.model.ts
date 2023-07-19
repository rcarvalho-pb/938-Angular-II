import { Address } from './address.model';

export interface User {
  id?: string;
  name: string;
  profession: string;
  birthDate: string;
  documentNumber: string;
  email: string;
  password: string;
  phone: string;
  income?: number;
  address: Address;
  roles?: string[];
}
