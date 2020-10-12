import { Customer } from "./profile-models";

export interface Item {
  id : number,
  reference : string,
  label : string,
  deposition_date :string,
  deposer_gain: number,
  sale_date: string,
  sale_price: number,
  deposer : Customer,
  buyer : Customer,
}
