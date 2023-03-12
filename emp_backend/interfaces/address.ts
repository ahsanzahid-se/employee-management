export interface Address {
    line1: string;
    line2?: string;
    city: string;
    zip: string;
    country: string;
  }
  
  export interface AddressInput {
    line1: string;
    line2?: string;
    city: string;
    zip: string;
    country: string;
  }
  
  export const addresses: Address[] = [];
  