export interface Customer {
  id: number | null;
  name: string | null;
  address: string | null;
  phoneNumber: string | null;
  email: string | null;
  gender: string | null;
  city: string | null;
  country: string | null;
  creditCardType: string | null;
  childrenCount: number | null;
  isMarried: boolean | null | undefined;
  salary: number | null | undefined;
}
