export interface Customer {
  id : number,
  email: string,
  first_name: string,
  last_name: string,
  civility: Civility,
  id_reference:string,
  phone_number:string,
  adress:string,
  birth_date:string,
  total_due_amount: number,
  total_deposer_gain_amount:number,
  total_shop_gain_amount:number,
  bought_items_count:number,
  deposed_items_count:number,
  total_purchase_amount:number,
  total_deposit_amount:number,
}

export type Civility = 'Mr' | 'Mme'
export function isCustomerGuard(value: any): value is Customer {
  return (value as Customer).email !== undefined;
}