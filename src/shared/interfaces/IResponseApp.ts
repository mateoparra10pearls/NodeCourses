export interface IResponseApp {
  result: any,
  error: IErrorObj;
}

export interface IErrorObj {
  code: number,
  message: string
}
