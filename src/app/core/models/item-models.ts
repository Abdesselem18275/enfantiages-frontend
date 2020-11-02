import { Customer } from "./profile-models";

export interface Item {
  id : number,
  reference : string,
  label : string,
  deposition_date :string,
  deposer_gain: number,
  intial_gain_ratio:number,
  initial_sale_price:number,
  sale_date: string,
  actual_sale_price: number,
  deposer : Customer,
  buyer : Customer,
  state: string,
  brand: string,
  category:string,
  size: string,
}
export enum ItemState {
  SOLD = 'Sold',
  AVAILABLE ='Available',
  ALL = ''
}
export type Brand =  { id : number,label : string}
export type Size = Brand
export type Category = Brand