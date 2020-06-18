export interface Category {
    id: number;
    categoryName: string;
    type: string;
    typeName: string;
}

export interface categoryState {
    categories: Category[];
    loading: boolean;
}

export enum categoryActionTypes {
  GET_CATEGORIES = "GET_CATEGORIES",
  ADD_CATEGORY = "ADD_CATEGORY",
}

