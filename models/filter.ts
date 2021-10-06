interface IObjectKeys {
  [key: string]: string | string[] | any;
}


export interface FilterProps extends IObjectKeys {
  categories: string[];
  cities: string[];
  search: string,
}

export type Filter = FilterProps
