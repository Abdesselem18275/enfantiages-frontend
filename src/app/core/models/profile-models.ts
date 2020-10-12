export interface Customer {
  id : number,
  email: string,
  first_name: string,
  last_name: string,
  civility: Civility
}

export type Civility = 'Mr' | 'Mme'
