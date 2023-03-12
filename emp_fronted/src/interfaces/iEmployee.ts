import type { iAddress } from "./iAddress";

export interface iEmployee {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: iAddress;
  birthdate: string;
  profilePicture: string | null;
  supervisor: iEmployee | null;
  supervisorId: string | null;
}
