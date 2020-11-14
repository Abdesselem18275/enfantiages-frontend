import { Customer } from "./profile-models";

export interface Item {
  id : number,
  reference : string,
  description : string,
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
  gender:string,
  colors:Color[],
  is_deposer_settled:boolean,

}
export enum ItemState {
  SOLD = 'Sold',
  AVAILABLE ='Available',
  ALL = ''
}
export type Brand =  { id : number,label : string}
export type Size = Brand
export type Category = Brand
export type Color = {id:number,label:string,value:string}