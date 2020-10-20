export interface Customer {
  id : number,
  email: string,
  first_name: string,
  last_name: string,
  civility: Civility,
  id_reference:string,
  phone_number:string
  adress:string
}

export type Civility = 'Mr' | 'Mme'
export function isCustomerGuard(value: any): value is Customer {
  return (value as Customer).email !== undefined;
}