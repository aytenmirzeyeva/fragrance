export interface GeneralResponse<UnknownType extends any> {
  status: string;
  result: ResultResponse<UnknownType>;
  message: string;
  code: number;
}

export interface ResultResponse<T> {
  data: T;
}
